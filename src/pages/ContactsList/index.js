import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { Container, Content, List, ListItem, Text, Spinner } from "native-base";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const ContactsList = ({ route }) => {
  const { navigate } = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactsToAdd, setContactsToAdd] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    if (contactsToAdd.length === 5) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    }
  }, [contactsToAdd]);
  function handleContactsToAdd(value) {
    if (contactsToAdd.length <= 4) {
      let tempArray = contactsToAdd;
      tempArray.push(value);
      setContactsToAdd(tempArray);
      console.log(contactsToAdd.length);
    }
  }

  return (
    <Container style={styles.container}>
      <Content>
        {loading ? (
          <Spinner style={{marginTop:'50%'}} size='large' color="red" />
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
                  <Text>{contact.name}</Text>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>
      <Button
        color="#fe5722"
        title="Adicionar Contatos"
        onPress={() => handleAddContacts(contactsToAdd)}
      />
    </Container>
  );
};

export default ContactsList;
