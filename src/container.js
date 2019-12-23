import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import AuthLoadingScreen from "./components/screens/AuthLoadingScreen";
// import TestScreen from "./container2";
import ChatScreen from "./components/screens/ChatScreen";

const AppStack = createStackNavigator({ Home: HomeScreen, Chat: ChatScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
      // Test: TestScreen
    },
    {
      initialRouteName: "Auth"
    }
  )
);
