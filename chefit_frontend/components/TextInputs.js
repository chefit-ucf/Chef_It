<<<<<<< HEAD
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native'

import React from 'react'

export default function TextInputs({placeholder}) {

  const [text, onChangeText] = React.useState(placeholder);

return         <TextInput
  style={styles.input}
  onChangeText={onChangeText}
  value={text}
/>
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
=======
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native'

import React from 'react'

export default function TextInputs({placeholder}) {

  const [text, onChangeText] = React.useState(placeholder);

return         <TextInput
  style={styles.input}
  onChangeText={onChangeText}
  value={text}
/>
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
>>>>>>> b3179dfdcaf7cfd4ee06c96ee25775ebe19c44c9
});