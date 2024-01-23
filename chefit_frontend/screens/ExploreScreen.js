import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput } from 'react-native';
import Svg, { Path } from "react-native-svg"
import Swiper from "../components/Swiper.js"

export default function ExploreScreen({navigation}) {


  return <SafeAreaView style={{ backgroundColor: '#FDFEFC', flex: 1 }}>
    <ScrollView>
      <View style={styles.base}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#FEF3CD', borderWidth: 2, borderColor: '#FEF3CD', borderRadius: 8, padding: 2 }}>
          <Svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M8.48075 0.556577L6.16169 4.69357L0.973099 5.35911C0.0426336 5.47784 -0.330263 6.48709 0.344502 7.06515L4.09833 10.2835L3.21048 14.8298C3.05067 15.6516 4.0344 16.2671 4.85833 15.8828L9.5 13.7362L14.1417 15.8828C14.9656 16.264 15.9493 15.6516 15.7895 14.8298L14.9017 10.2835L18.6555 7.06515C19.3303 6.48709 18.9574 5.47784 18.0269 5.35911L12.8383 4.69357L10.5193 0.556577C10.1037 -0.180831 8.89981 -0.190205 8.48075 0.556577Z" fill="#F7D47A"/>
                </Svg>
            <TextInput style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </ScrollView>
</SafeAreaView>
  
}
const styles = StyleSheet.create({
  base:{
    paddingHorizontal: 16,
    display: "flex"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    // width: width * slider1.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    // overflow: "hidden",
  },
  image: {

  },
});