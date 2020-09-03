import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { Container, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
  async function handleLogin() {
    try {
      const jsonValue = await AsyncStorage.getItem(username);
      const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (password === realValue.password) {
        navigate("Added", { user: realValue });
      } else {
        alert('Credenciais incorretas')
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
      <View style={styles.button}>
        <Button color='#fe5722' onPress={() => handleLogin()} title="Login" />
      </View>
      <View style={styles.button}>
        <Button color='#fe5722' onPress={() => navigate("Signup")} title="Signup" />
      </View>
    </Container>
  );
};

export default Login;
