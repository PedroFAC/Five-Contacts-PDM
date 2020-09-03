import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Container, Content, List, ListItem, Fab, Spinner } from "native-base";
import call from "react-native-phone-call";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";

const AddedContacts = ({ route }) => {
  const { user } = route.params;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();
  async function handleCall(number) {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
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
        const jsonValue = await AsyncStorage.getItem(user.username);
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setContacts(realValue.addedContacts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    listContacts();
  }, [contacts]);

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        {loading ? (
          <Spinner size='large' color="red" />
        ) : (
          <List>
            {contacts.map((contact) => {
              return (
                <ListItem
                  onPress={() => handleCall(contact.phoneNumber)}
                  key={contact.id}
                >
                  <Text>{contact.name}</Text>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>
      <Fab style={{backgroundColor:'#fe5722'}} onPress={() => navigate("Contacts", user)}>
        <MaterialCommunityIcons
          name="swap-horizontal"
          size={24}
          color="white"
        />
      </Fab>
    </Container>
  );
};

export default AddedContacts;
