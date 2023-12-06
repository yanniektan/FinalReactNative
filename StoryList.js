import { StyleSheet, Text, View , Button, TouchableOpacity, ScrollView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, createContext} from 'react';

export default function StoryList({navigation}, {language}) {

  const route = useRoute(); 
  const translateTo = route.params.language;
  console.log(translateTo, "THIS IS THE STRING")

  const [indexStory , setIndex] = useState(0)
  const [storyArray, setStoryArray] = useState([]) // array of objects
  let storyList = [];

  useEffect(() => {
    firestore()
    .collection('stories')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => { // doc is fairytales
        // 
        storyList = doc.data().stories;
        setStoryArray(storyList)
      });
    })
    .catch((error) => console.log(error));
  }, [])

  console.log("THIS", translateTo)
  return (
    <View style={styles.container}>
        <Text style={styles.maintitle}>Choose a Story {translateTo} </Text>
        <ScrollView style={styles.scrollView}>
          {
            storyArray.map((item, index) => (
              <TouchableOpacity key={index} style={styles.touchable} onPress={() => setIndex(index)} >
                <View >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.content} numberOfLines={2} ellipsizeMode='tail'>{item.content}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        { (indexStory != null) && (
          <View>
          <TouchableOpacity>
            <Text style={styles.title} onPress={() => navigation.navigate('ChosenStory', {story: storyArray[indexStory], translate: translateTo})}> Go </Text>
          </TouchableOpacity>
          </View>
        )}
    {/* <ScrollView>
      {storyArray.map((story, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(story, {translateTo})}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode='tail'>{item.content}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 30,                // Larger font size for prominence
    fontWeight: 'bold',          // Bold font weight
    color: '#333',               // Color of the text, choose what fits your app theme
    marginVertical: 20,          // Vertical margin for spacing
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


  // const [currentStory, setCurrentStory] = useState({});
  // const StoryList = ({ stories }) => {
  //   const { setCurrentStory } = useContext(StoryContext);
  //   const navigation = useNavigation();

  //   const handlePress = (story) => {
  //     setCurrentStory(story);
  //     navigation.navigate('ChosenStory'); 
  // };

        // for (let index in storyList) {
        //   storyObject.push(storyList[index])
        //   setStoryObject(storyObject);
        // }
  // Create a function that calls the api and then converts it to the language based on the passed language.
  // Query from firebase here for the story cards
  // console.log(storyObject)