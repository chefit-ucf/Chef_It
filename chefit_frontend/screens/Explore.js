import React, {useEffect} from 'react'
import Svg, { Path } from "react-native-svg"

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StyleSheet, TextInput, View, ScrollView, Text, Dimensions, Image } from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import { SafeAreaView} from 'react-native-safe-area-context';
import { slider1 } from '../data/fakeData.js'


const { width, height } = Dimensions.get("window");


export default function Explore() {
  useEffect(()=>{
    // console.log(assets)
  },[])
    return <SafeAreaView  className="bg-[#FDFEFC]">
      <ScrollView>
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



      <Swiper
        items={slider1}
      />
      <Swiper
        items={slider1}
      />

      {/* <View className='w-full h-fit bg-gray-100 border-2 border-gray-300 rounded-md   mb-8'>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <Text className={`text-lg underline-offset-[3px] font-bold border-gray-300 border-b-2 p-2`}>Current Schedule</Text>
      <View className= 'w-full'>
      </View>
    </View> */}
    </ScrollView>
  </SafeAreaView>
}

const Swiper = ({items}) => {

  return <View >
    <ScrollView 
      showsHorizontalScrollIndicator={false}
      snapToInterval={width} 
      decelerationRate={"fast"} horizontal
    >

      {items.map((source)=>(
        <View key={source} style={styles.picture} className='p-2 '>
          <View className='w-full  mb-8'>
            <View>
              <Image className='w-full ' source={source.image}/>
            </View>
            <View className="border-l-2 border-r-2 border-b-2 rounded-bl-md rounded-br-md border-gray-300">
            <View className={`p-2`}>
              <Text className={`text-lg font-bold`}>{source.title}</Text>
            </View>
            <View className={`p-2`}>
              <Text >{source.description}</Text>
            </View>
            <View>
              <View className={"p-2 flex flex-row gap-1"}>
              {Array.from({ length: source.rating }, () => (
                <Svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M8.48075 0.556577L6.16169 4.69357L0.973099 5.35911C0.0426336 5.47784 -0.330263 6.48709 0.344502 7.06515L4.09833 10.2835L3.21048 14.8298C3.05067 15.6516 4.0344 16.2671 4.85833 15.8828L9.5 13.7362L14.1417 15.8828C14.9656 16.264 15.9493 15.6516 15.7895 14.8298L14.9017 10.2835L18.6555 7.06515C19.3303 6.48709 18.9574 5.47784 18.0269 5.35911L12.8383 4.69357L10.5193 0.556577C10.1037 -0.180831 8.89981 -0.190205 8.48075 0.556577Z" fill="#F7D47A"/>
                </Svg>
              ))}
              </View>
            </View>
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
    // width: width * slider1.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    // overflow: "hidden",
  },
  image: {

  },
});