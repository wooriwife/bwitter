import { firebaseInstance } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onSignOut = async () => {
    await firebaseInstance
      .auth()
      .signOut()
      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };
  return (
    <>
      <button onClick={onSignOut}>Sign Out</button>
    </>
  );
};
export default Profile;
