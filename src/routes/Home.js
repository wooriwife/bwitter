import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Bweet from "components/Bweet";
import BweetFactory from "components/Bweetfactory";

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

  const [bweets, setBweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("bweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBweets(nweetArray);
      });
  }, []);

  return (
    <div>
      <BweetFactory userObj={userObj} />
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
