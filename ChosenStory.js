import { FlatList, StyleSheet, Text, View , Button, TouchableOpacity, ActivityIndicator} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { translateLang } from "./translate";
import { ScrollView } from "react-native-gesture-handler";
import Tts from "react-native-tts";

export default function ChosenStory({navigation, route}, translate) {

  const content = route.params.story.content
  const [translatedStory, setTranslatedStory] = useState('')
  const translateLanguage = route.params.translate;
  const languageFrom = 'en'
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
      try {
        setIsLoading(true);
        const result = await translateLang(content, translateLanguage, languageFrom);
        console.log("Translate Function: ", result)
        if (!result) {
          setTranslatedStory("");
          return;
        }
        const textResult = result.translated_text[result.to]
        setTranslatedStory(textResult);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
  }, [content, translateLanguage]);

  Tts.getInitStatus().then(() => {
    Tts.setDefaultPitch(0.5);
    Tts.setDefaultLanguage(translateLanguage);
  }, (err) => {
    if (err.code === 'no_engine') {
      Tts.requestInstallEngine();
    }
  });

  const handlePress = (sentence) => {
    Tts.speak(sentence);
  };

  const handlePressSlow = (sentence) => {
    Tts.setDefaultRate(0.2);
    Tts.speak(sentence);
  };

  const sentences = translatedStory.split('. ').filter(sentence => sentence.length > 0).map(sentence => sentence.trim() + '.');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {onSubmit} style={styles.button}> 
        <Text style={styles.buttonText}> 
        Click to Translate (Will take a moment...)
        </Text>      
      </TouchableOpacity>
      <Text>{ content }</Text>            
      <Text style={styles.subtitle}>Listen Sentence by Sentence</Text>

      {
        sentences.map((sentence, index) => (
           <View >
            <View style={styles.left}>      

              <Text key={index}>{sentence}</Text>
              <TouchableOpacity style={styles.playButton} onPress={() => handlePress(sentence)} > 
                  <Text style={styles.play}> PLAY </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButtonGreen} onPress={() => handlePressSlow(sentence)} > 
                  <Text style={styles.play}> PLAY SLOWER </Text> 
              </TouchableOpacity>
            </View>
          </View>
        ))
      }
    </View>
  );
  // onPress={() => handleVoice(sentence)
}

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: 'red', // Red background
    borderRadius: 30,       // High border radius for round shape
    padding: 2,            // Padding for size
    justifyContent: 'center', // Align children to the top
    alignItems: 'center',    
    marginBottom: "1.5%",
    marginTop: "1.5%",
    },
    playButtonGreen: {
      backgroundColor: 'green', // Red background
      borderRadius: 30,       // High border radius for round shape
      padding: 2,            // Padding for size
      justifyContent: 'center', // Align children to the top
      alignItems: 'center',    
      marginBottom: "1.5%",
      marginTop: "1.5%",
      },
  play: {
    color: 'white',
    fontWeight: 'bold',
  },
  smallButton: {
    borderRadius: 10,
    borderColor: "black",
  },
  left: {
    marginRight: "2%",
    marginLeft: "2%",
    marginBottom: "2.5%",
    marginTop: "2.5%",
  },
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
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 3,
  },
  touchable: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 15,
    color: "blue",
    fontWeight: 700,
    textAlign: 'center',         // Center align text
    fontWeight: 'bold',          // Bold font weight
    color: '#333',               // Color of the text, choose what fits your app theme
    marginVertical: 10,          // Vertical margin for spacing
    textShadowRadius: 1,
  },
  content: {
    fontSize: 14
  },
  button: {
    backgroundColor: 'blue', // Red background
    borderRadius: 5,       // High border radius for round shape
    padding: 2,            // Padding for size
    justifyContent: 'center', // Align children to the top
    alignItems: 'center',    
    marginBottom: "2.5%",
    marginTop: "2.5%",
    padding: 10,
    margin: 10,
    marginBotton: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
