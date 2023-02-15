import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext({
  currentUser: [],
  signup: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState([]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
