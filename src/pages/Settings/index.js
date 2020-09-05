import React, { useState, useEffect } from "react";
import { Button, Text ,View} from "react-native";
import { Container, Switch } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const Settings = () => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState('')

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
        setCurrentUser(realValue.username)
      } catch (error) {
        console.log(error);
      }
    }
    getLoginOption();
  }, []);

  async function handleKeepLogged() {
    if (toggle) {
      const jsonValue = JSON.stringify({
        username: currentUser,
        keep: true,
      });
      try {
        await AsyncStorage.setItem("session", jsonValue);
        navigate('Added')
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
        navigate('Added')
        console.log("keep:false");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Container style={styles.container}>
      <View>
        <Text>Manter logado?</Text>
        <Switch value={toggle} onValueChange={() => handleToggle()} />
      </View>
      <Button
        onPress={() => handleKeepLogged()}
        color="#fe5722"
        title={`Confirmar mudanças`}
      />
    </Container>
  );
};

export default Settings;
