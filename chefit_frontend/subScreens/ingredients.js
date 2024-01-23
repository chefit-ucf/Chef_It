import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState, useRef } from 'react'
import * as Haptics from 'expo-haptics'

import { categories } from '../components/ingredientsBar.js'

const IngredientsHeader = () => {
const [activeIndex, setActiveIndex] = useState(0);
const selectCategory = (index) => {
    setActiveIndex(index);

};

return (
    <View style={styles.container}>
        <View style={styles.scrollBox}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{alignItems: 'center', gap: 25, paddingHorizontal: 18}}>
            {categories.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => selectCategory(index)}
                style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn} >
                     <Image source={item.src} resizeMode='contain'
                    style={{width: 50, height: 50, tintColor: "black"}} />
                    <Text style={{textAlign: 'center', paddingBottom: 5}}>{item.name}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
    </View>  
    );
};

export default function IngredientsScreen() {
    return (
        <IngredientsHeader></IngredientsHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAF8"
    },
    scrollBox: {
        backgroundColor: "white",
    },
    categoryBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    categoryBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
});