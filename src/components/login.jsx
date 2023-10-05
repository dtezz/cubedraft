import React from 'react';

const Login = (props) => {
  let count = 0;
  const submit = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    let body = {};
    if (id === 'signup') {
      body.username = e.target[0].value;
      body.password = e.target[1].value;
      body = JSON.stringify(body);
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
      if (response.status === 400) {
        alert('gotta have a username and password!');
      }
      e.target.reset();
    } else if (id === 'login') {
      body.username = e.target[0].value;
      body.password = e.target[1].value;
      body = JSON.stringify(body);
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
      if (response.status === 400) {
        alert('gotta have a username and password! come on!');
      } else if (response.status === 401) {
        if (count >= 3) {
          alert(
            "take a break and try again later, I'm sure you'll remember then"
          );
        }
        alert('incorrect username or password');
        count++;
      }
      e.target.reset();
    }
  };

  return (
    <div>
      <h3>Sign Up:</h3>
      <form onSubmit={submit} id="signup">
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="create user"></input>
      </form>
      <div>
        <h3>Already have an account? Login:</h3>
        <form onSubmit={submit} id="login">
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password" placeholder="password"></input>
          <input type="submit" value="login"></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
