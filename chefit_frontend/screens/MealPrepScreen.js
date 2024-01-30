import React, {useState} from 'react';
import { Button, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MealModal from '../components/MealModal';

const styles =  StyleSheet.create({

  view: {
    paddingHorizontal: 4,
    display:'flex',
    alignContent:"center",
    rowGap: 12
  }
})

export default function MealPrepScreen({navigation}) {
const [selected, setSelected] = useState('')


    return <SafeAreaView style={styles.view}>
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
      <MealModal
        date={selected}
      />

    </SafeAreaView>
}
