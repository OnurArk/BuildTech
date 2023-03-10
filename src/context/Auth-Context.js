import React, { useCallback, useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = React.createContext({
  currentEmail: '',
  currentPhone: '',
  currentUid: '',
  logout: () => {},
  getPhone: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentPhone, setCurrentPhone] = useState();
  const [currentEmail, setCurrentEmail] = useState();
  const [currentUid, setCurrentUid] = useState();

  const logout = () => {
    return auth.signOut();
  };

  const getPhone = useCallback(async () => {
    try {
      const userRef = collection(db, 'users');
      const docRef = query(userRef, currentUid);
      const docSnap = await getDocs(docRef);

      const mappedData = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const user = mappedData.find((user) => user.id === currentEmail);
      if (user) {
        setCurrentPhone(user?.data.phone);
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentEmail, currentUid]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentEmail(user?.email);
      setCurrentUid(user?.uid);
    });
    getPhone();
    return unsubscribe;
  }, [getPhone]);

  const value = { currentUid, currentPhone, currentEmail, logout, getPhone };
  console.log(currentPhone);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
