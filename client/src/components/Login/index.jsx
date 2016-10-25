import React from 'react';

const Login = () => (
  <div className="Login Page">
    <p className="Login-intro">
      Welcome to the login page
    </p>
    <form id="loginForm">
      <label for="email">email</label>
      <input
        type="text"
        className="email"
        name="email"
        />
      <label for="password">password</label>
      <input
        type="text"
        className="password"
        name="password"
      />
      <input
      type="submit"
      value="Submit"
      />
    </form>
  </div>
);

export default Login;
