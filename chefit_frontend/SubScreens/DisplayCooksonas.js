import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../config/firebase'; // Import your Firebase Firestore configuration
import { query, collection, where, getDocs, setDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'; // Import necessary Firestore functions

// For navigation
const Stack = createStackNavigator();

export default function DisplayCooksonas() {
  

  const [oldAvatar, setOldAvatar] = useState('')
  const [selectedCooksona, setSelectedCooksona] = useState(null); // Step 1
  const [successMessage, setSuccessMessage] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleCooksonaSelect = (item) => { // Step 3
    setSelectedCooksona(item);
  };

  const Box = ({ source }) => {
    return (
      <Pressable onPress={() => handleCooksonaSelect(source)}> 
        <View style={[styles.box, { backgroundColor: source.backgroundColor }]}>
          <Image source={{ uri: source.cooksona }} style={styles.boxImage} />
        </View>
      </Pressable>
    );
  };

  const data = [
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fpancakes.png?alt=media&token=c3af509f-1907-4dbd-ba49-97a5f64fbdae',
      backgroundColor: '#F9B59E',
      selectImage: require('../assets/Cooksonas/pancakes_withbackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fpancakes_withbackground.png?alt=media&token=38d2e61e-f2f5-42e5-b061-0e310b3ea17c'

    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fwaffle.png?alt=media&token=14ff3136-32ce-456a-9fe4-e9f6d2499b72',
      backgroundColor: '#F9B59E',
      selectImage: require('../assets/Cooksonas/waffles_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fwaffles_withBackground.png?alt=media&token=2e2ac6de-c3ae-4e7a-b95d-91ff0cea7f06'
    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fsandwich.png?alt=media&token=c14281e4-2101-4fe9-9786-3bc6ffcc80c7',
      backgroundColor: '#F9B59E',
      selectImage: require('../assets/Cooksonas/sandwich_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fsandwich_withBackground.png?alt=media&token=13131197-813d-48c0-b075-265f10967f84'

    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fspaghetti.png?alt=media&token=2697ac4a-ea87-4186-a3b1-fe7c97ccb9c7',
      backgroundColor: '#FCEFCB',
      selectImage: require('../assets/Cooksonas/spaghetti_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fspaghetti_withBackground.png?alt=media&token=53714e7a-49f2-45c9-9b38-8d8ebe4f870c'

    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fsalad.png?alt=media&token=d37c6fc9-8752-4942-865c-61964b89af22',
      backgroundColor: '#FCEFCB',
      selectImage:  require('../assets/Cooksonas/salad_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fsalad_withBackground.png?alt=media&token=7bb6466b-6ff0-44e9-9d59-5c7e108d7d44'

    },

    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Framen.png?alt=media&token=f73875f4-b3b0-4fa3-9511-61bd2b34cb8c',
      backgroundColor: '#FCEFCB',
      selectImage: require('../assets/Cooksonas/ramen_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Framen_withBackground.png?alt=media&token=63cbd1ae-d288-4804-9a2e-7cf60c81ea87'

    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fpizza.png?alt=media&token=032f0a23-c4f7-49f2-9c1c-0d621e5e2777',
      backgroundColor: '#BADAD4',
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fpizza_withBackground.png?alt=media&token=fd69a35e-610a-42d4-b14d-028a381f2ddc',
      selectImage: require('../assets/Cooksonas/pizza_withBackground.png'),
    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Ffries.png?alt=media&token=5862e402-54be-48ab-8d7d-95cfc46fcd7d',
      backgroundColor: '#BADAD4',
      selectImage: require('../assets/Cooksonas/fries_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Ffries_withBackground.png?alt=media&token=7aa18c61-dd9c-44d8-a6d1-59bdb486f7b2'
    },
    {
      cooksona: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fburger.png?alt=media&token=0c2e665e-e01e-44af-9ebf-2dfb35f6f482',
      backgroundColor: '#BADAD4',
      selectImage: require('../assets/Cooksonas/burger_withBackground.png'),
      cooksonaBackground: 'https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fburger_withBackground.png?alt=media&token=47d055cf-b971-40a1-9e40-92ee4c5505bb'
    },

  ]

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('User not authenticated');
          return;
        }

        const currentUserUID = user.uid;
        const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
        const querySnapshot = await getDocs(usersQuery);

        if (querySnapshot.empty) {
          console.log("User data not found");
          return;
        }

        const userData = querySnapshot.docs[0].data();
        setOldAvatar(userData.userAvatar);
        setAvatar(userData.userAvatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCooksonaChange = async () => {
    try {

      const user = auth.currentUser;
      if (!user) {
        console.log('User not authenticated');
        return;
      }


      const currentUserUID = user.uid;
      const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersQuery);
      const userData = querySnapshot.docs[0].data();
      const username = userData.username;
      

      if (!username) {
        console.log('Username not found for the user');
        return;
      }

      await updateDoc(doc(db, 'users', userData.username), {
        userAvatar: selectedCooksona.cooksonaBackground
      });
      console.log('User username:', username);
      console.log(selectedCooksona.cooksonaBackground)

      setSuccessMessage('Avatar Change Successful!');
    } catch (error) {
      console.error('Error changing avatar:', error);
      setSuccessMessage('Avatar Change Failed');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.profileImageContainer}>
        <Image
            source={selectedCooksona ? { uri: selectedCooksona.cooksonaBackground } : {uri: avatar}} 
            style={styles.profileImage}
          />
      
        </View>
        <Text style={styles.headingText}>Select Your Cooksona</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Box source={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
        />
        <View> 
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
          <Pressable onPress={handleCooksonaChange} style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 700
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 2,
  },
  box: {
    width: 100,
    height: 100,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    width: 100,
    height: 32,
    backgroundColor: '#47A695',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FEF3CD',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15,
    marginTop: 10
  },
  profileImageContainer: {
    padding: 12,
    borderRadius: 20,
    width: 225,
    height: 225,
  },
  profileImage: {
    alignSelf: 'center',
    width: 225,
    height: 225,
  },
  successMessage: {
    fontSize: 18,
  }
});
