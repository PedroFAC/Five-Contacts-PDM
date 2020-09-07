import React, { useState, useEffect } from "react";
import { Button, Text, View, TextInput } from "react-native";
import { Container, Switch, Label } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const Settings = () => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addedContacts, setAddedContacts] = useState([]);
  const { navigate } = useNavigation();

  function handleToggle() {
    setToggle(!toggle);
  }
  useEffect(() => {
    async function getLoginOption() {
      try {
        const jsonValue = await AsyncStorage.getItem("session");
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setToggle(realValue.keep);
        setCurrentUser(realValue.username);
      } catch (error) {
        console.log(error);
      }
    }
    async function getSession() {
      try {
        const jsonSession = await AsyncStorage.getItem(currentUser);
        const realSessionValue = jsonSession != null ? JSON.parse(jsonSession) : null;
        setUsername(realSessionValue.username);
        setPassword(realSessionValue.password);
        setConfirmPassword(realSessionValue.password);
        setAddedContacts(realSessionValue.addedContacts)
      } catch (error) {
        console.log(error);
      }
    }
    getLoginOption();
    getSession();
    console.log(addedContacts)
  }, [currentUser]);

  async function handleChanges() {
    if (
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      const jsonUser = JSON.stringify({
        username,
        password,
        addedContacts,
      });
      if (toggle) {
        const jsonValue = JSON.stringify({
          username: currentUser,
          keep: true,
        });
        try {
          await AsyncStorage.setItem("session", jsonValue);
          await AsyncStorage.setItem(username, jsonUser);
          navigate("Added");
          console.log("keep:true");
        } catch (error) {
          console.log(error);
        }
      } else {
        const jsonValue = JSON.stringify({
          username: currentUser,
          keep: false,
        });
        try {
          await AsyncStorage.setItem("session", jsonValue);
          await AsyncStorage.setItem(username, jsonUser);
          navigate("Added");
          console.log("keep:false");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Erro de credenciais");
    }
  }
  async function handleSignout() {
    const jsonValue = JSON.stringify({
      username: "",
      keep: false,
    });
    try {
      await AsyncStorage.setItem("session", jsonValue);
      navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <View style={styles.container}>
        <View>
          <Label>Username</Label>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          <Label>Senha</Label>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Label>Confirmar Senha</Label>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
          <View>
            <Text>Manter logado?</Text>
            <Switch value={toggle} onValueChange={() => handleToggle()} />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => handleSignout()}
            color="#fe5722"
            title={"Signout"}
          />
        </View>
      </View>
      <View>
        <Button
          onPress={() => handleChanges()}
          color="#fe5722"
          title={`Confirmar mudanças`}
        />
      </View>
    </Container>
  );
};

export default Settings;
