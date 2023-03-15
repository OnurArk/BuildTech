import React, { useCallback, useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = React.createContext({
  profileBackground: {},
  profileBackgroundHandler: () => {},
  currentEmail: '',
  currentUserName: '',
  setCurrentUserName: () => {},
  currentPhone: '',
  currentAdress: '',
  currentPayment: '',
  currentUid: '',
  logout: () => {},
  getUserData: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentPhone, setCurrentPhone] = useState(null);
  const [currentAdress, setCurrentAdress] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [currentEmail, setCurrentEmail] = useState();
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUid, setCurrentUid] = useState();

  const [profileBackground, setProfileBackground] = useState({});

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

        const user = mappedData.find((user) => user.id === currentUid);
        if (user && inputType === 'phone') {
          setCurrentPhone(user?.data.phone);
        }
        if (user && inputType === 'adress') {
          setCurrentAdress(user?.data.adress);
        }
        if (user && inputType === 'payment') {
          setCurrentPayment(user?.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [currentUid]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentEmail(user?.email);
      setCurrentUid(user?.uid);
      setCurrentUserName(user?.displayName);
    });
    getUserData('phone');
    getUserData('adress');
    getUserData('payment');

    return unsubscribe;
  }, [getUserData]);

  const profileBackgroundHandler = (backgoundObj) => {
    setProfileBackground(backgoundObj);
  };

  const value = {
    profileBackground,
    profileBackgroundHandler,
    currentUid,
    currentPhone,
    currentAdress,
    currentEmail,
    currentUserName,
    currentPayment,
    logout,
    getUserData,
    setCurrentUserName,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
