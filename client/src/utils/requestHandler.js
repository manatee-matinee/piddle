const url = /^(development|test)$/.test(process.env.NODE_ENV) ? 'http://localhost:3000' : '';

export default {
  /**
   * Login POST request to /auth/login
   * @param {string} emailAddress
   * @param {string} password
   * @param {requestCallback} cb - The callback that handles the response.
   */
  postLogin: (data, callback) => {
    let status;

    // eslint-disable-next-line no-undef
    fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((body) => {
      callback({ body, status });
    });
  },
  /**
   * Signup POST request to /auth/signup
   * @param {string} emailAddress
   * @param {string} password
   * @param {requestCallback} cb - The callback that handles the response.
   */
  postSignup: (data, callback) => {
    let status;

    // eslint-disable-next-line no-undef
    fetch(`${url}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((body) => {
      callback({ body, status });
    });
  },
  /**
   * Signout GET request to /auth/signout
   * @param {requestCallback} cb - The callback that handles the response.
   */
  getLogout: (callback) => {
    // eslint-disable-next-line no-undef
    fetch(`${url}/auth/logout`, {
      method: 'GET',
    })
    .then(res => callback(res));
  },
  /**
   * Signup PUT request to /auth/signup
   * @param {string} emailAddress
   * @param {string} password
   * @param {requestCallback} cb - The callback that handles the response.
   */
  putUpdate: (data, callback) => {
    // TODO: get id from webtoken
    // eslint-disable-next-line no-undef
    fetch(`${url}/api/user/id`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => callback(res));
  },
};
