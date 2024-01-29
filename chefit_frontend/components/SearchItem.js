import React from 'react'
import { StyleSheet,  View, ScrollView, Text, Image, Dimensions } from 'react-native';
import Svg, { Path } from "react-native-svg"


export default function SearchItem({image}) {
return <View  >
  <View style={{ width: '100%', marginBottom: 8 }}>
    <View>
      <Image style={{ width: '100%' }} source={image} />
    </View>
  </View>
</View>

}
