import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react'

import { categories } from '../components/ingredientsBar.js'
import { testuserInfo } from '../API/data.js';

const RenderIngredients = ( {index} ) => {
    let listOfIngredients;

    if (index === 0) {
        listOfIngredients = testuserInfo.userIngredients["fruits"];
    }
    else if (index === 1) {
        listOfIngredients = testuserInfo.userIngredients["vegetables"];
    }
    else if (index === 2) {
        listOfIngredients = testuserInfo.userIngredients["dairyEggs"];
    }
    else if (index === 3) {
        listOfIngredients = testuserInfo.userIngredients["pastaGrains"];
    }
    else if (index === 4) {
        listOfIngredients = testuserInfo.userIngredients["bread"];
    }
    else if (index === 5) {
        listOfIngredients = testuserInfo.userIngredients["condiments"];
    }
    else if (index === 6) {
        listOfIngredients = testuserInfo.userIngredients["baking"];
    }
    else if (index === 7) {
        listOfIngredients = testuserInfo.userIngredients["oilsDressing"];
    }
    else if (index === 8) {
        listOfIngredients = testuserInfo.userIngredients["spicesSeasonings"];
    }
    else if (index === 9) {
        listOfIngredients = testuserInfo.userIngredients["meatsProteins"];
    }
    else if (index === 10) {
        listOfIngredients = testuserInfo.userIngredients["alcoholBevs"];
    }
    return (
        <View style={{flex: 1, paddingBottom: 100, backgroundColor: "#FFE3DA"}}>
            <ScrollView vertical>
                {listOfIngredients.map((item, i) => (
                    <View style={styles.ingredientsContainer}>
                        <Text style={styles.ingredientTitle}>{item.title}</Text>
                        <View style={styles.nutritionContainer}>
                            <Image source={item.src} resizeMode='cover'
                            style={{width: 100, height: 100, ...styles.shadow}} />
                            <Text style={styles.ingredientInfo}>Calories:{"\n"}Fats:{"\n"}Carbs:{"\n"}Protein:</Text>
                            <Text style={styles.ingredientInfo}>{item.nutrition.calories}{"\n"}{item.nutrition.fats}{"\n"}{item.nutrition.carbs}{"\n"}{item.nutrition.protein}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
                        style={{width: 40, height: 40, tintColor: "black"}} />
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
        elevation: 10,
        position: 'relative',
        zIndex: 10 
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
    ingredientsContainer: {
        backgroundColor: "#FFE3DA",
        padding: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: "white",
    },
    nutritionContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 20,
        paddingRight: 50,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 50
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    ingredientTitle: {
        fontSize: 20,
        color: "#BD7B63",
        fontWeight: "bold",
        paddingHorizontal: 20,
        marginBottom: 5
    },
    ingredientInfo: {
        fontSize: 14,
        color: "#595959",
    }
});