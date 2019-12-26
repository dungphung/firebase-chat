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
    userUid: this.props.userUid,
    listContact: [],
    listConversations: []
  };

  // Get data contact and set to state
  componentDidMount() {
    firebaseService.userRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        this.setState({ listContact: [...this.state.listContact, el._data] });
      });
    });
    firebaseService.converstationRef.onSnapshot(snapshot => {
      const list = [];
      snapshot._docs.forEach(element => {
        const text = element._ref._documentPath._parts[1];
        list.push({ ...element._data, text });
      });
      this.setState({
        listConversations: list
      });
    });
  }

  handleNewContact = item2 => {
    // this.state.listConversations.forEach(element => {
    //   element.uidRoom.filter(el => {
    //     if (el ) {

    //     }
    //   });
    // });

    firebaseService.converstationRef.get().then(result => {
      const lee = result._changes;

      // filter if has item
      const value = lee.filter(item => {
        if (
          (item._document._data.uidRoom[0] == this.state.userUid &&
            item._document._data.uidRoom[1] == item2.uid) ||
          (item._document._data.uidRoom[1] == this.state.userUid &&
            item._document._data.uidRoom[0] == item2.uid)
        ) {
          return item;
        } else {
          return null;
        }
      });
      // filter if has item

      // check lenght value
      if (value.length > 0) {
        this.props.navigation.navigate("Chat", {
          item: item2.name,
          userUid: this.state.userUid,
          idDocs: "1DEUmdWTCG5HFhIlrvJP"
        });
      } else {
        // create new conversation and redirect to this
        firebaseService.converstationRef
          .add({
            uidRoom: [this.state.userUid, item2.uid]
          })
          .then(result => {
            this.props.navigation.navigate("Chat", {
              item: item2.name,
              userUid: this.state.userUid,
              idDocs: result._documentPath._parts[1]
            });
          });
      }
      // check lenght value
    });
  };

  // Render flatlist
  contactRender = ({ item }) => {
    return (
      item.uid !== this.state.userUid && (
        <TouchableOpacity
          onPress={() => this.handleNewContact(item)}
          style={styles.itemList}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.listContact}
          renderItem={this.contactRender}
          keyExtractor={item => item.name.toString()}
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
