import React, { useState } from "react";
import { firebaseInstance } from "fbase";

const Home = () => {
  const onSignOut = async () => {
    await firebaseInstance
      .auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
    console.log("Signed out successfully!!");
  };
  const [bweet, setBweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChasnge = (event) => {
    const {
      target: { value },
    } = event;
    setBweet(value);
  };
  return (
    <div>
      <form>
        <input type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Bweet" />
      </form>
    </div>
  );
};
export default Home;
