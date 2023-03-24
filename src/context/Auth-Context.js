import React, { useCallback, useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = React.createContext({
  profileBackground: {},
  profileBackgroundHandler: () => {},
  currentEmail: '',
  currentUserName: '',
  setCurrentUserName: () => {},
  currentUserPhoto: '',
  setCurrentUserPhoto: () => {},
  currentPhotoProp: '',
  setCurrentPhotoProp: () => {},
  currentPhone: '',
  currentAdress: '',
  currentPayment: '',
  currentUid: '',
  logout: () => {},
  getUserData: () => {},
  isLoading: true,
});

const initialIsloading = true;

export const AuthContextProvider = (props) => {
  const [currentPhone, setCurrentPhone] = useState(null);
  const [currentAdress, setCurrentAdress] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [currentEmail, setCurrentEmail] = useState();
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserPhoto, setCurrentUserPhoto] = useState();
  const [currentPhotoProp, setCurrentPhotoProp] = useState();
  const [currentUid, setCurrentUid] = useState();
  const [isLoading, setIsLoadin] = useState(initialIsloading);

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
        if (user && inputType === 'photoProp') {
          setCurrentPhotoProp(user?.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [currentUid]
  );

  useEffect(() => {
    // fetch user data from Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentEmail(user?.email);
      setCurrentUid(user?.uid);
      setCurrentUserName(user?.displayName);
      setCurrentUserPhoto(user?.photoURL);
    });
    getUserData('phone');
    getUserData('adress');
    getUserData('payment');
    getUserData('photoProp');

    // set isLoading to false after fetching

    setIsLoadin(false);
    return unsubscribe;
  }, [getUserData]);

  const profileBackgroundHandler = (backgoundObj) => {
    setProfileBackground(backgoundObj);
  };
  console.log(isLoading);
  const value = {
    profileBackground,
    profileBackgroundHandler,
    currentUid,
    currentPhone,
    currentAdress,
    currentEmail,
    currentPayment,
    logout,
    getUserData,
    currentUserName,
    setCurrentUserName,
    currentUserPhoto,
    setCurrentUserPhoto,
    currentPhotoProp,
    setCurrentPhotoProp,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
