import React, { useCallback, useState, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { firebaseService } from "../../services";

import { UserContext } from "../../context";

import Button from "../common/button";
import Loader from "../common/loader";

import { Colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%"
  },
  inputContainer: {
    width: "70%"
  },
  input: {
    height: 40,
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: "row",
    paddingHorizontal: 10
  }
});

export default function Input() {
  const { uid } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePress = useCallback(
    function() {
      setIsLoading(true);
      firebaseService.createMessage({ message, uid }).then(function() {
        setIsLoading(false);
        setMessage("");
      });
    },
    [message]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write you message"
        />
      </View>

      <Button text="Send" onPress={handlePress} disabled={isLoading} />

      {isLoading && <Loader />}
    </View>
  );
}
