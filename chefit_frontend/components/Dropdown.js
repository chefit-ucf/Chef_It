import React, { useState } from 'react';
import { Button, ListItem } from '@rneui/themed';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

export default function Dropdown({ icon, food }) {
  const [extend, setExtend] = useState(false);

  const handlePress = () => {
    setExtend(!extend);
  };

  return (
    <View style={styles.box}>
      <View style={{ ...styles.flex, justifyContent: "space-between", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 }}>
        <View style={{ ...styles.flex, gap: 12 }}>
          <Image
            source={icon}  // Assuming icon is the correct source for the image
            style={styles.pic}
          />
          <Text>{food}</Text>
        </View>
        <Pressable
          onPress={handlePress}>
          {!extend
            ? <Image
              source={require('../assets/buttons/add.png')}
              style={styles.pic}
            />
            : <Image
              source={require('../assets/buttons/minus.png')}
              style={styles.pic}
            />
          }

        </Pressable>

      </View>
      {extend && (
        <View style={styles.dropdown}>

          <View style={{ ...styles.flex, justifyContent: "space-between" }}>
            <View style={{ ...styles.flex, gap: 12 }}>
              <Image
                source={require('../assets/food/eggs_benedict.png')}  // Assuming icon is the correct source for the image
                style={styles.pic}
              />
              <Text>Eggs Benedict </Text>
            </View>
            <View style={{ ...styles.flex, gap: 12}}>
              <Text>450 cal </Text>
              <Image
                source={require('../assets/addRecipeButtons/x.png')}  // Assuming icon is the correct source for the image
                style={styles.pic}
              />
            </View>
          </View>

          <View style={{...styles.center, paddingTop: 12}}>
            <Button 
            containerStyle={styles.button}
            color={'$47A695'}
            >
            <Text style={styles.text}> Add Meal</Text>
              </Button>
          </View>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#494949",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',  // Add this line to vertically align items
  },
  dropdown: {
    padding: 16,
    display: 'flex'
  },
  center: {
    alignSelf: "center",
  },
  button: {
    backgroundColor: '#47A695', // Set background color to green
    padding: 4, // Adjust padding as needed
    borderRadius: 12
  },
  text:{
    color: 'white',
    fontWeight:'bold'

  },
  pic: {},
});