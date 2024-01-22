import React from 'react';
import { Button, View, Text } from 'react-native';





function LogIn({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the profile
      </Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
       <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
    );
}

export default LogIn;