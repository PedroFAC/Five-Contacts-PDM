import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";
import call from "react-native-phone-call";
import * as SMS from "expo-sms";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";

const ContactsList = () => {
  const { navigate } = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactsToAdd, setContactsToAdd] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  async function handleSms(number) {
    const isAvailable = await SMS.isAvailableAsync();
    isAvailable ? SMS.sendSMSAsync(number, "Teste") : console.log("erro");
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

  function handleAddContacts() {
    navigate("Added", { contacts: contactsToAdd });
    console.log(contactsToAdd);
  }

  return (
    <Container style={{ flex: 1 }}>
      <Content>
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
      </Content>
      <Button
        title="Adicionar Contatos"
        onPress={() => handleAddContacts()}
      />
    </Container>
  );
};

export default ContactsList;
