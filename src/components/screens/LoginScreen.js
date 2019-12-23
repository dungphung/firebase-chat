import React from "react";
import { firebaseService } from "../../services/index";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  AsyncStorage
} from "react-native";
import { setUserInfo } from "../../redux/actions/userAction";
import { connect } from "react-redux";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    user: ""
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  componentDidMount() {
    AsyncStorage.getItem("UserName").then(val => {
      if (val) {
        this.setState({ user: val });
      }
    });
  }

  handleClick = () => {
    firebaseService.userRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        if (this.state.user == el.data().name) {
          this.props.setUserInfo(el.data().uid);
          this.props.navigation.navigate("App");
        }
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          keyboardType="number-pad"
          value={this.state.user}
          onChangeText={this.handleChange("user")}
        />
        <Button title="Login" onPress={this.handleClick} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserInfo: userInfo => dispatch(setUserInfo(userInfo))
});
export default connect(null, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    padding: 10
  },
  input: {
    width: `100%`,
    marginBottom: 10,
    padding: 10,
    borderColor: `black`,
    borderWidth: 1
  }
});
