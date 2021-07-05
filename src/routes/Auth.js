import AuthForm from "components/AuthForm";
import { firebaseInstance, authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true); //react hooks.... if it's new account or not.

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
      const result = await authService.signInWithPopup(provider);
      console.log(result.user.name);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <AuthForm />
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
