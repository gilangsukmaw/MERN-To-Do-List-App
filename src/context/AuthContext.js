import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    axios.post(
      "https://simple-to-do-list-app-0.herokuapp.com",
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
      "https://simple-to-do-list-app-0.herokuapp.com",
      { email: email },
      { withCredentials: true }
    );
    const firebaseRegister = auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const firebaseLogin = auth.signInWithEmailAndPassword(email, password);
    return firebaseLogin;
  }

  function forgot(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function logout() {
    axios
      .get("https://simple-to-do-list-app-0.herokuapp.com", {
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
    updateEmail,
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
