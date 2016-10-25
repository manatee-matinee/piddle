<<<<<<< c09fe65337a07575fe1fbc67d68cc9d2af5ce00c
export default {
  postLogin: (emailAddress, password, callback) => (
    // eslint-disable-next-line no-undef
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress,
        password,
      }),
    })
    .then(res => callback(res))
  ),

  postSignup: (emailAddress, password, callback) => (
    // eslint-disable-next-line no-undef
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress,
        password,
      }),
    })
    .then(res => callback(res))
  ),

  getLogout: callback => (
    // eslint-disable-next-line no-undef
    fetch('/api/logout', {
      method: 'GET',
    })
    .then(res => callback(res))
  ),
=======
module.exports = {

  postLogin: (email, password, callback) => {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(res => callback(res) );
  },

  postSignup: (email, password, callback) => {
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(res => callback(res) );
  },

>>>>>>> Create utils directory for helper functions
};
