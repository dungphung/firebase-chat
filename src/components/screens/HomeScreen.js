import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { UserContext } from "../../context";
import { firebaseService } from "../../services/index";
import { SafeAreaView } from "react-navigation";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Friends"
  };

  state = {
    converstations: [],
    userContext: { uid: "cs64Zos0DxW2rfcOEmq2sdsadiSuPHK83" }
  };

  // Get data friends and set to state
  componentDidMount() {
    firebaseService.converstationRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        el._data.uidRoom.forEach(el2 => {
          if (el2 == this.state.userContext.uid) {
            return this.setState({
              converstations: [...this.state.converstations, el._data]
            });
          }
        });
      });
    });
    // firebaseService.userRef.onSnapshot(el => {
    //   for (let index = 0; index < el._docs.length; index++) {
    //     if (el._docs[index]._data.uid !== this.state.userContext.uid)
    //       this.setState({
    //         users: [...this.state.users, el._docs[index]._data]
    //       });
    //   }
    // });
  }

  // Render flatlist
  friendRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Chat", {
            item: item.name,
            uidContext: this.state.userContext.uid
          })
        }
        style={styles.itemList}
      >
        <Text>{item.nameRoom}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.converstations}
          renderItem={this.friendRender}
          keyExtractor={item => item.roomId}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemList: {
    padding: 5,
    margin: 2,
    flex: 1,
    alignItems: `center`,
    backgroundColor: `pink`
  }
});
