import { StyleSheet, Text, View, Button } from "react-native";
import {Link} from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';


export default function Index({navigation}) {


  // const firebaseConfig = {
  //   apiKey: "AIzaSyAEHkLoQUtcd3iwU5nkTnHj7OFag8fLKHs",
  //   authDomain: "aloud-17f70.firebaseapp.com",
  //   projectId: "aloud-17f70",
  //   storageBucket: "aloud-17f70.appspot.com",
  //   messagingSenderId: "436092499663",
  //   appId: "1:436092499663:web:e2c88a26f70996e145e9ba",
  //   measurementId: "G-3TLKEP131B"
  // };

  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);


  // async function getStories(db) {
  //   const storiesCol = collection(db, 'stories');
  //   const storySnapshot = await getDocs(storiesCol);
  //   const storyList = storySnapshot.docs.map(doc => doc.data());
  //   console.log(storyList)
  //   return storyList;
  // }

  // getStories(db);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Aloud</Text>
        <Text style={styles.subtitle}>A Language Listening App</Text>
        <Text style={styles.link} 
              
              onPress={() => navigation.navigate('ChooseLang')}
              
              > Begin </Text>
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
