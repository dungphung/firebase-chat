import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { firebaseService } from "../../services/index";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Friends"
  };

  state = {
    users: []
  };

  // Get data friends and set to state
  UNSAFE_componentWillMount() {
    firebaseService.userRef.onSnapshot(el => {
      for (let index = 0; index < el._docs.length; index++) {
        this.setState({ users: [...this.state.users, el._docs[index]._data] });
      }
    });
  }

  // Render flatlist
  friendRender = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.users}
          renderItem={this.friendRender}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    margin: 2,
    flex: 1,
    alignItems: `center`,
    backgroundColor: `pink`
  }
});
