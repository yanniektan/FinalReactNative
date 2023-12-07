import { StyleSheet, Text, View , Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import React, { useState, useEffect, useLayoutEffect} from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HowItWorks({navigation: navigation}) {
  const route = useRoute(); 
  const language = route.params.language;

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <View style={styles.container}>
        <View style={styles.main}>

        <Text style={styles.title}>How It Works</Text>
        
        <Text style={styles.subtitle}>You’ll be given a selection of short stories to listen to.</Text>
        <Text style={styles.subtitle}>For every english sentence, the story will be repeated in your language three times.</Text>
        <Text style={styles.subtitle}>Each time, slightly faster.</Text>
        <Text style={styles.link} 
              onPress={() => navigation.navigate('StoryList', {language})}> Begin </Text>
        </View>

        <View>
          <Button onPress={() => navigation.navigate('ChooseLang')} title="Go back" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 34,
    justifyContent: "center",
    alignItems: 30,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 24,
    color: "blue",
    justifyContent: "center",
    alignItems: 30,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    paddingBottom: "10%",
  },
});
