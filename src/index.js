import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import Loader from "./components/common/loader";
import Container from "./container";

import { UserContext } from "./context";
import { firebaseService } from "./services";

export default function App() {
  // const [user, setUser] = useState(null);

  // useEffect(function() {
  //   firebaseService.signIn().then(({ user, error }) => {
  //     if (error) {
  //       Alert.alert("Something went wrong");
  //       return;
  //     }
  //     console.log(firebaseService.auth.currentUser);
  //     setUser(user);
  //   });
  // }, []);

  // if (!user) {
  //   return <Loader />;
  // }
  user = {
    uid: "cs64Zos0DxW2rfcOEmq2sdsadiSuPHK83"
  };
  return (
    <UserContext.Provider value={user}>
      <Container />
    </UserContext.Provider>
  );
}
