import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const StarRating = ({ recipeId }) => {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const recipeRef = doc(db, "recipes", recipeId);
                const recipeDoc = await getDoc(recipeRef);
                if (recipeDoc.exists()) {
                    const { rating } = recipeDoc.data();
                    setRating(rating);
                }
            } catch (error) {
                console.error("Error fetching rating:", error);
            }
        };

        fetchRating();
    }, [recipeId]);

    const handleRatingPress = async (ratingValue) => {
        try {
            const recipeRef = doc(db, "recipes", recipeId);
            await setDoc(recipeRef, { rating: ratingValue }, { merge: true });
            setRating(ratingValue);
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.ratingView}>
            {[...Array(5)].map((star, i) => {
                const ratingValue= i + 1;

                return (
                <Pressable key={i} onPress={() => handleRatingPress(ratingValue)}>
                        <Ionicons name={ratingValue <= rating ? 'ios-star' : 'ios-star-outline'} size={18} color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"} />
                    </Pressable>
                )
            })}
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingView:{
        flexDirection: "row",
        marginTop: 10,
    }
})

export default StarRating;