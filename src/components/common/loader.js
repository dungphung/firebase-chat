import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 0,
    left: 0,

    height: "100%",
    width: "100%",

    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={Colors.PRIMARY} size="small" />
    </View>
  );
}
