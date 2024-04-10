import React from 'react';
import Svg, { Path } from "react-native-svg";
import { StyleSheet, View, ScrollView, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';


const { width, height } = Dimensions.get("window");

const Star = ({ filled }) => (
  <View style={{ display: filled ? 'flex' : 'none', marginRight: 2 }}>
    <Ionicons name="ios-star" size={15} color="#ffc107" />
  </View>
);

export default function Swiper({ items, currentRecipe }) {
  const navigation = useNavigation(); // Initialize navigation hook

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
    }

  });

  // Function to get the rating of the current recipe
  const getRecipeRating = () => {
    // Find the current recipe in the items array
    const currentRecipeItem = items.find(item => item.id === currentRecipe);
    return currentRecipeItem ? currentRecipeItem.rating : 5; 
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate={"fast"}
      horizontal
    >
      {items.map((source, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: source.id })}>
          <View style={styles.pictureContainer}>
            <View style={styles.picture}>
              <View style={{ borderTopWidth: 0, borderWidth: 2, borderRadius: 8, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderColor: '#ECECEC' }}>
              <View style={{ width: '100%', marginBottom: 8 }}>
                <Image style={styles.image} source={{ uri: source.src }} />
              </View>
                <View style={{ padding: 5 }}>
                  <Text style={styles.title}>{source.title}</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Text style={styles.description}>{source.description}</Text>
                </View>
                <View style={{ padding: 5, flexDirection: 'row', gap: 1 }}>
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} filled={starIndex < getRecipeRating()} />
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