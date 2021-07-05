import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState(""); //react hooks: state management
  const [password, setPassword] = useState(""); //react hooks: state management
  const [error, setError] = useState(""); //set the empty message
  const [newAccount, setNewAccount] = useState(true); //react hooks.... if it's new account or not.

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      // event will return an instance of target component
      target: { name, value }, //es6 magic, store the name and value of the component
    } = event;
    if (name === "email") {
      //if the name of the component is email
      setEmail(value); //set state using registed method on react hooks.
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault(); //I don't want the default thing to happen,, let me handle this...
    try {
      let data;
      if (newAccount) {
        //create user
        //createUserWithEmailAndPassword
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log("login data:", data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email" // component name is email
          type="email"
          placeholder="Email"
          required
          value={email} // email on react hooks
          onChange={onChange}
        />
        <input
          name="password" // component name is password
          type="password"
          placeholder="Password"
          required
          value={password} //password on react hooks
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
