import React, {useState} from 'react';
import { Button, SafeAreaView, View,  ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MealModal from '../components/MealModal';
import MealPlan from '../subScreens/MealPlan';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/BackButton';
import Dropdown from '../components/Dropdown';
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


    return <SafeAreaView >
      <View style={styles.view}>
        
        <ScrollView
          showsVerticalScrollIndicator={false}  // Hide vertical scrollbar

        >



      <View
        style={{...styles.flex, gap: 12}}
      >
      <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      // style={styles.calendar}
      theme={{
        backgroundColor: 'red',
      }}
      style={{...styles.calendar}}
    />
      <MealModal
      navigation={navigation}
        date={selected}
      />


      <Dropdown
        icon={require("../assets/food/breakfast.png")}
        food={"Breakfast"}
      />
      <Dropdown
        icon={require("../assets/food/lunch.png")}
        food={"Lunch"}
      />
      <Dropdown
        icon={require("../assets/food/dinner.png")}
        food={"Dinner"}
      />

      <Dropdown
        icon={require("../assets/food/snacks.png")}
        food={"Snacks"}
      />
      </View>
        </ScrollView>

      </View>

    </SafeAreaView>
}
const styles =  StyleSheet.create({

  view: {
    paddingHorizontal: 12,
    display:'flex',
    alignContent:"center",
    rowGap: 12,
    paddingBottom: 94 // not like this
  },

  calendar:{
    // backgroundColor: '#47A695',
    // borderColor: 'yellow',
    // borderTopRadius: 12,
  }
})