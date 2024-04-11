import React, { useState, useRef, useEffect } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StyleSheet, Text, TextInput, SafeAreaView, ScrollView, View, Dimensions, StatusBar, Pressable } from 'react-native';
import Svg, { Path, Line } from "react-native-svg"

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
  const pipeArray = useRef(searchItems)
  const [text, onChangeText] = useState('');

  useEffect(()=>{
    const pipeArray = pipe(type, ingredient, cuisine, search)(searchItems); // invoke pipe with initial value (searchItems)
    setFilteredItems(pipeArray); 

  },[selected, text])


  const pipe = (...functions) => input => {
    return functions.reduce((acc, fn) => fn(acc), input);
  };

  const type = (items) => {
    if(selected.type.length == 0)
      return items

    return items.filter(item => selected.type.includes(item.type));
  };
  const ingredient = (items) => {
    if(selected.ingredient.length == 0)
      return items
    
    return items.filter(item => selected.ingredient.includes(item.ingredient));
  };
  const cuisine = (items) => {
    if(selected.cuisine.length == 0)
      return items

    return items.filter(item => selected.cuisine.includes(item.cuisine));
  };

  const search = (items) => {
    if(text.length == 0)
      return items

    return items.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
  };

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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
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
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#48A696', borderRadius: 4, paddingHorizontal: 8,paddingVertical: 8 }}
              onPress={() => handlePress()}
            >
              <Svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Line x1="1.5" y1="2.36035" x2="31.5" y2="2.36035" stroke="#060606" strokeWidth="3" strokeLinecap="round"/>
                <Line x1="10.5" y1="11.291" x2="31.8749" y2="11.291" stroke="#060606" strokeWidth="3" strokeLinecap="round"/>
                <Line x1="19.5" y1="20.2207" x2="31.4999" y2="20.2207" stroke="#060606" strokeWidth="3" strokeLinecap="round"/>
              </Svg>
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
            {(filteredItems == []) ? null : filteredItems.map((source)=>(
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

