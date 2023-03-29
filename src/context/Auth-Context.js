import React, { useEffect, useState } from 'react';

import { auth } from '../firebase';

const AuthContext = React.createContext({
  profileBackground: {},
  profileBackgroundHandler: () => {},
  logout: () => {},
  currentUid: '',
});

export const AuthContextProvider = (props) => {
  const [currentUid, setCurrentUid] = useState('');
  const [profileBackground, setProfileBackground] = useState({});

  const logout = () => {
    return auth.signOut();
  };

  const profileBackgroundHandler = (backgoundObj) => {
    setProfileBackground(backgoundObj);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUid(user?.uid);
    });
    return unsubscribe;
  }, []);

  const value = {
    profileBackground,
    profileBackgroundHandler,
    logout,
    currentUid,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
