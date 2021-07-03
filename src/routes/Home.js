import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Bweet from "components/Bweet";

const Home = ({ userObj }) => {
  // const onSignOut = async () => {
  //   await firebaseInstance
  //     .auth()
  //     .signOut()
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log("Signed out successfully!!");
  // };

  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);

  useEffect(() => {
    dbService.collection("bweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("bweets").add({
      text: bweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setBweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setBweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name={bweet}
          value={bweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Bweet" />
      </form>
      <div>
        {bweets.map((bweet) => (
          <Bweet
            key={bweet.id}
            bweetObj={bweet}
            isOwner={bweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
