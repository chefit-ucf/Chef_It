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
import { db } from "../API/firebase.config.js";
import { doc, collection, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
//
const TabComponent = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userId = "user001"; // User ID to fetch recipes for
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const recipeIds = userData.recipes || [];
          setSavedRecipeIds(recipeIds);
          const recipesCollectionRef = collection(db, "recipes");
          const snapshot = await onSnapshot(recipesCollectionRef, (snapshot) => {
            const fetchedRecipes = snapshot.docs
              .filter(doc => recipeIds.includes(doc.id))
              .map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(fetchedRecipes);
          });
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const unSavedImage = require('../assets/buttons/unsavedButton.png');
  const savedImage = require('../assets/buttons/saveButton.png');

  const handleSavePress = async (recipeId) => {
    try {
      const userId = "user001"; // User ID
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        let updatedSavedRecipeIds = [...savedRecipeIds];
        if (!savedRecipeIds.includes(recipeId)) {
          updatedSavedRecipeIds.push(recipeId);
        } else {
          updatedSavedRecipeIds = updatedSavedRecipeIds.filter(id => id !== recipeId);
        }
        await updateDoc(userDocRef, { savedRecipes: updatedSavedRecipeIds });
        setSavedRecipeIds(updatedSavedRecipeIds);
      }
    } catch (error) {
      console.error("Error updating saved recipes:", error);
    }
  };

  const MyRecipes = () => (
    <View style={styles.container}>
      {recipes.map((recipe) => (
        <View key={recipe.id} style={styles.recipeContainer}>
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
            <View style={styles.bottomContainer}>
              <Text style={styles.rating}>{recipe.rating}</Text>
              <TouchableOpacity onPress={() => handleSavePress(recipe.id)} style={styles.saveButton}>
                <Image source={savedRecipeIds.includes(recipe.id) ? savedImage : unSavedImage} style={styles.savedIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      ))}
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
        variant='default' disableIndicator='false'>
        <Tab.Item title="My Recipes" titleStyle={(active) => ({ height: 40, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}
          buttonStyle={(active) => ({ borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5 })} />
        <Tab.Item title="Achievements" titleStyle={(active) => ({ height: 40, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}
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
                source={require('../assets/buttons/editCooksonaIcon.png')}
                style={styles.editIcon}
              />
            </Pressable>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/cooksonas/pancakes.png')}
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
    const [index, setIndex] = React.useState(0);
    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Coiny_400Regular
    })
    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

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
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'Coiny_400Regular',
    },
    
    headerRight: () => (
      <View>
        <Pressable
          onPress={() => navigation.navigate('Settings Screen')}>
          <Image
            source={require('../assets/buttons/settingsButton.png')}
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
    paddingHorizontal: 7,
    paddingTop: 10,
    gap: 20
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
  timeContainer:{
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
    height: 16,
    alignItems: 'center'
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#F7D47C'
  }
});