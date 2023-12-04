import { StyleSheet, Text, View , Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect} from 'react';


export default function StoryList({navigation}, {language}) {

  const route = useRoute(); 
  const translateTo = route.params.language

  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')

  let storyList = [];

  useEffect(() => {
    firestore()
    .collection('stories')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => { // doc is fairytales
        // 
        storyList = doc.data().stories;
        // setStory(doc.data());
        console.log(doc.data().stories);
      });
      // console.log(storyList);

    })
    .catch((error) => console.log(error));
  }, [])

  console.log(storyList);

  // create a function that calls the api and then converts it to the language based on the passed language.

  // Query from firebase here for the story cards

  return (
    <View style={styles.container}>
        <Text>{route.params.language}</Text>
        //  TouchableOpacity
        // When clicked, it links to your next page, and then you navigate 
        // 
        {/* <View style={styles.main}>
        for all items in the fetched database of stories, you will iterate through the cards and display however many there are.
        
        <Text key={title.id}> {stories.title} </Text>
            <Text key={content.id}> {stories.content} </Text>
        {/* <Button title="Go Back" onPress={ () => router.back()}></Button> */}
      <Text style={styles.title}>Choose a Story</Text>

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
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    paddingBottom: "10%",
  },
});
