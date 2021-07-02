import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, firebaseInstance } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebaseInstance.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }); //this needs callback.
  });
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initailizing..."}
      <footer>&copy;{new Date().getFullYear()} Bwitter</footer>
    </>
  );
}

export default App;
