import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { firebaseService } from "../../services/index";
import { UserContext } from "../../context";
import { SafeAreaView } from "react-navigation";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Conversations"
  };

  state = {
    converstations: [],
    userUid: this.props.userUid
  };

  // Get data friends and set to state
  componentDidMount() {
    firebaseService.converstationRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        el._data.uidRoom.forEach(el2 => {
          if (el2 == this.state.userUid) {
            const text = el._ref._documentPath._parts[1];
            return this.setState({
              converstations: [
                ...this.state.converstations,
                { ...el._data, text }
              ]
            });
          }
        });
      });
    });
  }

  // Render flatlist
  friendRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Chat", {
            item: item.name,
            userUid: this.state.userUid,
            idDocs: item.text
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

const mapStateToProps = state => ({
  userUid: state.userReducer.userUid
});
export default connect(mapStateToProps)(HomeScreen);
const styles = StyleSheet.create({
  itemList: {
    padding: 5,
    margin: 2,
    flex: 1,
    alignItems: `center`,
    backgroundColor: `pink`
  }
});
