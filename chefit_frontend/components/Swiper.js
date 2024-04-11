<<<<<<< HEAD
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Svg, { Path } from "react-native-svg";

export default function Swiper({ navigation, items, width, height }) {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
    },
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: 20
    },
    picture: {
      width,
      overflow: "hidden",
      padding: 16
    },
    image: {}
  });

  const handleItemPress = (item) => {
    // Navigate to the desired screen, passing necessary parameters if needed
    console.log(item)
    navigation.navigate('AddRecipe', { item });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate={"fast"}
      horizontal
    >
      {items.map((source, index) => (
        <Pressable key={index} style={styles.picture} onPress={() => handleItemPress(source)}>
          <View style={{ width: '100%', marginBottom: 8 }}>
            <View>
              <Image style={{ width: '100%' }} source={source.image} />
            </View>
            <View style={{ borderTopWidth: 0, borderWidth: 2, borderRadius: 8, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderColor: '#ECECEC' }}>
              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{source.title}</Text>
              </View>
              <View style={{ padding: 8 }}>
                <Text>{source.description}</Text>
              </View>
              <View>
                <View style={{ padding: 8, flexDirection: 'row', gap: 1 }}>
                  {Array.from({ length: source.rating }, (_, index) => (
                    <Svg key={index} width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M8.48075 0.556577L6.16169 4.69357L0.973099 5.35911C0.0426336 5.47784 -0.330263 6.48709 0.344502 7.06515L4.09833 10.2835L3.21048 14.8298C3.05067 15.6516 4.0344 16.2671 4.85833 15.8828L9.5 13.7362L14.1417 15.8828C14.9656 16.264 15.9493 15.6516 15.7895 14.8298L14.9017 10.2835L18.6555 7.06515C19.3303 6.48709 18.9574 5.47784 18.0269 5.35911L12.8383 4.69357L10.5193 0.556577C10.1037 -0.180831 8.89981 -0.190205 8.48075 0.556577Z" fill="#F7D47A" />
                    </Svg>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
=======
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
>>>>>>> b3179dfdcaf7cfd4ee06c96ee25775ebe19c44c9
