import React, { useState } from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import { useHistory } from "react-router-dom";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const history = useHistory();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.username && !user.password) {
      return;
    }
    axiosWithAuth()
      .post("/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubble-page");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <h2>Bubble Login</h2>
      <form onSubmit={handleSubmit} className="bubblesForm">
        <input
          name="username"
          value={user.username}
          onChange={handleChange}
          type="text"
          placeholder="Enter username"
        />
        <input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
