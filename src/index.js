import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import Loader from "./components/common/loader";
import Container from "./container2";

import { UserContext } from "./context";
import { firebaseService } from "./services";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(function() {
    firebaseService.signIn().then(({ user, error }) => {
      if (error) {
        Alert.alert("Something went wrong");
        return;
      }
      // console.log(firebaseService.auth.currentUser, "123123123123");
      setUser(user);
    });
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={user}>
      <Container />
    </UserContext.Provider>
  );
}
