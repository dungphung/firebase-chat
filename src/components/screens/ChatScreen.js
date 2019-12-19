import React, { Component } from "react";
import { unionWith } from "lodash";
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
    return {
      title: navigation.getParam("name", "uid")
    };
  };

  state = {
    textMessage: "",
    uid: this.props.navigation.getParam("uid"),
    messageList: null
  };

  componentDidMount() {
    firebaseService.messageRef.onSnapshot(snapshot => {
      const list = [{ message: "tih", uid: 1, created_at: 1576747062 }];
      snapshot.forEach(doc => {
        const { message, uid, created_at } = doc.data();
        list.push({
          message,
          uid,
          created_at
        });
      });

      list.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at.seconds) - new Date(a.created_at.seconds);
      });

      this.setState({
        messageList: list
      });
    });
  }

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 && "0") + d.getHours() + ":";
    result += (d.getMinutes() < 10 && "0") + d.getMinutes();
    return result;
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  handleSubmit = () => {
    this.setState({ textMessage: "" });
    firebaseService.createMessage({
      message: this.state.textMessage,
      uid: this.state.uid
    });
  };

  renderMessages = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: `row`,
          width: `60%`,
          alignSelf: item.uid === 1 ? "flex-end" : "flex-start",
          backgroundColor: item.uid === 1 ? "#00897b" : "#7cb342",
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
        <Text style={{ fontSize: 10 }}>
          {this.convertTime(item.created_at.seconds)}
        </Text>
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
          keyExtractor={(item, index) => item.created_at}
        />
        <View style={{ flexDirection: `row`, alignItems: `center` }}>
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
    backgroundColor: `blue`,
    padding: 5,
    borderWidth: 1,
    borderColor: `black`
  }
});
