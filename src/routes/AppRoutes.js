import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ContactsList from "../pages/ContactsList";
import AddedContacts from "../pages/AddedContacts";
import Settings from "../pages/Settings";
import AsyncStorage from "@react-native-community/async-storage";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  const [keep, setKeep] = useState(false);
  useEffect(() => {
    async function getLoginOption() {
      try {
        const jsonValue = await AsyncStorage.getItem("session");
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setKeep(realValue.keep);
      } catch (error) {
        console.log(error);
      }
    }
    getLoginOption();
    console.log(keep);
  }, [keep]);
  return (
    <NavigationContainer>
      <Navigator>
        {keep ? (
          <>
            <Screen
              options={{
                title: "Contatos adicionados",
                headerTintColor: "#ffffff",
                headerLeft: null,
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
          </>
        ) : (
          <>
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
                title: "Contatos adicionados",
                headerTintColor: "#ffffff",
                headerLeft: null,
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
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
