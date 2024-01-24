import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RecipePage from './screens/recipePage.js';
import RecipeScreen from './screens/recipeScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeScreen></RecipeScreen>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});