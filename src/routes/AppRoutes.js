import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ContactsList from "../pages/ContactsList";
import AddedContacts from "../pages/AddedContacts";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Login" component={Login} />
        <Screen name="Signup" component={Signup} />
        <Screen name="Contacts" component={ContactsList} />
        <Screen name="Added" component={AddedContacts} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
