import React from 'react'
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed';

import BackButton from '../components/BackButton'
import TextInputs from '../components/TextInputs'

import ListItems from '../components/ListItems'

const list1 = [
  {
    name: "Little to No Physical Activity",

  },
  {
    name: "Moderate Physical Activity",
  },
  {
    name: "Intense Physical Activity",
  }
]


const list2 = [
  {
    name: "Maintain Weight",

  },
  {
    name: "Gain Weight",
  },
  {
    name: "Lose Weight",
  }
]
export default function MealPlan() {

  const [text, onChangeText] = React.useState('Useless Text');




  return <SafeAreaView >
    <View style={styles.view}>
      <View style={styles.flex}>

        <TextInputs
          placeholder={"Age"}
        />
        <TextInputs
          placeholder={"Height"}
        />
        <TextInputs
          placeholder={"Weight"}
        />
        <TextInputs
          placeholder={"Gender"}
        />

        <ListItems
          title={"Daily Activity Level"}
          list={list1}
        />
        <ListItems
          title={"Weight Goal"}
          list={list2}
        />
          <Button 
            containerStyle={styles.button}
            color={'#47A695'}
            title={"2"}
            >
            <Text style={styles.text}> Save</Text>
          </Button>
      </View>
    </View>

  </SafeAreaView>
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingHorizontal: 16,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  svg:{
  },
  relative: {
    position: 'relative',
    width: '100%',
  },
  flex: {
    display: 'flex',
    gap: 24
  },

  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  button: {
    padding:16,
    width: "24%",
    borderRadius: 12,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontWeight:'bold'
  }
});