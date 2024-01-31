import React from 'react'
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native'
import BackButton from '../components/BackButton'

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
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

        <ListItems
          title={"Daily Activity Level"}
          list={list1}
        />
        <ListItems
          title={"Weight Goal"}
          list={list2}
        />
        <Button title='Save'/>
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
    borderRadius: 12,
    backgroundColor: 'red'
  }
});