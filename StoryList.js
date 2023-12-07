import { StyleSheet, Text, View , Button, TouchableOpacity, ScrollView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, createContext, useLayoutEffect} from 'react';

export default function StoryList({navigation}, language) {

  const route = useRoute(); 
  const translateTo = route.params.language;

  const [indexStory , setIndex] = useState(0)
  const [storyArray, setStoryArray] = useState([]) // array of objects
  let storyList = [];

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    firestore()
    .collection('stories')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => { // doc is fairytales
        storyList = doc.data().stories;
        setStoryArray(storyList)
      });
    })
    .catch((error) => console.log(error));
  }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.maintitle}>Choose a Story </Text>
        <ScrollView style={styles.scrollView}>
          {
            storyArray.map((item, index) => (
              <TouchableOpacity key={index} style={styles.touchable} onPress={() => setIndex(index + 1)} >
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.content} numberOfLines={2} ellipsizeMode='tail'>{item.content}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        { (indexStory > 0) && (
          <View>
          <TouchableOpacity style={styles.buttonGo} >
            <Text style={styles.goText} onPress={() => navigation.navigate('ChosenStory', {story: storyArray[indexStory - 1], translate: translateTo})}> Go </Text>
          </TouchableOpacity>
          </View>
        )}

        <View>
          <Button onPress={() => navigation.navigate('ChooseLang')} title="Go back" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goText: {
    textAlign: 'center',         // Center align text
    fontSize: 20,                // Larger font size for prominence
    fontWeight: 'bold',          // Bold font weight
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  scrollView: {
    borderRadius: 10,          
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  buttonColor: {
    fontWeight: 1000,
    color: "blue",
  },
  buttonGo: {
    alignContent: 'center',
    borderRadius: 30,  
    margin: 30,        
    borderWidth: 5,
    backgroundColor: 'red',
    marginLeft: 30,
    marginRight: 30,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  touchable: {
    borderWidth: 3,
    borderColor: '#6191F0',
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  maintitle: {
    textAlign: 'center',         // Center align text
    fontSize: 20,                // Larger font size for prominence
    fontWeight: 'bold',          // Bold font weight
    color: '#333',               // Color of the text, choose what fits your app theme
    marginVertical: 20,  
    margin: 30,        // Vertical margin for spacing
    textShadowRadius: 1,
    fontFamily: 'Avenir-Next',
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

