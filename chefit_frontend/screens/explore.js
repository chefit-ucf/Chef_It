import React, {useEffect , useState} from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput , Dimensions, StyleSheet, Pressable} from 'react-native';
import Svg, { Path } from "react-native-svg"
import Swiper from "../components/Swiper.js"
import Slider, { DetailedSlider, SliderSeasonal } from "../components/Slider.js"


import { swiper, slider1, slider2, slider3 } from "../API/sliderData.js"
const { width, height } =  Dimensions.get("window")

import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";

export default function ExploreScreen({navigation}) {

  const [swiperData, setSwiperData] = useState([])
  const [sliderData, setSliderData] = useState([])
  const [sliderCategoriesData, setSliderCategoriesData] = useState([])
  const [sliderSeasonalData, setSliderSeasonalData] = useState([])



// data request for swiper
useEffect(() => {
  const swiperQuery = collection(db, "swiper");
  onSnapshot(swiperQuery, (snapshot) => {
    setSwiperData([]);

    snapshot.docs.forEach((doc) => {
      const slides = doc.data();
      
      const maps = slides["slides"]
      const mappedIngredients = Object.values(maps).map((slide) => ({
        ...slide,
      }));
      setSwiperData([...mappedIngredients]);
    });

    // Console log swiperData here
    console.log("Swiper Data:", swiperData);
  });
}, []);

// data request for swiper
useEffect(() => {
  const swiperQuery = collection(db, "slider");
  onSnapshot(swiperQuery, (snapshot) => {
    setSliderData([]);

    snapshot.docs.forEach((doc) => {
      const slides = doc.data();
      
      const maps = slides["slides"]
      const mappedIngredients = Object.values(maps).map((slide) => ({
        ...slide,
      }));
      setSliderData([...mappedIngredients]);
    });

    // Console log swiperData here
    console.log("Slider Data:", sliderData);
  });
}, []);

// data request for slider2
useEffect(() => {
  const swiperQuery = collection(db, "slider");
  onSnapshot(swiperQuery, (snapshot) => {
    setSliderCategoriesData([]);

    snapshot.docs.forEach((doc) => {
      const slides = doc.data();
      
      const maps = slides["sliderCategories"]
      const mappedIngredients = Object.values(maps).map((slide) => ({
        ...slide,
      }));
      setSliderCategoriesData([...mappedIngredients]);
    });

    // Console log swiperData here
    console.log("Slider Data:", sliderCategoriesData);
  });
}, []);


// data request for Seasonal Recipes slider
useEffect(() => {
  const swiperQuery = collection(db, "slider");
  onSnapshot(swiperQuery, (snapshot) => {
    setSliderSeasonalData([]);

    snapshot.docs.forEach((doc) => {
      const slides = doc.data();
      
      const maps = slides["seasonalSlider"]
      const mappedIngredients = Object.values(maps).map((slide) => ({
        ...slide,
      }));
      setSliderSeasonalData([...mappedIngredients]);
    });

    // Console log swiperData here
    console.log("Slider Data:", sliderSeasonalData);
  });
}, []);

  return <SafeAreaView style={{ backgroundColor: '#FDFEFC', flex: 1 }}>
    <ScrollView style={{marginBottom: 62}}>
      <View style={styles.base}>

        <Pressable
         onPress={() => navigation.navigate('Search')}
         >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',   }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#FEF3CD',  borderColor: '#FEF3CD', borderRadius: 8, paddingHorizontal: 8,paddingVertical: 8 }}>
            <Svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M24.6558 22.5661L19.7881 17.6509C19.5684 17.4291 19.2706 17.3058 18.9581 17.3058H18.1623C19.5098 15.5655 20.3105 13.3767 20.3105 10.9955C20.3105 5.33099 15.7651 0.741211 10.1553 0.741211C4.54545 0.741211 0 5.33099 0 10.9955C0 16.66 4.54545 21.2498 10.1553 21.2498C12.5134 21.2498 14.6812 20.4413 16.4046 19.0806V19.8842C16.4046 20.1997 16.5267 20.5004 16.7464 20.7223L21.6141 25.6374C22.073 26.1008 22.8152 26.1008 23.2692 25.6374L24.6509 24.2422C25.1099 23.7788 25.1099 23.0295 24.6558 22.5661ZM10.1553 17.3058C6.70345 17.3058 3.90587 14.4859 3.90587 10.9955C3.90587 7.51002 6.69856 4.68517 10.1553 4.68517C13.6071 4.68517 16.4046 7.50509 16.4046 10.9955C16.4046 14.481 13.612 17.3058 10.1553 17.3058Z" fill="black"/>
            </Svg>
            {/* will be changed later */}
              <Text style={{ flex: 1 }} /> 

            </View>
          </View>
        </Pressable>

      </View>
      
      <Swiper 
  items={swiperData}
  swiper={swiper}
  width={width} 
  height={height}
  navigation={navigation}
/>
      <DetailedSlider
  key={"trending"}
  title={"Trending Recipes"}
  items={sliderCategoriesData}
  width={width /1.1}
  height={height}
/>

<DetailedSlider
  key={"for_you"} 
  title={"For You Recipes"}
  items={sliderData}
  width={width /1.1}
  height={height}
/>

<DetailedSlider
  key={"seasonal"}
  title={"Seasonal Recipes"}
  items={sliderSeasonalData}
  width={width}
  height={height}
/>
      
    </ScrollView>
</SafeAreaView>
  
}
const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16, 
    display: "flex",
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});