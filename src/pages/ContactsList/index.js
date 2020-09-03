import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Spinner,
  Body,
  CheckBox,
} from "native-base";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const ContactsList = ({ route }) => {
  const { navigate } = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactsToAdd, setContactsToAdd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [len, setLen] = useState(contactsToAdd.length);
  const { username, password, firstTime } = route.params;
  async function handleAddContacts(value) {
    try {
      const jsonValue = JSON.stringify({
        username,
        password,
        addedContacts: value,
      });
      await AsyncStorage.setItem(username, jsonValue);
      console.log("Success");
      if (firstTime) {
        navigate("Login");
      } else {
        navigate("Added");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const list = data;
          setContacts(list);
          setLoading(false);
        }
      }
    })();
  }, []);
  function handleContactsToAdd(value) {
    if (contactsToAdd.length <= 4) {
      let tempArray = contactsToAdd;
      let added = false;
      contactsToAdd.map((item) => {
        if (value.id === item.id) {
          added = true;
        }
      });
      if (added) {
        alert("already added");
      } else {
        tempArray.push(value);
        setContactsToAdd(tempArray);
        setLen(contactsToAdd.length);
      }
    }
  }
  function checkedItem(id) {
    let checked = false;
    contactsToAdd.map((item) => {
      if (id === item.id) {
        checked = true;
      }
    });
    return checked;
  }

  return (
    <Container style={styles.container}>
      <Content>
        {loading ? (
          <Spinner style={{ marginTop: "50%" }} size="large" color="red" />
        ) : (
          <List>
            {contacts.map((contact) => {
              return (
                <ListItem
                  key={contact.id}
                  onPress={() =>
                    handleContactsToAdd({
                      id: contact.id,
                      name: contact.name,
                      phoneNumber: contact.phoneNumbers[0].number,
                    })
                  }
                >
                  <CheckBox checked={checkedItem(contact.id)} color="red" />
                  <Body>
                    <Text>{contact.name}</Text>
                  </Body>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>
      <Button
        color="#fe5722"
        title={`Adicionar ${len} Contatos`}
        onPress={() => handleAddContacts(contactsToAdd)}
      />
    </Container>
  );
};

export default ContactsList;
