import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Container, Content, List, ListItem, Fab, Spinner } from "native-base";
import call from "react-native-phone-call";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";

const AddedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const { navigate } = useNavigation();
  async function handleCall(number) {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    console.log;
    if (status == "granted") {
      const args = {
        number,
        prompt: true,
      };
      call(args).catch(console.error);
    }
  }
  useEffect(() => {
    async function listContacts() {
      try {
        const sessionValue = await AsyncStorage.getItem("session");
        const realSessionValue =
        sessionValue != null ? JSON.parse(sessionValue) : null;
        const jsonValue = await AsyncStorage.getItem(realSessionValue.username);
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setCurrentUser(realValue.username);
        setContacts(realValue.addedContacts);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    listContacts();
  }, [contacts, currentUser]);

  return (
    <Container style={{ flex: 1 }}>
      {loading ? (
        <Spinner size="large" color="red" />
      ) : (
        <List>
          {contacts.map((contact) => {
            return (
              <ListItem
                onPress={() => handleCall(contact.phoneNumbers[0].number)}
                key={contact.id}
              >
                <Text>{contact.name}</Text>
              </ListItem>
            );
          })}
        </List>
      )}
      <Fab
        style={{ backgroundColor: "#fe5722" }}
        onPress={() => navigate("Contacts")}
      >
        <MaterialCommunityIcons
          name="swap-horizontal"
          size={24}
          color="white"
        />
      </Fab>
      <Fab
        position="bottomLeft"
        style={{ backgroundColor: "#fe5722" }}
        onPress={() => navigate("Settings")}
      >
        <MaterialCommunityIcons name="settings" size={24} color="white" />
      </Fab>
    </Container>
  );
};

export default AddedContacts;
