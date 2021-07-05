import { dbService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onSignOut = async () => {
    await firebaseInstance
      .auth()
      .signOut()
      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };
  // const getMyBweets = async () => {
  //   const bweets = await dbService
  //     .collection("bweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(bweets.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMyBweets();
  // }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onSignOut}>Sign Out</button>
    </>
  );
};
export default Profile;
