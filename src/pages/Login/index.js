import React, { useState, useEffect } from "react";
import { Button, TextInput, Text } from "react-native";
import { Container, View, Switch } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const { navigate } = useNavigation();

  async function handleLogin() {
    try {
      if (username !== "" && password !== "") {
        const jsonValue = await AsyncStorage.getItem(username);
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (password === realValue.password) {
          await handleKeepLogged();
          const parsedObject = JSON.stringify({
            username,
            keep: toggle,
          });
          await AsyncStorage.setItem("session", parsedObject);
          navigate("Added");
        } else {
          alert("Credenciais incorretas");
        }
      }else{
        alert("Credenciais incorretas")
      }
    } catch (error) {
      console.log(error);
      alert("Credenciais incorretas")
    }
  }
  async function handleKeepLogged() {
    if (toggle) {
      const jsonValue = JSON.stringify({
        username: username,
        keep: true,
      });
      try {
        await AsyncStorage.setItem("session", jsonValue);
        console.log("keep:true");
      } catch (error) {
        console.log(error);
      }
    } else {
      const jsonValue = JSON.stringify({
        username: "",
        keep: false,
      });
      try {
        await AsyncStorage.setItem("session", jsonValue);
        console.log("keep:false");
      } catch (error) {
        console.log(error);
      }
    }
  }
  function handleToggle() {
    setToggle(!toggle);
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
      <View>
        <Text>Manter-me Logado?</Text>
        <Switch value={toggle} onValueChange={() => handleToggle()} />
      </View>
      <View style={styles.button}>
        <Button color="#fe5722" onPress={() => handleLogin()} title="Login" />
      </View>
      <View style={styles.button}>
        <Button
          color="#fe5722"
          onPress={() => navigate("Signup")}
          title="Signup"
        />
      </View>
    </Container>
  );
};

export default Login;
