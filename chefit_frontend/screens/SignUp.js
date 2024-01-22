import React from 'react';
import { Button, View, Text } from 'react-native';





function SignUp({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the profile
      </Text>
      <Button
        title="Go to Explore"
        onPress={() => navigation.navigate('Explore')}
      />
       <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
    );
}

export default SignUp;