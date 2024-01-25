import React, {useEffect} from 'react'
import Svg, { Path } from "react-native-svg"

import { StyleSheet,  View, ScrollView, Text, Image, Dimensions } from 'react-native';


export default function Swiper({items, width, height}) {

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
    },
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: '20px'
    },
    picture: {
      width,
      overflow: "hidden",
      padding: 16

    },
    image: {
  
    },
  });

  return <View>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate={"fast"}
      horizontal
    >
      {items.map((source) => (
        <View key={source} style={styles.picture}>
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
        </View>
      ))}
    </ScrollView>
  </View>
}

