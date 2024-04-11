import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';

const DisplayAchievements = ({ route }) => {
  const { title, description, unlockedImage, timeTriggered, rewardImage } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Image source={unlockedImage} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.time}>{timeTriggered}</Text>
          <View>
            <Image 
              source={rewardImage} 
              style={styles.rewardImage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 191,
    height: 191,
    marginBottom: 37,
  },
  rewardImage: {
    width: 191,
    height: 191,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 17,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '100',
  },
time: {
    padding: 17,
    fontSize: 20,
    textAlign: 'center',
  },
  reward: {
    width: 291,
    height: 318,
    backgroundColor: '#47A695'
  }
});

export default DisplayAchievements;