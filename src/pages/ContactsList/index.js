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

const ContactsList = () => {
  const { navigate } = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactsToAdd, setContactsToAdd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  async function handleAddContacts(value) {
    try {
      const jsonValue = JSON.stringify({
        username: currentUser,
        password: currentPassword,
        addedContacts: value,
      });
      await AsyncStorage.setItem(currentUser, jsonValue);
      console.log("Success");
      navigate("Added");
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
  useEffect(() => {
    async function listContacts() {
      try {
        const sessionValue = await AsyncStorage.getItem("session");
        const realSessionValue =
          sessionValue != null ? JSON.parse(sessionValue) : null;
        const jsonValue = await AsyncStorage.getItem(realSessionValue.username);
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setCurrentUser(realValue.username);
        setCurrentPassword(realValue.password);
        setContactsToAdd(realValue.addedContacts);
      } catch (error) {
        console.log(error);
      }
    }
    listContacts();
  }, []);
  function handleContactsToAdd(value) {
    let tempArray = contactsToAdd;
    let added = false;
    let removable;
    contactsToAdd.map((item, index) => {
      if (value.id === item.id) {
        added = true;
        removable = index;
      }
    });
    if (added) {
      tempArray.splice(removable, 1);
      setContactsToAdd(tempArray);
    } else {
      if (contactsToAdd.length <= 4) {
        tempArray.push(value);
        setContactsToAdd(tempArray);
      } else {
        alert("Remova um contato para adicionar outro");
      }
    }
  }
  return (
    <Container style={styles.container}>
      {loading ? (
        <Spinner style={{ marginTop: "50%" }} size="large" color="red" />
      ) : (
        <List
          dataArray={contacts}
          initialListSize={10}
          renderRow={(item) => (
            <ListItem
              selected={contactsToAdd.some((e) => e.id === item.id)}
              onPress={() => handleContactsToAdd(item)}
            >
              <Text>{item.name}</Text>
            </ListItem>
          )}
        />
      )}
      <Button
        color="#fe5722"
        title={`Adicionar Contatos`}
        onPress={() => handleAddContacts(contactsToAdd)}
      />
    </Container>
  );
};

export default ContactsList;
