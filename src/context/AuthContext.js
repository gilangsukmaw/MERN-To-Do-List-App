import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();
const { REACT_APP_API } = process.env;

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    axios.post(
      `${REACT_APP_API}/v1/register`,
      { email: email },
      { withCredentials: true }
    );

    const firebaseRegister = auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return firebaseRegister;
  }
  function login(email, password) {
    axios.post(
      `${REACT_APP_API}/v1/login`,
      { email: email },
      { withCredentials: true }
    );

    const firebaseLogin = auth.signInWithEmailAndPassword(email, password);
    return firebaseLogin;
  }

  function forgot(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function logout() {
    axios
      .get(`${REACT_APP_API}/v1/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        return auth.signOut();
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    forgot,
    updatePassword,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};
