import React from 'react';
import ReactDOM from 'react-dom';
// import ReactTestUtils from 'react-addons-test-utils';
import App from './index';

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
