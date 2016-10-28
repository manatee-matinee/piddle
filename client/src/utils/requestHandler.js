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
};
