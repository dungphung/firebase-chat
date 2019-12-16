import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 3
  },
  text: {
    color: Colors.WHITE
  }
});

export default function Button({ text, disabled, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
