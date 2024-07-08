import React, { useState } from "react";
import { loginUser } from "./AuthService";
import LoginForm from "./LoginForm";
import { useNavigate } from 'react-router-dom';

const AuthLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
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
        navigate('/');
        window.location.reload();
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
