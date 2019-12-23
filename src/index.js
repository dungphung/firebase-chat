import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { store } from "./redux/store";

import Loader from "./components/common/loader";
import Container from "./container";

import { UserContext } from "./context";
import { firebaseService } from "./services";

export default function App() {
  // const store = createStore(() => ({
  //   uid: "cs64Zos0DxW2rfcOEmq2sdsadiSuPHK83"
  // }));
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
