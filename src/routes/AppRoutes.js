import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ContactsList from "../pages/ContactsList";
import AddedContacts from "../pages/AddedContacts";
import Settings from "../pages/Settings";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Screen
          options={{
            title: "Signup",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#ff3221",
            },
          }}
          name="Signup"
          component={Signup}
        />
        <Screen
          options={{
            title: "Seus contatos",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#ff3221",
            },
          }}
          name="Contacts"
          component={ContactsList}
        />
        <Screen
          options={{
            title: "Contatos adicionados",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#ff3221",
            },
          }}
          name="Added"
          component={AddedContacts}
        />
        <Screen
          options={{
            title: "Configurações",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#ff3221",
            },
          }}
          name="Settings"
          component={Settings}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
