const expect = require('chai').expect;
const db = require('../db');
const userController = require('../dbControllers/userController');
const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

const emptyUserRecords = (done) => {
  Promise.all([
    db.models.User.sync({ force: true }),
  ])
  .then(() => {
    done();
  });
};

describe('Creating users', () => {
  let userData = {};

  beforeEach('Empty user records', (done) => {
    emptyUserRecords(done);
  });

  beforeEach('Set user data', () => {
    userData = {
      emailAddress: 'sample@mail.com',
      password: 'password123',
    };
  });

  it('should create a user', (done) => {
    userController.createUser(userData)
      .then((userInstance) => {
        expect(userInstance.get('emailAddress')).to.equal(userData.emailAddress);
        expect(userInstance.get('password')).to.not.equal(userData.password); // should be hashed
        expect(userInstance.get('password')).to.match(/\S{5,}/); // some hash
        done();
      },
      (err) => {
        expect(err).to.not.exist;
        done();
      });
  });

  it('should not create a user without a password', (done) => {
    delete userData.password;
    userController.createUser(userData)
      .catch((err) => {
        expect(err).to.exist;
        done();
      });
  });
});

describe('With existing users', () => {
  before((done) => {
    emptyUserRecords(done);
  });

  before((done) => {
    userController.createUser({
      emailAddress: 'existing@user.com',
      password: 'password123',
      name: 'Tricia Will',
    })
    .then(() => done());
  });

  it('should find users by email address', (done) => {
    userController.findUserByEmailAddress('existing@user.com')
      .then((userInstance) => {
        expect(userInstance.get('name')).to.equal('Tricia Will');
        done();
      });
  });

  it('should return null when no user with an email is found', (done) => {
    userController.findUserByEmailAddress('nonexistent@email.com')
      .then((userInstance) => {
        expect(userInstance).to.equal(null);
        done();
      });
  });

  it('should verify a user\'s password', (done) => {
    userController.verifyUser('existing@user.com', 'password123')
      .then((result) => {
        expect(result).to.equal(true);
        done();
      });
  });

  it('should return false when verifying with the wrong password', (done) => {
    userController.verifyUser('existing@user.com', 'wrong-password')
      .then((result) => {
        expect(result).to.equal(false);
        done();
      });
  });

  it('should update properties on a user', (done) => {
    userController.updateUser('existing@user.com', {
      squareId: '$twill',
    })
      .then((userInstance) => {
        expect(userInstance.get('emailAddress')).to.equal('existing@user.com');
        expect(userInstance.get('squareId')).to.equal('$twill');
        done();
      });
  });

  it('should delete users by email', (done) => {
    userController.deleteUser('existing@user.com')
      .then(() => {
        userController.findUserByEmailAddress('existing@user.com')
          .then((userInstance) => {
            expect(userInstance).to.equal(null);
            done();
          });
      });
  });
});
