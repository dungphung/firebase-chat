import React from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";

import { unionWith } from "lodash";

import { firebaseService } from "./services";
import { UserContext } from "./context";

import Input from "./components/input";
import Message from "./components/message";

import { Colors } from "./styles";

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

export default class Container extends React.Component {
  static contextType = UserContext;

  state = {
    messages: []
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = firebaseService.messageRef
      .orderBy("created_at", "desc")
      .onSnapshot(snapshot => {
        // snapshot.forEach(el => {
        //   console.log(el.data());
        // });
        // const messages = unionWith(this.state.messages, snapshot, function(
        //   a,
        //   b
        // ) {
        //   return a.id === b.id;
        // }).sort(function(a, b) {
        //   const aData = a.data();
        //   const bData = b.data();

        //   return bData.created_at.seconds - aData.created_at.seconds;
        // });

        // console.log(messages);

        // this.setState({ messages });
        console.log("====================================");
        console.log(snapshot.docs);
        console.log("====================================");
      });
  }

  componentWillUnmount(): void {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.messagesContainer}>
          <FlatList
            inverted
            data={this.state.messages}
            keyExtractor={function(item) {
              return item.id;
            }}
            renderItem={function({ item }) {
              const data = item.data();
              const side = data.user_id === this.context.uid ? "right" : "left";

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
}
