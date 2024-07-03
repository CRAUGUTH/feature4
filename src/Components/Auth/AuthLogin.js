import React, { useState } from "react";
import { loginUser } from "./AuthService";
import LoginForm from "./LoginForm";

const AuthLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(user).then((loggedInUser) => {
      if (loggedInUser) {
        alert(`Welcome back, ${loggedInUser.get("firstName")}!`);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });
  };

  return (
    <div>
      <LoginForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthLogin;
