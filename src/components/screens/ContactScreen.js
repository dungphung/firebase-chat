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

class ContactScreen extends Component {
  state = {
    converstations: [],
    userUid: this.props.userUid,
    listContact: []
  };

  // Get data friends and set to state
  componentDidMount() {
    firebaseService.userRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        this.setState({ listContact: [...this.state.listContact, el._data] });
      });
    });
  }
  handleNewContact = item => {
    firebaseService.converstationRef.get().then(result => {
      const lee = result._changes;
      for (let index = 0; index < lee.length; index++) {
        const length2 = lee[index]._document._data.uidRoom;
        if (
          (length2[0] === this.state.userUid && length2[1] === item.uid) ||
          (length2[1] === this.state.userUid && length2[0] === item.uid)
        ) {
          this.props.navigation.navigate("Chat", {
            item: item.name,
            userUid: this.state.userUid,
            idDocs: "1DEUmdWTCG5HFhIlrvJP"
          });
        } else {
          firebaseService.createConversation({
            nameRoom: item.name,
            roomId: "dsad",
            uidRoom: [this.state.userUid, item.uid]
          });
        }
      }
    });
  };

  // Render flatlist
  contactRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleNewContact(item)}
        style={styles.itemList}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.listContact}
          renderItem={this.contactRender}
          keyExtractor={(index, item) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userUid: state.userReducer.userUid
});
export default connect(mapStateToProps)(ContactScreen);
const styles = StyleSheet.create({
  itemList: {
    padding: 5,
    margin: 2,
    flex: 1,
    alignItems: `center`,
    backgroundColor: `pink`
  }
});
