import React, { useEffect, useState } from "react";

import { auth } from "../firebase";

const AuthContext = React.createContext({
  currentUser: null,
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user?.email);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, logout };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
