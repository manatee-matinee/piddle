import sinon from 'sinon';
// import Request from './requestHandler';

export const defineLocalStorage = () => {
  // ref: https://groups.google.com/forum/#!topic/jestjs/9EPhuNWVYTg
  const localStorage = (() => {
    let store = {};
    return {
      getItem: key => store[key],
      setItem: (key, value) => { store[key] = value; },
      clear: () => { store = {}; },
    };
  })();

  // eslint-disable-next-line no-undef
  Object.defineProperty(window, 'localStorage', { value: localStorage });
};

  /*
export const getUserToken = (() => {
  const password = 'abcd';
  const tokens = {};
  return (userEmail, callback) => {
    let token;
    if (typeof tokens[userEmail] !== 'undefined') {
      callback(tokens[userEmail]);
    } else {
      Request.postLogin({
        password,
        emailAddress: userEmail,
      }, ({ loginRes }) => {
        if (loginRes.status > 400) {
          Request.postSignup({
            password,
            emailAddress: userEmail,
            squareId: 'a',
            paypalId: 'a',
            name: 'a',
          }, ({ signupRes }) => {
            if (signupRes.status > 400) {
              callback(null);
            } else {
              token = signupRes.body.data.token;
              tokens[userEmail] = token;
              callback(token);
            }
          });
        } else {
          token = loginRes.body.data.token;
          tokens[userEmail] = token;
          callback(token);
        }
      });
    }
  };
})();
*/

export const RouterSpy = function RouterSpy() {
  this.push = sinon.spy();
  this.replace = sinon.spy();
  this.go = sinon.spy();
  this.goBack = sinon.spy();
  this.goForward = sinon.spy();
  this.setRouteLeaveHook = sinon.spy();
  this.isActive = sinon.spy();
};
