import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { Container, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { navigate } = useNavigation();
  async function checkIfAdded() {
    try {
      const jsonValue = await AsyncStorage.getItem(username);
      const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (realValue !== null) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  async function registerUser(value) {
    const added = await checkIfAdded();
    try {
      if (
        password === confirmPassword &&
        added === false &&
        password !== "" &&
        confirmPassword !== "" &&
        username !== ""
      ) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(username, jsonValue);
        console.log("Success");
        navigate("Login");
      } else {
        alert("Erro de credenciais");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />

      <View style={styles.buttonView}>
        <Button
          color="#fe5722"
          onPress={() =>
            registerUser({ username, password, addedContacts: [] })
          }
          title="Signup"
        />
      </View>
    </Container>
  );
};

export default Signup;
