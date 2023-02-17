import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext({
  currentUser: [],
  signup: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
