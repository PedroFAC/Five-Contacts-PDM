import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Fab,
  Icon,
} from "native-base";
import call from "react-native-phone-call";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddedContacts = ({ route }) => {
  const { contacts } = route.params;
  const { navigate } = useNavigation();
  function handleCall(number) {
    const args = {
      number,
      prompt: true,
    };
    call(args).catch(console.error);
  }
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <List>
          {contacts!==undefined && contacts.map((contact) => {
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
      </Content>
      <Fab onPress={() => navigate("Contacts")}>
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
