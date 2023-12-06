import { StyleSheet, Text, View , Button, TouchableOpacity} from "react-native";
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function ChooseLang({navigation}) {

  const [language, setLanguage] = useState("");

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
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={ () => chooseLanguage("Spanish")}>
          <Text style={styles.buttonText}>Spanish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => chooseLanguage("French")}>
          <Text style={styles.buttonText}>French</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => chooseLanguage("German")}>
          <Text style={styles.buttonText}>German</Text>
        </TouchableOpacity>
      {(language != "") && (
              <View style={styles.container}> 
                <View style={styles.main}>
                  <Text style={styles.link}
                    onPress={() => navigation.navigate('HowItWorks',
                    {language})
                  }> Next </Text>                
                                  {/* <Text style={styles.chosenLang}> You have chosen {language}.</Text> */}
                </View>
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
    padding: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  subtitle: {
    paddingTop: 50,
    fontSize: 30,
    fontWeight: '500',
  },
  chosenLang: {
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 50,
  },
  language: {
    fontSize: 80,
    color: "white",
  },
  link: {
    fontSize: 40,
    fontWeight: 500,
    color: "blue",
  },
  button: {
    backgroundColor: '#6191F0',
    margin: "5%",  // Adjust padding to change size
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // Adjust font size for text
  },
});
