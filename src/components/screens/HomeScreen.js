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
    userUid: this.props.userUid,
    listUsers: []
  };

  // Get data friends and set to state
  componentDidMount() {
    firebaseService.converstationRef.onSnapshot(snapshot => {
      const list = [];
      snapshot._docs.forEach(element => {
        const text = element._ref._documentPath._parts[1];
        list.push({ ...element._data, text });
      });
      this.setState({
        converstations: list
      });
    });

    firebaseService.userRef.get().then(result => {
      const listUsers = [];
      result._changes.forEach(el => {
        listUsers.push(el._document._data);
      });
      this.setState({ listUsers: listUsers });
    });
  }

  nameConver = uidRoom => {
    this.state.listUsers.filter(el => {
      if (el.uid === uidRoom[1]) {
        return el.name;
      }
    });
  };

  // Render flatlist
  friendRender = ({ item }) => {
    this.nameConver(item.uidRoom);
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
        <Text>{item.uidRoom[1]}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.converstations}
          renderItem={this.friendRender}
          keyExtractor={item => item.uidRoom[1]}
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
