import React, { useState, useRef, useEffect } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StyleSheet, Text, TextInput, SafeAreaView, ScrollView, View, Dimensions, StatusBar, Pressable } from 'react-native';
import Svg, { Path } from "react-native-svg"

import Filter from '../components/Filter';
import SearchItem from '../components/SearchItem';
import { searchItems } from '../assets/data/fakeData';

export default function Search({navigation}) {

  const [items, setItems] = useState(searchItems)
  const [selected, setSelected] = useState({
    type: [],
    ingredient: [],
    cuisine: [],
  })
  const [filter, setFilter] = useState(false)
  const [filteredItems, setFilteredItems] = useState(searchItems)
  const arrayFilter = useRef(searchItems)

  const [text, onChangeText] = useState('');

  const pipe = (...functions) => input => {
    return functions.reduce((acc, fn) => fn(acc), input);
  };

  useEffect(()=>{
    console.log(selected)
  },[selected])



  function type(){
    return 
  }
  function ingredient(){
    return arrayFilter.current.filter((item)=> selected.includes(item.ingredient))
  }





  function handlePress(){
    setFilter(!filter)
  }

  const styles = StyleSheet.create({
    safe:{
      display: "flex",
      rowGap: 12,
      backgroundColor: '#FDFEFC', 
      flex: 1, 
      display: "flex", 
      flexDirection:"column", 
      overflow:"visible",
      backgroundColor: 'transparent'
    },
    base:{
      paddingHorizontal: 16,
      display: "flex",
    },

    flex:{
      display:'flex',
      flex: 1,
      flexDirection:'row',
      flexWrap:'wrap',
      width:'100%',
      // justifyContent: 'space-between', // Arrange items in two columns
      gap: 8
    }
    
  });
  return <SafeAreaView style={styles.safe}>
            <View style={styles.base}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#FEF3CD',  borderColor: '#FEF3CD', borderRadius: 8, paddingHorizontal: 8,paddingVertical: 8 }}>
            <Svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M24.6558 22.5661L19.7881 17.6509C19.5684 17.4291 19.2706 17.3058 18.9581 17.3058H18.1623C19.5098 15.5655 20.3105 13.3767 20.3105 10.9955C20.3105 5.33099 15.7651 0.741211 10.1553 0.741211C4.54545 0.741211 0 5.33099 0 10.9955C0 16.66 4.54545 21.2498 10.1553 21.2498C12.5134 21.2498 14.6812 20.4413 16.4046 19.0806V19.8842C16.4046 20.1997 16.5267 20.5004 16.7464 20.7223L21.6141 25.6374C22.073 26.1008 22.8152 26.1008 23.2692 25.6374L24.6509 24.2422C25.1099 23.7788 25.1099 23.0295 24.6558 22.5661ZM10.1553 17.3058C6.70345 17.3058 3.90587 14.4859 3.90587 10.9955C3.90587 7.51002 6.69856 4.68517 10.1553 4.68517C13.6071 4.68517 16.4046 7.50509 16.4046 10.9955C16.4046 14.481 13.612 17.3058 10.1553 17.3058Z" fill="black"/>
            </Svg>
            {/* will be changed later */}
              <TextInput style={{ flex: 1 }}
                onChangeText={onChangeText}
                value={text}
              /> 
            </View>
            <Pressable 
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#FEF3CD', paddingHorizontal: 8,paddingVertical: 8 }}
              onPress={() => handlePress()}
            >
              
            </Pressable>
          </View>
        </View>
        <View
          style={(filter) ? {display: 'flex'} : {display: 'none'}}>
        <Filter
          items={items}
          setItems={setItems}
          selected={selected}
          setSelected={setSelected}
        />
        </View>

        <ScrollView style={{width: "100%", paddingHorizontal: 8, }}>
          <View style={styles.flex}>
            {filteredItems.map((source)=>(
              <SearchItem
              navigation={navigation}
                key={source}
                image={source.image}
                author={source.author}
                title={source.title}
                time={source.time}
                rating={source.rating}
              />
            ))}
          </View>
        </ScrollView>
  </SafeAreaView>
}

