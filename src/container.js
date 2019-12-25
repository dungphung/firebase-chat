import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import AuthLoadingScreen from "./components/screens/AuthLoadingScreen";
// import TestScreen from "./container2";
import ChatScreen from "./components/screens/ChatScreen";
import ContactScreen from "./components/screens/ContactScreen";

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Contact: ContactScreen,
    Chat: ChatScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1
    })
  }
);
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

const TabNavigatior = createBottomTabNavigator({
  Chats: AppStack,
  Contact: ContactScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: TabNavigatior
    },
    {
      initialRouteName: "Auth"
    }
  )
);
