import { View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { DATA, DATA2, DATA3} from "../assets/data/fakeData.js"
export default function Filter({selected, setSelected}) {


  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <View style={{...styles.flex, padding: 8,}}>
          <Text style={styles.text}>Recipes</Text>
          {/* Add more Text components as needed */}
        </View>
      </View>

      <View style={styles.content}>
        <View style={{paddingVertical: 8}}>
          <Text >Meal Type</Text>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item itemKey={Object.keys(item).find(key=> item[key] === item.type)} value={item.type} selected={selected} setSelected={setSelected}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <Text >Ingredients</Text>
          <FlatList
            data={DATA2}
            renderItem={({item}) => <Item itemKey={Object.keys(item).find(key=> item[key] === item.ingredient)} value={item.ingredient} selected={selected} setSelected={setSelected}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <Text >Cuisine</Text>
          <FlatList
            data={DATA3}
            renderItem={({item}) => <Item itemKey={Object.keys(item).find(key=> item[key] === item.cuisine)} value={item.cuisine} selected={selected} setSelected={setSelected}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        </View>
    </View>
  );
}


const Item = ({itemKey, value, selected, setSelected}) =>{
  const [pressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(!pressed);
  };

  useEffect(()=>{
    const newSelected = pressed 
      ? setSelected(prevState => ({
        ...prevState, // copy the existing arrays
        [itemKey]: [...selected[itemKey], value] // update the specified property
      }))
      : setSelected(prevState => ({
        ...prevState, // copy the existing arrays
        [itemKey]: selected[itemKey].filter((item) => item !== value) // filter the specified property
      })) 

  }, [pressed])

  const onChangeStyles = StyleSheet.create({
    text: {
      color: pressed ? 'white' : 'black',
    },
  });

  return  <Pressable 
  
  style={() => [
    {
      backgroundColor: pressed ? '#48A696' : 'white',
    },
    styles.item, 
  ]}
  onPress={handlePress}
  >
    <Text style={{...styles.pressable, ...onChangeStyles.text}}>{value}</Text>
  </Pressable>

}

  
 
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  box: {
    // overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    display: 'flex',
    marginHorizontal: 8,
    borderRadius: 12,
    borderColor: "#CECECE"
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'    
    
  },

  top:{
    // borderRadius: 8,
    backgroundColor: "#48A696",
    borderColor: '#ECECEC', 
    alignContent: "center"  ,
    width: "100%"
  },

  text: {
    // Add your text styles here if needed
    padding: 8,
    borderColor: 'black',
    color: "white",
    fontSize: 16
  },

  content: { 
    paddingHorizontal: 8,
    paddingTop: 12,
  },

  item: {
    padding: 12,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#8F8F8F"
  },
  title:{
    
  },

  pressable:{
    fontSize: 12,
  },


  flatList:{
    display: 'flex',
    flexDirection: 'row',
    gap: 4, 
    rowGap: 8, 
    flexWrap: "wrap", 
    paddingTop: 12
  }
});