import { View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { DATA, DATA2, DATA3} from "../assets/data/fakeData.js"
export default function Filter(items, searchItems) {

  const [selected, setSelected] = useState([])
  useEffect(()=>{
    console.log(selected)
    
  },[things])

  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <View style={{...styles.flex, padding: 8,}}>
          <Text style={styles.text}>Recipes</Text>
          <Text style={styles.text}>Videos</Text>
          {/* Add more Text components as needed */}
        </View>
      </View>

      <View style={styles.content}>
        <View style={{paddingVertical: 8}}>
          <Text >Meal Type</Text>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} things={things} setThings={setThings}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <Text >Ingredients</Text>
          <FlatList
            data={DATA2}
            renderItem={({item}) => <Item title={item.title} things={things} setThings={setThings} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <Text >Cuisine</Text>
          <FlatList
            data={DATA3}
            renderItem={({item}) => <Item title={item.title} things={things} setThings={setThings}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        </View>
    </View>
  );
}


const Item = ({title, selected, setSelected}) =>{
  const [pressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(!pressed);
  };

  useEffect(()=>{
    const newSelected = pressed 
      ? setSelected([...things, title]) 
      : setSelected(selected.filter((item) => item !== title));

    console.log(newSelected)
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
    <Text style={{...styles.pressable, ...onChangeStyles.text}}>{title}</Text>
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