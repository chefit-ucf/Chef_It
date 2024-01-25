import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions } from 'react-native';

export default function Slider({ title, items, width, height }) {

  const styles = StyleSheet.create({
    
    container: {
      paddingLeft: 12,
      marginBottom: 32

    },
  
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: 20, // Remove quotes around '20px'
    },
    base: {
      paddingLeft: 16,
    },
    picture: {
      position: 'relative',
      borderRadius: 8,
    },
    textOverlay: {
      position: 'absolute',
      top: '90%',
      right: '0',
 

    },

    border: {
      borderBottomWidth: 2,
      borderColor: '#ECECEC',
      paddingBottom: 8,
      marginBottom: 8
    },

    title:{
      fontSize: 20,
      fontWeight: 'bold',
    },
    
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      paddingLeft: 16
    },
  });

  return <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.title} >{title}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
        style={{overflow:"visible"}}
      >
        <View style={{ width: '100%'}}>
          <View style={{ padding: 8, flexDirection: 'row',  gap: 12}}>
            {items.map((source) => (
              <View key={source} style={styles.picture}>
                <Image style={{ ...styles.picture }} source={source.image} />
                <View style={styles.textOverlay}>
                  <Text style={styles.text}>{source.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  
}


export  function DetailedSlider({title, items, width, height}) {

  const styles = StyleSheet.create({
    container: {
      paddingLeft: 12,
      overflow:"visible",
      marginBottom: 32
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
      borderRadius: 8
    },
    flex: {
      flexDirection: 'row',
      gap: 12 , 
    },
    box: {
      padding: 12,
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
    

  });

  return  <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.title} >{title}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
        style={{overflow:"visible"}}
      >
        <View style={styles.flex}>
          {items.map((source) => (
          <View key={source} style={styles.picture}>
            <View style={styles.box}>
              <View>
                <Image style={{ ...styles.picture, width: '100%' }} source={source.image} />
              </View>
              <View>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{source.title}</Text>
                </View>
                <View style={{ padding: 8 }}>
                  <Text>{source.description}</Text>
                </View>

              </View>
            </View>
          </View>
          ))}
        </View>
    </ScrollView>
  </View>
}
