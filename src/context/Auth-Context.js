import React, { useCallback, useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = React.createContext({
  currentEmail: '',
  currentPhone: '',
  currentAdress: '',
  currentUid: '',
  logout: () => {},
  getUserData: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentPhone, setCurrentPhone] = useState(null);
  const [currentAdress, setCurrentAdress] = useState(null);
  const [currentEmail, setCurrentEmail] = useState();
  const [currentUid, setCurrentUid] = useState();

  const logout = () => {
    return auth.signOut();
  };

  const getUserData = useCallback(
    async (inputType) => {
      try {
        const phoneRef = collection(db, inputType);
        const docRef = query(phoneRef, currentUid);
        const docSnap = await getDocs(docRef);

        const mappedData = docSnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const user = mappedData.find((user) => user.id === currentEmail);
        if (user && inputType === 'phone') {
          setCurrentPhone(user?.data.phone);
        }
        if (user && inputType === 'adress') {
          setCurrentAdress(user?.data.adress);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [currentEmail, currentUid]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentEmail(user?.email);
      setCurrentUid(user?.uid);
    });
    getUserData('phone');
    getUserData('adress');
    return unsubscribe;
  }, [getUserData]);

  const value = {
    currentUid,
    currentPhone,
    currentAdress,
    currentEmail,
    logout,
    getUserData,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
