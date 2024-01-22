import React from 'react';
import { Button, View, Text } from 'react-native';





function Welcome({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the welcome screen
      </Text>
      <Button
        title="Keep Going"
        onPress={() => navigation.navigate('ExploreScreen')}
      />
       
    </View>
    );
}

export default Welcome;