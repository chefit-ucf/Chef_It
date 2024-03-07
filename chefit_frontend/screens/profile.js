import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth } from '../config/firebase'; // Assuming you have initialized Firebase Auth
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function ProfileScreen({ navigation }) {
    const [userEmail, setUserEmail] = useState('');
    const [userUID, setUserUID] = useState('');
    const [loading, setLoading] = useState(false);
    const [unsubscribe, setUnsubscribe] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setUserEmail(user.email);
                    const currentUserUID = user.uid;
                    setLoading(true);
                    const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
                    const newUnsubscribe = onSnapshot(usersQuery, (snapshot) => {
                        let userList = [];
                        snapshot.docs.map((doc) => userList.push({ ...doc.data(), id: doc.id }));
                        if (userList.length > 0) {
                            setUserUID(userList[0].UID);
                        }
                        setLoading(false);
                    });
                    setUnsubscribe(() => newUnsubscribe);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/actionIcons/backButton.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.titleText}>Profile</Text>
                <Text style={styles.emailText}>Email: {userEmail}</Text>
                <Text style={styles.uidText}>User UID: {userUID}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAF8',
    },
    header: {
        padding: 20,
    },
    backButton: {
        width: 35,
        height: 35,
    },
    backButtonImage: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#42A797',
    },
    emailText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
    },
    uidText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 20,
    },
    // Add more styles as needed
});
