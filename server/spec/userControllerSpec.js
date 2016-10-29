const expect = require('chai').expect;
const userController = require('../dbControllers/userController');
const specHelpers = require('./specHelpers');
const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

describe('User controller', () => {
  describe('Creating users', () => {
    let userData = {};

    beforeEach(done => specHelpers.emptyRecords(done));

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
    before(done => specHelpers.emptyRecords(done));

    const sampleUser = {
      sampleData: {
        emailAddress: 'existing@user.com',
        password: 'password123',
        name: 'Tricia Will',
      },
    };

    before(done => specHelpers.createSampleUser(sampleUser, done));

    it('should find users by email address', (done) => {
      userController.findUserByEmailAddress('existing@user.com')
        .then((userInstance) => {
          expect(userInstance.get('name')).to.equal(sampleUser.sampleData.name);
          done();
        });
    });

    it('should find users by id', (done) => {
      userController.findUserById(sampleUser.generatedData.id)
        .then((userInstance) => {
          expect(userInstance.get('name')).to.equal(sampleUser.sampleData.name);
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
      userController.verifyUser(sampleUser.sampleData.emailAddress, 'wrong-password')
        .then((result) => {
          expect(result).to.equal(false);
          done();
        });
    });

    it('should update properties on a user', (done) => {
      userController.updateUser(sampleUser.generatedData.id, {
        squareId: '$twill',
      })
        .then((userInstance) => {
          expect(userInstance.get('emailAddress')).to.equal(sampleUser.sampleData.emailAddress);
          expect(userInstance.get('squareId')).to.equal('$twill');
          done();
        });
    });

    it('should not update properties if the new value is null', (done) => {
      userController.updateUser(sampleUser.generatedData.id, {
        squareId: null,
      })
        .then((userInstance) => {
          expect(userInstance.get('squareId')).to.equal('$twill'); // not changed
          done();
        });
    });

    it('should delete users by id', (done) => {
      userController.deleteUser(sampleUser.generatedData.id)
        .then(() => {
          userController.findUserByEmailAddress(sampleUser.sampleData.emailAddress)
            .then((userInstance) => {
              expect(userInstance).to.equal(null);
              done();
            });
        });
    });
  });
});
