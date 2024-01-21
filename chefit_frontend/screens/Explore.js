import React, {useEffect} from 'react'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StyleSheet, TextInput, View, ScrollView, Text, Dimensions, Image } from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import { SafeAreaView} from 'react-native-safe-area-context';


export const assets = [
  require("../assets/fries.png"),
  require("../assets/burger.png"),
];

const { width, height } = Dimensions.get("window");


export default function Explore() {
  useEffect(()=>{
    console.log(assets)
  },[])
    return <SafeAreaView >
      <View style ={styled.base}>
        <View className=' flex-row items-center justify-center'>
          <View className='flex-row space-x-2  mx-2 bg-[#FEF3CD] border-2 border-[#FEF3CD] rounded-lg p-2'>
            <MagnifyingGlassIcon
              color={'black'}
              size={25}
            />
            <TextInput className=' w-full '/>
          </View>
        </View>
      </View>

      <Swiper/>

      {/* <View className='w-full h-fit bg-gray-100 border-2 border-gray-300 rounded-md   mb-8'>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <View className= 'w-full'>
      </View>
    </View> */}
  </SafeAreaView>
}

const Swiper = () => {

  return <View>
    <ScrollView snapToInterval={width} decelerationRate={"fast"} horizontal>
      {assets.map((source)=>(
        <View key={source} style={styles.picture} className='p-2'>
          <View className='w-full h-fit bg-gray-100 border-2 border-gray-300 rounded-md  mb-8'>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <View className= 'w-full'>
      </View>
    </View> 
        </View>
      ))}
    </ScrollView>
  </View>
}

const styled = ScaledSheet.create({
  base:{
    paddingHorizontal: "16@s",
    display: "flex"
  }
})

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});