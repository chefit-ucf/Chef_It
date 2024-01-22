import React from 'react';
import {Button, View, Text } from 'react-native';
import BackButton from '../components/BackButton'

export default function Settings({navigation}){
    return(
        <View>
            <Text>
                This is the settings screen
            </Text>
            <BackButton />
        </View>
    )
}
