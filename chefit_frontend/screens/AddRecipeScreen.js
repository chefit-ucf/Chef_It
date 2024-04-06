import React from 'react';
import { Button, View, Text } from 'react-native';





export default function AddRecipe({navigation, route}) {
  const { answer } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the add recipe screen
      </Text>
      
       
    </View>
    );
}

