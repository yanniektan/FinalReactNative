import { StyleSheet, Text, View , Button, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { translateLang } from "./translate";

export default function ChosenStory({navigation, route}, translate) {

  // const translateLanguage = route.params.translateTo
  const storyText = route.params.story
  const content = route.params.story.content
  const [translatedStory, setTranslatedStory] = useState('')
  const translateLanguage = route.params.translate;
  const languageFrom = 'en'
  // console.log("translatedLanguage:", translateLanguage)

  // const [translated, setTranslated] = useState("");
  const onSubmit = useCallback( async () => {
      try {
        const result = await translateLang(content, translateLanguage, languageFrom);
        console.log("Translate Function: ", result)
        if (!result) {
          setTranslatedStory("");
          return;
        }
        const textResult = result.translated_text[result.to]
        setTranslatedStory(textResult);
        console.log("translatedText:", textResult)
      } catch (error) {
        console.log(error)
      }
  }, [content, translateLanguage]);

  return (
    <View>
      <TouchableOpacity onPress = {onSubmit}> 
      <Text> 
        Translate Now {translatedStory}
      </Text> 
      </TouchableOpacity>
      <Text>Hi</Text>
      {/* <Text> Hello {translated} End </Text> */}
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
    fontSize: 20,
    color: "black",
    paddingBottom: "10%",
  },
  content: {
    fontSize: 14
  }
});

//   const translateText = async (storyText) => {
//   try {
//     const response = await axios.post('https://translate.googleapis.com/v3beta1/projects/graphic-linker-406223:translateText', {
//       q: storyText,
//       target: translateLanguage, // target language
//     }, {
//       headers: { 'Authorization': `Bearer AIzaSyB_3A02xN4DH_gBwOqCb4m4XorcFp-NfC8` }
//     });
//     setTranslated(response.data)
//     return response.data;
//     // response.data.translations.translatedText
//   } catch (error) {
//     console.error(error);
//   }
// };
