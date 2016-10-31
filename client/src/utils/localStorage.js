// Define a basic version of localStorage to be used in tests
// ref: https://groups.google.com/forum/#!topic/jestjs/9EPhuNWVYTg
const testLocalStorage = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

// eslint-disable-next-line no-undef
export default (typeof window.localStorage === 'undefined') ? testLocalStorage : window.localStorage;
