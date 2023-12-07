import { StyleSheet, Text, View , Button, TouchableOpacity} from "react-native";
import React, { useState, useEffect, useLayoutEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function ChooseLang({navigation}) {

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [language, setLanguage] = useState("");
  const [languageTitle, setLanguageTitle] = useState("")

  const chooseLanguage = (language) => {
    if (language == "Spanish") {
      setLanguage("es");
    }
    if (language == "French") {
      setLanguage("fr");
    }
    if (language == "German") {
      setLanguage("de");
    }
    if (language == "Italian") {
      setLanguage("it");
    }
    if (language == "Arabic") {
      setLanguage("ar");
    }
  }

  const makeLanguage = ( language ) => {
    chooseLanguage(language);
    setLanguageTitle(language);
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Language.</Text>
        <TouchableOpacity style={styles.button} onPress={ () => makeLanguage("Spanish")}>
          <Text style={styles.buttonText}>Spanish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => makeLanguage("French")}>
          <Text style={styles.buttonText}>French</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => makeLanguage("German")}>
          <Text style={styles.buttonText}>German</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => makeLanguage("Italian")}>
          <Text style={styles.buttonText}>Italian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => makeLanguage("Arabic")}>
          <Text style={styles.buttonText}>Arabic</Text>
        </TouchableOpacity>
      {(language != "") && (
                <View>
                  <Text style={styles.chosenLang}> You have chosen {languageTitle}.</Text>
                  <TouchableOpacity style={styles.buttonNext}>
                  <Text style={styles.buttonText}
                    onPress={() => navigation.navigate('HowItWorks',
                    {language})}> Next </Text>
                  </TouchableOpacity>
                </View>
      )}

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    paddingTop: 80,
  },
  title: {
    fontSize: 30,
    color: '#6191F0',
    fontWeight: "bold",
    margin: "5%",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  subtitle: {
    paddingTop: 50,
    fontSize: 30,
    fontWeight: '500',
  },
  chosenLang: {
    fontSize: 15,
    paddingTop: 40,
    textAlign: 'center',         
    alignItems: 'center',
    // Center align text
    fontWeight: '500',
    color: "black",
    fontWeight: 800,
  },
  language: {
    fontSize: 80,
    color: "white",
  },
  link: {
    fontSize: 20,
    fontWeight: 500,
    color: "blue",
    textAlign: 'center',         // Center align text
    fontSize: 30,                // Larger font size for prominence
    fontWeight: 'bold',          // Bold font weight
    color: '#333',               // Color of the text, choose what fits your app theme
    marginVertical: 20,          // Vertical margin for spacing
    textShadowRadius: 1,
    fontFamily: 'Avenir-Next',
  },
  button: {
    backgroundColor: '#6191F0',
    margin: "2%",  // Adjust padding to change size
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
  },
  buttonNext: {
    backgroundColor: 'red',
    margin: "2%",  // Adjust padding to change size
    borderRadius: 15,
    padding: "1.2%",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // Adjust font size for text
  },
});
