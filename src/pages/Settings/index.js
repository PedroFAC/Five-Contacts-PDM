import React, { useState,useEffect } from "react";
import { Button } from "react-native";
import { Container, Switch } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";

const Settings = ({ route }) => {
  const [toggle, setToggle] = useState(false);
  const { user } = route.params;

  function handleToggle() {
    setToggle(!toggle);
  }
  useEffect(() => {
    console.log(user)
    async function getLoginOption() {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        setToggle(realValue.keep);
      } catch (error) {
        console.log(error);
      }
    };
    getLoginOption();
  }, []);

  async function handleKeepLogged() {
    if (toggle) {
      const jsonValue = JSON.stringify({
        username: user.username,
        password: user.password,
        keep: true,
      });
      try{
        await AsyncStorage.setItem("currentUser", jsonValue);
        console.log('sucess')
      }catch(error){
        console.log(error)
      }
    } else {
      const jsonValue = JSON.stringify({
        username: "",
        password: "",
        keep: false,
      });
      await AsyncStorage.setItem("currentUser", jsonValue);
    }
  }
  return (
    <Container style={styles.container}>
      <Switch value={toggle} onValueChange={() => handleToggle()} />
      <Button onPress={()=> handleKeepLogged()} color="#fe5722" title={`Confirmar mudanças`} />
    </Container>
  );
};

export default Settings;
