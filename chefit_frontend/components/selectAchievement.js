import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import { testuserInfo } from '../API/data';

const AchievementsButton = ({ navigation, title, description, unlockedImage, timeTriggered, rewardImage }) => {
    return (
      <View style={styles.button}>
        <Pressable  onPress={() => navigation.navigate('Display Achievements',  { title, description, unlockedImage, timeTriggered, rewardImage })}>
        <View style={styles.rowContainer}>
          <Image source={unlockedImage} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
        </Pressable>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      width: 344,
      height: 80,
      backgroundColor: '#FFF',
      borderRadius: 5,
      shadowColor: '#797979',
      shadowOffset: {
        width: 0.6,
        height: 0.6,
      },
      shadowOpacity: 0.25,
      shadowRadius: 11.8,
      elevation: 5, // for Android shadow
      marginTop: 16,
      marginBottom: 20,
      marginLeft: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    icon: {
      width: 60,
      height: 60,
      marginRight: 10,
      marginTop: 10
    },
    textContainer: {
    paddingTop: 10,
      flexDirection: 'column',
      flex: 1,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333', // text color
    },
    descriptionText: {
      fontSize: 11,
      fontWeight: '200',
      color: '#333', // text color
    },
    Achievementcontainer: {
      margin: 10,
    },
  });

export default AchievementsButton;

