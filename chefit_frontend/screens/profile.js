import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Tab, TabView } from '@rneui/themed';
import BackButton from '../components/BackButton';
import AchievementsButton from "../components/selectAchievement";
import DisplayCooksonas from '../subScreens/DisplayCooksonas';
import { testuserInfo } from '../API/data';
import DisplayAchievements from '../subScreens/DisplayAchievements';
import SettingsScreen from '../subScreens/Settings';



const Stack = createStackNavigator();

const TabComponent = ({navigation}) => {
  const [index, setIndex] = useState(0);

  const MyRecipes = () => (
    <View>
      <Text>My Recipes</Text>
    </View>
  );

  const MyAchievements = () => (
        <View style={styles.Achievementcontainer}>
              {testuserInfo.userAchievements.map((achievement, index) => (
                <AchievementsButton
                  key={index}
                  title={achievement.trigger ? achievement.title : "Locked Achievement"}
                  description={achievement.trigger ? achievement.UnlockedDescription : achievement.LockedDescription}
                  unlockedImage={achievement.trigger ? achievement.UnlockedImage : achievement.LockedImage}
                  navigation={navigation}
                  timeTriggered={achievement.timeTriggered}
                  rewardImage={achievement.trigger ? achievement.rewardImage : achievement.lockedReward}
                />
              ))}
        </View>
  );

  return (
    <View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
          elevation: 5,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 4,
        }}
        buttonStyle={{ borderColor: 'transparent'}}
        variant='default' disableIndicator={false}>
        <Tab.Item title="My Recipes" titleStyle={(active) => ({ height: 50, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined, textDecorationLine: active ? 'underline' : 'none', textDecorationColor: active ? "#42A797" : "grey",})}
          buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
        <Tab.Item title="Achievements" titleStyle={(active) => ({ height: 50, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined, textDecorationLine: active ? 'underline' : 'none', textDecorationColor: active ? "#42A797" : "grey", })}
          buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="timing" disableSwipe={true} tabItemContainerStyle={{flex: 1,}}>
        <TabView.Item>
          <MyRecipes />
        </TabView.Item>
        <TabView.Item>
          <MyAchievements />
        </TabView.Item>
      </TabView>
    </View>
  );
}

function Profile({ navigation }) {
  return (
      
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.editButton}>
            <Pressable onPress={() => navigation.navigate('Select your Cooksona')}>
              <Image
                source={require('../assets/actionIcons/editCooksonaIcon.png')}
                style={styles.editIcon}
              />
            </Pressable>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/Cooksonas/pancakes.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.username}>Username01</Text>
        <View style={styles.tabContainer}>
          <TabComponent navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
    



  )
}


export default function ProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <BackButton />
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
  name='My Profile'
  component={Profile}
  options={({ navigation }) => ({
    headerTitleAlign: 'left',
    headerStyle: {
      elevation: 0, 
      shadowOpacity: 0, 
      borderBottomWidth: 0,
    },
    
    headerRight: () => (
      <View>
        <Pressable
          onPress={() => navigation.navigate('Settings Screen')}>
          <Image
            source={require('../assets/actionIcons/settingsButton.png')}
            style={{ width: 32, height: 32, resizeMode: 'cover', margin: 30 }}
          />
        </Pressable>
      </View>
    ),
  })}

/>

      <Stack.Screen
        name='Settings Screen'
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0,
          },
          headerShown: false
          
        }}
      />
       <Stack.Screen
        name='Select your Cooksona'
        component={DisplayCooksonas}
        options={{
          headerTitleAlign: 'left',
          headerTitle: '',
          headerStyle: {
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0,
          },
        }}
      />
       <Stack.Screen
        name='Display Achievements'
        component={DisplayAchievements}
        options={{
          headerTitle: '',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    
  },
  Achievementcontainer: {
    margin: 10
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: '#F9B59E',
    borderRadius: 10,
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 8,
  },
  editIcon: {
    width: 22,
    height: 22,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 20,
  },
  profileImage: {
    width: 160,
    height: 154,
  },
  username: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  tabContainer: {
    
    marginTop: 16,
    width: "100%",
  },
});