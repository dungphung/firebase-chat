import React, { useEffect, useReducer, useContext } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { Colors } from "./styles";

import { firebaseService } from "./services";
import { UserContext } from "./context";

import Input from "./components/input";
import Message from "./components/message";

import { messagesReducer } from "./reducers";
const styles = StyleSheet.create({
  messagesContainer: {
    height: "100%",
    paddingBottom: 100
  },
  inputContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: Colors.GREY
  }
});

export default function Container() {
  const { uid } = useContext(UserContext);
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(function() {
    return firebaseService.messageRef
      .orderBy("created_at", "desc")
      .onSnapshot(function(snapshot) {
        dispatchMessages({ type: "add", payload: snapshot.docs });
      });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function(item) {
            return item.id;
          }}
          renderItem={function({ item }) {
            const data = item.data();
            const side = data.user_id === uid ? "right" : "left";

            return <Message side={side} message={data.message} />;
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  );
}
