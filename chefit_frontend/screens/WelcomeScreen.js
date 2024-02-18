import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, View, Text, FlatList } from 'react-native';
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from  '../config/firebase.js'



export default function WelcomeScreen({navigation}) {

  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    const usersQuery = collection(db, "users")
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = []
      snapshot.docs.map((doc)=> usersList.push({...doc.data(), id: doc.id}))
      setPeople(usersList)
      setLoading(false)
    })
  }, [])

    const renderItem = ({item}) => {
      return (
        <View style={{marginTop: 10}}>
          <Text>{item.username}</Text>
        </View>
      );
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the welcome screen
      </Text>
      <Button
        title="Keep Going"
        onPress={() => navigation.navigate('Home')}
      />
      <FlatList 
        data={people} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id}
      />
       
    </SafeAreaView>
    );
}

