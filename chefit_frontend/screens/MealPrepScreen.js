import React, {useState} from 'react';
import { Button, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MealModal from '../components/MealModal';
import MealPlan from '../subScreens/MealPlan';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/BackButton';
const Stack = createStackNavigator();


export default function MealPrepScreen(){
  return  (
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0, 
        shadowOpacity: 0, 
        borderBottomWidth: 0,
      },
      headerBackImage: () => (
        <BackButton />
      ),
    }}
    >

      <Stack.Screen
        name='Meal Prep'
        component={MealPrep}
      />
      <Stack.Screen
        name='Meal Plan'
        component={MealPlan}
        
      />

  </Stack.Navigator>
  )
}

function MealPrep({navigation}) {
const [selected, setSelected] = useState('')


    return <SafeAreaView style={styles.view}>
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      style={styles.calendar}
    />
      <MealModal
      navigation={navigation}
        date={selected}
      />

    </SafeAreaView>
}
const styles =  StyleSheet.create({

  view: {
    paddingHorizontal: 4,
    display:'flex',
    alignContent:"center",
    rowGap: 12
  }
})