import React, { useState, useEffect } from 'react';
import Svg, { Path } from "react-native-svg";
import { StyleSheet, View, ScrollView, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { collection, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from "../API/firebase.config.js";
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';

const { width, height } = Dimensions.get("window");

const Star = ({ filled }) => (
  <View style={{ display: filled ? 'flex' : 'none', marginRight: 2 }}>
    <Ionicons name="ios-star" size={15} color="#ffc107" />
  </View>
);

export default function Swiper() {
  const navigation = useNavigation(); // Initialize navigation hook
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const fetchedRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Coiny_400Regular
  });
  
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      width: width,
      height: height,
    },
    scrollViewContent: {
      flexDirection: 'row',
    },
    pictureContainer: {
      width: width,
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    image: {
      width: width - 32, 
      height: height * 0.50, 
      borderRadius: 5,
      margin: 8
    },
    title: {
      fontSize: 16,
      fontFamily: 'Coiny_400Regular',
    },
    description: {
      fontFamily: 'Montserrat_400Regular',
      fontSize: 12
    },
    rateText: {
      fontSize: 14,
      fontFamily: 'Montserrat_600SemiBold',
    }

  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate={"fast"}
      horizontal
    >
      {recipes.map((recipe, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: recipe.id })}>
          <View style={styles.pictureContainer}>
            <View style={styles.picture}>
              <View style={{ borderTopWidth: 0, borderWidth: 2, borderRadius: 8, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderColor: '#ECECEC' }}>
                <View style={{ width: '100%', marginBottom: 8 }}>
                  <Image style={styles.image} source={{ uri: recipe.imageUrl }} />
                </View>
                <View style={{ padding: 5 }}>
                  <Text style={styles.title}>{recipe.title}</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Text style={styles.description}>{recipe.description}</Text>
                </View>
                <View style={{ padding: 5, flexDirection: 'row', gap: 1 }}>
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} filled={starIndex < recipe.rating} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}