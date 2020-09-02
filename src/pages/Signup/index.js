import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { Container, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { navigate } = useNavigation();

  async function registerUser(value){
    try{
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(username, jsonValue);
      console.log('Success');
      navigate('Login');
    }catch(error){
      console.log(error);

    }
  }
  return (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
        placeholder="Login"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />

      <View style={{ marginVertical: 10 }}>
        <Button
          onPress={()=>registerUser({username,password})}
          style={{ marginVertical: 10 }}
          title="Signup"
        />
      </View>
    </Container>
  );
};

export default Login;
