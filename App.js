import React from "react";
import Reactotron from "reactotron-react-native";

import { StyleSheet, View } from "react-native";

import Container from "./src";
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

export default function App() {
  return (
    <View style={styles.container}>
      <Container />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
