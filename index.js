import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {Link} from 'expo-router';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import Tts from 'react-native-tts'
import { useLayoutEffect } from "react";

export default function Index({navigation}) {

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Aloud</Text>
        <Text style={styles.subtitle}>A Language Listening App</Text>
        <Text style={styles.link} onPress={() => navigation.navigate('ChooseLang')}> Begin </Text>
        <TouchableOpacity style={styles.button}>
      </TouchableOpacity>
      </View>
    </View>
  );
}
AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "90%",
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 90,
    color: '#6191F0',
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
    marginBottom: 30,
  },
  link: {
    fontSize: 20,
    color: '#6191F0',
    fontWeight: "bold",
  }
});
