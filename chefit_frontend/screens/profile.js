import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Tab, TabView } from '@rneui/themed';
import BackButton from '../components/BackButton';
import AchievementsButton from "../components/selectAchievement";
import DisplayCooksonas from "../subScreens/DisplayCooksonas"
import DisplayAchievements from '../subScreens/DisplayAchievements';
import SettingsScreen from '../subScreens/Settings';
import { db, auth } from '../config/firebase'; // Import your Firebase Firestore configuration
import { collection, getDocs, query, where, onSnapshot  } from 'firebase/firestore'; // Import Firestore functions for querying
import { useEffect } from 'react';
import editCooksona from '../assets/actionIcons/editCooksonaIcon.png'

const Stack = createStackNavigator();

function MyAchievements({ navigation }) {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const currentUserUID = user.uid;
                    const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
                    const querySnapshot = await getDocs(usersQuery);
                    const userData = querySnapshot.docs.map(doc => doc.data());
                    if (userData.length > 0 && userData[0].achievements) {
                        setAchievements(userData[0].achievements);
                    } else {
                        console.log('User data or achievements not found.');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.Achievementcontainer}>
            {achievements.map((achievement, index) => {
                return (
                    <AchievementsButton
                        key={index}
                        title={achievement.trigger ? achievement.title : "Locked Achievement"}
                        description={achievement.trigger ? achievement.UnlockedDescription : achievement.LockedDescription}
                        unlockedImage={achievement.trigger ? achievement.UnlockedImage : achievement.LockedImage}
                        navigation={navigation}
                        timeTriggered={achievement.timeTriggered}
                        rewardImage={achievement.trigger ? achievement.rewardImage : achievement.lockedReward}
                    />
                );
            })}
        </View>
    );
}

function MyRecipes({navigation}){
    
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const currentUserUID = user.uid;
                    const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
                    const querySnapshot = await getDocs(usersQuery);
                    const userData = querySnapshot.docs.map(doc => doc.data());
                    if (userData.length > 0 && userData[0].username) {
                        const username = userData[0].username; // Get the username from the user data
                        const recipesQuery = query(collection(db, 'recipes'), where('username', '==', username));
                        const recipesSnapshot = await getDocs(recipesQuery);
                        const userRecipes = recipesSnapshot.docs.map(doc => doc.data());
                        if (userRecipes.length > 0) {
                            setRecipes(userRecipes);
                        } else {
                            console.log('User recipes not found.');
                        }
                    } else {
                        console.log('Username not found in user data.');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);
    
    
    return (
        <View style={styles.recipeContainer}>
            {recipes.map((recipe, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: recipe.recipeId })}>
                    <View style={styles.recipeCard}>
                        <Image
                            source={{ uri: recipe.imageUrl }}
                            style={{ width: 184, height: 140, resizeMode: 'cover', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom: 10 }}
                        />
                        <View>
                            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{recipe.title}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'grey', fontSize: 10, marginLeft: 10, paddingTop: 5 }}>By: {recipe.username}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={{ color: '#47A695', fontWeight: 'bold', fontSize: 12, marginLeft: 10, paddingTop: 5 }}>{recipe.timer.duration} {recipe.timer.unit}</Text>
                            <Image
                                source={require('../assets/icons/timer.png')}
                                style={{ width: 13, height: 13, resizeMode: 'contain', margin: 3 }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 85, padding: 3, alignItems: 'center', paddingBottom: 10 }}>
                            <Text style={styles.rating}>{recipe.rating}</Text>
                            <Image
                                source={require('../assets/actionIcons/saveButton.png')}
                                style={{ width: 15, height: 15, resizeMode: 'contain' }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const TabComponent = ({navigation}) => {
  const [index, setIndex] = useState(0);

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
        <Tab.Item title="MyRecipes" titleStyle={(active) => ({ height: 50, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined, textDecorationLine: active ? 'underline' : 'none', textDecorationColor: active ? "#42A797" : "grey",})}
          buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
        <Tab.Item title="MyAchievements" titleStyle={(active) => ({ height: 50, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined, textDecorationLine: active ? 'underline' : 'none', textDecorationColor: active ? "#42A797" : "grey", })}
          buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="timing" disableSwipe={true} tabItemContainerStyle={{flex: 1,}}>
        <TabView.Item>
          <MyRecipes />
        </TabView.Item>
        <TabView.Item>
          <MyAchievements navigation={navigation}/>
        </TabView.Item>
      </TabView>
    </View>
  );
}

function Profile({ navigation }) {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
  
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const user = auth.currentUser;
              if (user) {
                  const currentUserUID = user.uid;
                  const usersRef = collection(db, 'users');
                  const unsubscribe = onSnapshot(query(usersRef, where('UID', '==', currentUserUID)), (querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                          const userData = doc.data();
                          setUsername(userData.username);
                          setAvatar(userData.userAvatar);
                      });
                  });
                  return unsubscribe;
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
  }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                 source={{ uri: avatar }}
                style={styles.profileImage}
              />
              <Pressable onPress={() => navigation.navigate('Select your Cooksona')} style={styles.editButton}>
              <Image
                 source={editCooksona }
                style={styles.editIcon}
              />
              </Pressable>
            </View>
          </View>
          <View><Text style={styles.username}>{username}</Text></View>
          <View style={styles.tabContainer}>
            <TabComponent navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    );
  }


export default function ProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          elevation: 0, 
          shadowOpacity: 0, 
          borderBottomWidth: 0,
        }
      }}
    >
  
  <Stack.Screen
  name='My Profile'
  component={Profile}
  options={({ navigation }) => ({
    headerTitleAlign: 'left',
    headerLeft: null,
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
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0,
          },
          headerShown: false,
          headerBackImage: () => (
            <BackButton />
          ),
          
        }}
      />
       <Stack.Screen
        name='Select your Cooksona'
        component={DisplayCooksonas}
        options={{
          headerTitleAlign: 'left',
          headerTitle: '',
          headerBackImage: () => (
            <BackButton />
          ),
        }}
      />
       <Stack.Screen
        name='Display Achievements'
        component={DisplayAchievements}
        options={{
          headerTitle: '',
          headerBackImage: () => (
            <BackButton />
          ),
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
  recipeContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
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
    
    borderRadius: 10,
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    top: 160,
    left: 160,
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
    width: 200,
    height: 200,
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
  recipeCard:{
    margin: 30,
    width: 185,
    height: 245,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    elevation: 5,
    
},
  timeContainer:{
    flex: 1,
    flexDirection: 'row',
    width: 61,
    height: 16,
    
  }
});