import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react'

import { categories } from '../components/ingredientsBar.js'
import { testuserInfo } from '../API/data.js';

const RenderIngredients = ( {index} ) => {
    if (index === 0) {
        return (
            <Text>This is fruits</Text>
        );
    }
    else if (index === 1) {
        return (
            <Text>This is veggies</Text>
        );
    }
    else if (index === 2) {
        return (
            <Text>This is dairy & eggs</Text>
        );
    }
    else if (index === 3) {
        return (
            <Text>This is pasta & grains</Text>
        );
    }
    else if (index === 4) {
        return (
            <Text>This is bread</Text>
        );
    }
    else if (index === 5) {
        return (
            <Text>This is condiments</Text>
        );
    }
    else if (index === 6) {
        return (
            <Text>This is baking</Text>
        );
    }
    else if (index === 7) {
        return (
            <Text>This is oils</Text>
        );
    }
    else if (index === 8) {
        return (
            <Text>This is spices & seasoning</Text>
        );
    }
    else if (index === 9) {
        return (
            <Text>This is meats & proteins</Text>
        );
    }
    else if (index === 10) {
        return (
            <Text>This is alcohol & bevs</Text>
        );
    }
    return (
        <View>
            <Text></Text>
        </View>
    );
};

const IngredientsHeader = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const selectCategory = (index) => {
        setActiveIndex(index);
    }; 
    

    return (
        <View style={styles.container}>
            <View style={styles.scrollBox}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{alignItems: 'center', gap: 25, paddingHorizontal: 20}}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => (selectCategory(index))}
                    style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn} >
                        <Image source={item.src} resizeMode='contain'
                        style={{width: 50, height: 50, tintColor: "black"}} />
                        <Text style={{textAlign: 'center', paddingBottom: 5}}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
            <RenderIngredients index={activeIndex}></RenderIngredients>
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
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1E4B43',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10
    },
    categoryBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    categoryBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "#F7B49B",
        borderBottomWidth: 3,
    },
});