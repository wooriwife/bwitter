import { firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState(""); //react hooks: state management
  const [password, setPassword] = useState(""); //react hooks: state management
  const [newAccount, setNewAccount] = useState(true); //react hooks.... if it's new account or not.
  const [error, setError] = useState(""); //set the empty message
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
        data = await firebaseInstance
          .auth()
          .createUserWithEmailAndPassword(email, password);
      } else {
        //login
        data = await firebaseInstance
          .auth()
          .signInWithEmailAndPassword(email, password);
      }
      console.log("login data:", data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "apple") {
      provider = new firebaseInstance.auth.OAuthProvider("apple.com");
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    try {
      const result = await firebaseInstance.auth().signInWithPopup(provider);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
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
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
        <button onClick={onSocialClick} name="apple">
          Continew with Apple
        </button>
      </div>
    </div>
  );
};

export default Auth;
