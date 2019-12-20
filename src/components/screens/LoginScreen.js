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

export default class LoginScreen extends React.Component {
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
    firebaseService.login(this.state.user);
    this.props.navigation.navigate("App");
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
