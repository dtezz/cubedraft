import React from 'react';

const Login = (props) => {
  return (
    <div>
      <h3>Signup:</h3>
      <form method="POST" action="/signup" id="signup">
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="create user"></input>
      </form>
      <div>
        <h3>Already have an account?</h3>
        <form method="POST" action="/login" id="login">
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password" placeholder="password"></input>
          <input type="submit" value="login"></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
