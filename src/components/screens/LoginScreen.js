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
    user: "",
    password: ""
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem("UserName").then(val => {
      if (val) {
        this.setState({ user: val });
      }
    });
  }

  handleClick = async () => {
    await AsyncStorage.setItem("UserName", this.state.user);
    name = this.state.user;
    uid = this.state.password;
    firebaseService
      .login({
        name,
        uid
      })
      .then(() => console.log("oke"))
      .catch(err => console.log(err));
    this.props.navigation.navigate("App");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="User"
          style={styles.input}
          keyboardType="number-pad"
          value={this.state.user}
          onChangeText={this.handleChange("user")}
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          placeholder="Password"
          onChangeText={this.handleChange("password")}
          keyboardType="number-pad"
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
