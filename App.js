import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContactsList from './src/pages/ContactsList';
import Login from './src/pages/Login'
import * as Font from 'expo-font';
import AppRoutes from './src/routes/AppRoutes';


export default function App() {
  return (
    <AppRoutes/>
  );
}

