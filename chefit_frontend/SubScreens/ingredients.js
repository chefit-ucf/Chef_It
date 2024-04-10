import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react'
import { categories } from '../components/ingredientsBar.js'
import { testuserInfo } from '../API/data.js';
import { db } from "../API/firebase.config.js";
import { collection, onSnapshot } from "firebase/firestore";

const RenderIngredients = ( {index} ) => {
    const [ings, setIngs] = useState([]);
    const ingredientsCollection = collection(db, "users");
    let category;

    if (index === 0) {
        category = "fruits";
    }
    else if (index === 1) {
        category = "vegetables";
    }
    else if (index === 2) {
        category = "dairyEggs";
    }
    else if (index === 3) {
        category = "pastaGrains";
    }
    else if (index === 4) {
        category = "bread";
    }
    else if (index === 5) {
        category = "condiments";
    }
    else if (index === 6) {
        category = "baking";
    }
    else if (index === 7) {
        category = "oilsDressing";
    }
    else if (index === 8) {
        category = "spicesSeasonings";
    }
    else if (index === 9) {
        category = "meatsProteins";
    }
    else if (index === 10) {
        category = "alcoholBevs";
    }

    useEffect(() => {
        const render = onSnapshot(ingredientsCollection, (snapshot) => {
            setIngs([]);
          snapshot.docs.forEach((doc) => {
            const userIngredients = doc.data().userIngredients;
            const ingredients = userIngredients[category];
            const mappedIngredients = Object.values(ingredients).map((ingredient) => ({
              id: doc.id,
              viewing: false,
              ...ingredient,
              src: { uri: ingredient.src },
            }));
            setIngs((prevIngs) => [...prevIngs, ...mappedIngredients]);
          });
        });
    
        return () => render();
      }, [index]);
    
      const listOfIngredients = ings;
   
    return (
        <View style={{flex: 1, paddingBottom: 100, backgroundColor: "#F8FAF8"}}>
            <ScrollView vertical>
                {listOfIngredients.map((item, i) => (
                        <View key={i} style={styles.ingredientsContainer}>
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
        backgroundColor: "#F8FAF8",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#CED8CE",
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