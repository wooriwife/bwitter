import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Bweet = ({ bweetObj, isOwner }) => {
  const [edting, setEdting] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this bweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`bweets/${bweetObj.id}`).delete();
      await storageService.refFromURL(bweetObj.attachmentUrl).delete();
    }
  };
  const toggleEdting = () => setEdting((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`bweets/${bweetObj.id}`).update({
      text: newBweet,
    });
    toggleEdting();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewBweet(value);
  };
  return (
    <div>
      {edting ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit your bweet."
              value={newBweet}
              required
            />
            <input type="submit" value="Update" />
          </form>

          <button onClick={toggleEdting}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{bweetObj.text}</h4>
          {bweetObj.attachmentUrl && (
            <img src={bweetObj.attachmentUrl} height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEdting}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bweet;
