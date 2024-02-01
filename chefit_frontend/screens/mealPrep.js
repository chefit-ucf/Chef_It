import React, {useState} from 'react';
import { Button, SafeAreaView, View,  ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MealModal from '../components/MealModal';
import EditMacros from '../subScreens/EditMacros';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/BackButton';
import Dropdown from '../components/Dropdown';
import { useTheme } from '@rneui/themed';
import { useFonts, Coiny_400Regular } from '@expo-google-fonts/coiny';
const Stack = createStackNavigator();

export default function MealPrepScreen(){
    let [fontsLoaded] = useFonts({
        Coiny_400Regular,
    })
    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

  return  (
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 5,
        fontFamily: 'Coiny_400Regular'
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
        name='Edit Macros'
        component={EditMacros}
        
      />

  </Stack.Navigator>
  )
}

function MealPrep({navigation}) {
const [selected, setSelected] = useState('')
const theme = useTheme();

    return <SafeAreaView >
      <View style={styles.view}> 
        <ScrollView showsVerticalScrollIndicator={false}  >
      <View style={{...styles.flex, gap: 12, paddingBottom: 50}}>
      <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#F6D47A'}
      }}
      theme={{
        backgroundColor: 'white',
        calendarBackground: 'white',
        arrowColor: '#E6B437',
        monthTextColor: '#F7B49B',
        textMonthFontSize: 20,
        textMonthFontWeight: 'bold',
        todayTextColor: '#E6B437',
      }}

      style={{...styles.calendar}}
    />
      <MealModal
      navigation={navigation}
        date={selected}
      />


      <Dropdown
        icon={require("../assets/mealPrepIcons/breakfast.png")}
        food={"Breakfast"}
      />
      <Dropdown
        icon={require("../assets/mealPrepIcons/lunch.png")}
        food={"Lunch"}
      />
      <Dropdown
        icon={require("../assets/mealPrepIcons/dinner.png")}
        food={"Dinner"}
      />

      <Dropdown
        icon={require("../assets/mealPrepIcons/snacks.png")}
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
    paddingBottom: 65 // not like this
  },

  calendar:{
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#42A797',
    shadowColor: "#494949",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
})