module.exports = {

  postLogin: (emailAddress, password, callback) => {
    return fetch('/api/login', {
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
    return fetch('/api/signup', {
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

};
