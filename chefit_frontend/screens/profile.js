import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Tab, TabView } from '@rneui/themed';
import BackButton from '../components/BackButton';
import AchievementsButton from "../components/selectAchievement";
import DisplayCooksonas from '../subScreens/DisplayCooksonas';
import { testuserInfo } from '../API/data';
import DisplayAchievements from '../subScreens/DisplayAchievements';
import SettingsScreen from '../subScreens/Settings';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { db, auth } from "../API/firebase.config.js";
import { doc, collection, getDoc, onSnapshot, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import editCooksona from '../assets/actionIcons/editCooksonaIcon.png'


const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;

const TabComponent = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [index, setIndex] = useState(0);

const Star = ({ filled }) => (
    <View style={{ display: filled ? 'flex' : 'none', marginRight: 2 }}>
      <Ionicons name="ios-star" size={15} color="#ffc107" />
    </View>
  );

  function MyRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  
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
              const username = userData[0].username;
              const recipesQuery = query(collection(db, 'recipes'), where('username', '==', username));
              const recipesSnapshot = await getDocs(recipesQuery);
              const userRecipes = recipesSnapshot.docs.map(doc => {
                const data = doc.data();
                return { id: doc.id, ...data };
                // Include document ID as 'id' property
              });
              if (userRecipes.length > 0) {
                setRecipes(userRecipes);
              } else {
                console.log('User recipes not found.');
              }
            } else {
              console.log('Username not found in user data.');
            }
            // Set saved recipe ids if available
            if (userData.length > 0 && userData[0].savedRecipes) {
              setSavedRecipeIds(userData[0].savedRecipes);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUserData();
    }, []);
    
  
    const handleSavePress = async (recipeId) => {
      try {
        const user = auth.currentUser;
        if (user) {
          const currentUserUID = user.uid;
          const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
          const querySnapshot = await getDocs(usersQuery);
          const userData = querySnapshot.docs.map(doc => doc.data());
  
          if (userData && userData.length > 0) {
            const userDataObject = userData[0];
            const savedRecipesArray = userDataObject.savedRecipes || []; // Ensure savedRecipes is an array
            let updatedSavedRecipeIds = [...savedRecipesArray];
  
            if (!updatedSavedRecipeIds.includes(recipeId)) {
              updatedSavedRecipeIds.push(recipeId);
            } else {
              updatedSavedRecipeIds = updatedSavedRecipeIds.filter(id => id !== recipeId);
            }
            const updatedSavedRecipeIdsFiltered = updatedSavedRecipeIds.filter(id => id !== undefined);

            console.log("Updating saved recipes with:", updatedSavedRecipeIdsFiltered);
            console.log("Document ID:", querySnapshot.docs[0].id);
            
            await updateDoc(doc(db, 'users', querySnapshot.docs[0].id), {
              savedRecipes: updatedSavedRecipeIdsFiltered
            });
  
            // Update the UI state for saved recipe ids
            setSavedRecipeIds(updatedSavedRecipeIds);
          } else {
            console.log("User data not found");
          }
        } else {
          console.log("User not logged in");
        }
      } catch (error) {
        console.error("Error updating saved recipes:", error);
      }
    };
  
    return (
      <View style={styles.container}>
        {recipes.map((recipe, index) => (
                    <View key={index} style={styles.recipeContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: recipe.id })}>
              <Image
                source={{ uri: recipe.imageUrl }}
                style={{ width: (windowWidth / 2.3), height: (windowWidth / 3.25), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              />
              <Text style={styles.titleText}>{recipe.title}</Text>
              <Text style={styles.userText}>By: {recipe.username}</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{recipe.timer.duration} {recipe.timer.unit}</Text>
                <Image source={require('../assets/icons/timer.png')} style={{ width: 18, height: 18, marginTop: 5, marginLeft: 7 }} />
              </View>
              <View style={[styles.bottomContainer, { marginLeft: 10 }]}>
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} filled={starIndex < recipe.rating} />
                ))}
  
                <TouchableOpacity onPress={() => handleSavePress(recipe.id)} style={styles.saveButton}>
                  <Image source={savedRecipeIds.includes(recipe.id) ? require('../assets/buttons/saveButton.png') : require('../assets/buttons/unsavedButton.png')} style={styles.savedIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
  
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
            variant='default' disableIndicator='false'>
            <Tab.Item title="My Recipes" titleStyle={(active) => ({ height: 40, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}
              buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
            <Tab.Item title="Achievements" titleStyle={(active) => ({ height: 40, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}
              buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
          </Tab>
          <TabView value={index} onChange={setIndex} animationType="timing" disableSwipe={true} tabItemContainerStyle={{flex: 1,}}>
      
            <TabView.Item>
              <MyRecipes navigation={navigation} />
            </TabView.Item>
            <TabView.Item>
          <MyAchievements navigation={navigation}/>
        </TabView.Item>
          </TabView>
        </View>
    );
  };
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
      <View style={styles.container}>
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
      </View>
    );
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
            fontFamily: 'Coiny_400Regular',
            fontSize: 28
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
      headerStyle: {
        backgroundColor: 'transparent',
      }
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
            headerShown: false
            
          }}
        />
         <Stack.Screen
          name='Select your Cooksona'
          component={DisplayCooksonas}
          options={{
            headerTitleAlign: 'left',
            headerTitle: '',
          }}
        />
         <Stack.Screen
          name='Display Achievements'
          component={DisplayAchievements}
          options={{
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 15
},
recipeContainer: {
    backgroundColor: "white",
    width: (windowWidth / 2.3),
    height: (windowWidth / 1.7),
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
},
titleText: {
    fontSize: windowWidth / 31.5,
    fontWeight: 'bold',
    margin: 10
},
userText: {
    fontSize: windowWidth / 35,
    color: "grey",
    marginLeft: 10
},
timeText: {
    fontSize: windowWidth / 32,
    fontWeight: 'bold',
    color: '#42A797',
    marginLeft: 10,
    marginTop: 5
},
rating: {
    marginLeft: 8,
    marginTop: 10,
    fontSize: windowWidth / 25,
    color: '#F7D47C'
},
timeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
bottomContainer: {
  marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
},
saveButton: {
    position: 'absolute',
    bottom: 0,
    right: 10
},
savedIcon: {
    width: windowWidth / 20,
    height: windowWidth / 20
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
    width: 220,
    height: 220,
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
    bottom: 25,
    right: 20
  },
  profileImageContainer: {
    position: 'absolute',
  },
  profileImage: {
    width: 250,
    height: 250,
  },
  username: {
    marginTop: 10,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  tabContainer: { 
    marginTop: 10,
    width: "100%",
  },
  recipeCard:{
      backgroundColor: "white",
      width: (windowWidth / 2.3),
      height: (windowWidth / 1.7),
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#F7D47C'
  }
});
