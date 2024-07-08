import React, { useEffect, useState } from "react";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from 'react-router-dom';

const AuthRegister = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          navigate('/');
        }
        setAdd(false);
      });
    }
  }, [newUser, add, navigate]); // Add navigate to the dependency array

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
