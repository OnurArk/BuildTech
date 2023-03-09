import React, { useEffect, useState } from 'react';

import { auth } from '../firebase';

const AuthContext = React.createContext({
  currentEmail: '',
  currentPhone: '',
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentPhone, setCurrentPhone] = useState();
  const [currentEmail, setCurrentEmail] = useState();

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentEmail(user?.email);
      setCurrentPhone(user?.phoneNumber);
    });
    return unsubscribe;
  }, []);

  const value = { currentPhone, currentEmail, logout };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
