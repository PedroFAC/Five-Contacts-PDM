import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { Container, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
  async function handleLogin() {
    try {
      const jsonValue = await AsyncStorage.getItem(username)
      const realValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(password === realValue.password){
        navigate('Added',{contacts:[]})
      }else{
        console.log('failure')
      }
    } catch(error) {
      console.log(error)
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
      <View>
        <Button
          onPress={()=>handleLogin()}
          style={{ marginVertical: 10 }}
          title="Login"
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          onPress={() => navigate("Signup")}
          style={{ marginVertical: 10 }}
          title="Signup"
        />
      </View>
    </Container>
  );
};

export default Login;
