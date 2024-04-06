import React, { useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, Image, Dimensions, Pressable } from 'react-native';
import Svg, { Path } from "react-native-svg"


export default function SearchItem({navigation, image, author, title, time, rating}) {

  const source = {image, author, title, title, time, rating}
  const handleItemPress = (item) => {
    // Navigate to the desired screen, passing necessary parameters if needed
    console.log(item)
    navigation.navigate('AddRecipe', { item });
  };


  const styles = StyleSheet.create({

    pictures: {
      flexDirection: "row",
      padding: '20px'
    },
    item: {
      width:"48%"
    },

    box: {
      // padding: 12,
      borderWidth: 2, 
      borderColor: '#ECECEC',
      borderRadius: 8
    },
    border: {
      borderBottomWidth: 2,
      borderColor: '#ECECEC',
      paddingBottom: 8,
      marginBottom: 16
    },

    title:{
      fontSize: 20,
      fontWeight: 'bold',
    },
    picture: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8
    },
    time: { paddingHorizontal: 8, paddingVertical: 4, display: "flex", flexDirection: 'row', columnGap: 4, alignContent: 'center'}
  });


return <Pressable style={styles.item}
        onPress={()=>{handleItemPress(source)}}
    >
    <View style={styles.box}>
      <View>
        <Image style={{ ...styles.picture, width: '100%' }} source={image} />
      </View>
      <View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text>By {author}</Text>
        </View>
        <View style={styles.time}>
          <Text>{time} mins</Text>
          <Svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M3.89423e-09 6.49977C3.89423e-09 6.49985 0 6.49992 0 6.5C0 10.0899 2.91015 13 6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.9103 10.0901 0.000244547 6.50045 0V2C8.98553 2.00024 11 4.01487 11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 6.49992 2 6.49985 2 6.49977H3.89423e-09Z" fill="#47A695"/>
          </Svg>
        </View>

        <View style={{ paddingHorizontal: 8, paddingBottom: 8, flexDirection: 'row', gap: 1 }}>
          {Array.from({ length: rating }, (_, index) => (
            <Svg key={index} width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M8.48075 0.556577L6.16169 4.69357L0.973099 5.35911C0.0426336 5.47784 -0.330263 6.48709 0.344502 7.06515L4.09833 10.2835L3.21048 14.8298C3.05067 15.6516 4.0344 16.2671 4.85833 15.8828L9.5 13.7362L14.1417 15.8828C14.9656 16.264 15.9493 15.6516 15.7895 14.8298L14.9017 10.2835L18.6555 7.06515C19.3303 6.48709 18.9574 5.47784 18.0269 5.35911L12.8383 4.69357L10.5193 0.556577C10.1037 -0.180831 8.89981 -0.190205 8.48075 0.556577Z" fill="#F7D47A" />
            </Svg>
          ))}
        </View>
      </View>
    </View>
    </Pressable>

}
