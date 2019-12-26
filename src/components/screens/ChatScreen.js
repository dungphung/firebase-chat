import React, { Component } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { firebaseService } from "../../services";

export default class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return { tabBarVisible: false };
  };
  state = {
    textMessage: "",
    uid: this.props.navigation.getParam("userUid"),
    messageList: null,
    idDocs: this.props.navigation.getParam("idDocs")
  };

  componentDidMount() {
    firebaseService.converstationRef
      .doc(this.state.idDocs)
      .collection("messages")
      .orderBy("created_at", "desc")
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          const { uid, message, created_at } = doc._data;
          list.push({
            uid,
            message,
            created_at: { created_at }
          });
        });

        list.sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.setState({
          messageList: list
        });
      });
  }

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  handleSubmit = () => {
    const { uid, idDocs } = this.state;
    firebaseService.createMessage({
      message: this.state.textMessage,
      uid,
      idDocs
    });
    this.setState({ textMessage: "" });
  };

  renderMessages = ({ item }) => {
    console.log(item.created_at);
    return (
      <View
        style={{
          flexDirection: `row`,
          width: `60%`,
          alignSelf: item.uid === this.state.uid ? "flex-end" : "flex-start",
          backgroundColor: item.uid === this.state.uid ? "#00897b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 10,
          marginTop: 10
        }}
      >
        <View>
          <Text
            style={{
              padding: 7,
              color: `#fff`,
              fontSize: 15,
              marginBottom: 10
            }}
          >
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <FlatList
          inverted
          style={{ padding: 10, height: height * 0.8 }}
          data={this.state.messageList}
          renderItem={this.renderMessages}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            display: "flex",
            flexDirection: `row`,
            alignItems: `center`
          }}
        >
          <TextInput
            value={this.state.textMessage}
            onChangeText={this.handleChange("textMessage")}
            placeholder="Text here..."
            style={styles.inputStyle}
          />
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={{ paddingBottom: 10, marginRight: 5 }}
          >
            <Text style={styles.buttonStyle}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: `black`,
    padding: 10,
    margin: 10,
    flex: 1
  },
  buttonStyle: {
    backgroundColor: `#00897b`,
    padding: 5,
    color: `white`
  }
});
