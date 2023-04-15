import React, { useEffect, useState } from 'react';

import { auth } from '../firebase';

const AuthContext = React.createContext({
  background: {},
  backgroundHandler: () => {},
  logout: () => {},
  currentUid: '',
});

export const AuthContextProvider = (props) => {
  const [currentUid, setCurrentUid] = useState('');
  const [background, setBackground] = useState({});

  const logout = () => {
    return auth.signOut();
  };

  const backgroundHandler = (backgoundObj) => {
    setBackground(backgoundObj);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUid(user?.uid);
    });
    return unsubscribe;
  }, []);

  const value = {
    background,
    backgroundHandler,
    logout,
    currentUid,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
