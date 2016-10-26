<<<<<<< d57b6b1a791b098ca0006789d042e4ee7e8d76c8
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
=======
let url = 'http://localhost:3000';

module.exports = { 
>>>>>>> Create temporaty variable for development url

  postLogin: (emailAddress, password, callback) => {
    return fetch( url + '/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress,
        password,
      }),
    })
    .then(res => callback(res));
  },

  postSignup: (emailAddress, password, callback) => {
    return fetch( url + '/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress,
        password,
      }),
    })
    .then(res => callback(res));
  },

  getLogout: (callback) => {
    return fetch('/api/logout', {
      method: 'GET',
    })
    .then(res => callback(res));
  },

>>>>>>> Create utils directory for helper functions
};
