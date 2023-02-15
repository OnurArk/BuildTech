import { useContext, useState } from "react";

import AuthContext from "../context/Auth-Context";

const useValidation = (setError, inputs) => {
  const [isTouched, setIsTouched] = useState(false);
  const authCtx = useContext(AuthContext);

  const signupRequest = (event) => {
    event.preventDefault();

    setIsTouched(true);
    const email = inputs?.email.current.value;
    const password = inputs?.password.current.value;
    const confirmPassword = inputs?.confirmPassword.current.value;

    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords did not match!");
    }
    // authCtx.signup(email, password);
  };

  return {
    signupRequest,
    isTouched,
  };
};

export default useValidation;
