import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react'
import { useState } from 'react'
import { Tab, TabView} from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-web';

export default function PantryScreen({navigation}) {
    const [index, setIndex] = React.useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>My Pantry</Text>  
            <Tab 
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{backgroundColor: 'white', height: 3}}
                buttonStyle={{borderBottomWidth: 0.5}}
                variant='default' disableIndicator='false'>
                <Tab.Item title="Ingredients" titleStyle={(active) => ({height: 35, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})} 
                                              buttonStyle={(active) => ({borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5})} />
                <Tab.Item title="Saved Recipes" titleStyle={(active) => ({height: 35, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}   
                                                buttonStyle={(active) => ({borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5})} />
                <Tab.Item title="Recipe Ideas" titleStyle={(active) => ({height: 35, width: 170, fontSize: 18, color: active ? "#42A797" : "grey", fontWeight: active ? "bold" : undefined})}  
                                               buttonStyle={(active) => ({borderColor: active ? "#42A797" : "grey", borderBottomWidth: active ? 3 : 0.5})} />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="timing">
                <TabView.Item style={{width: "100%"}}>
                    <Text style={styles.pText}>Ingredients Screen</Text>
                </TabView.Item>
                <TabView.Item style={{width: "100%"}}>
                    <Text style={styles.pText}>Saved Recipes Screen</Text>
                </TabView.Item>
                <TabView.Item style={{width: "100%"}}>
                    <Text style={styles.pText}>Recipe Ideas Screen</Text>
                </TabView.Item>
            </TabView>
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAF8"
    },
    titleText: {
        paddingTop: 70,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center'
    },
    pText: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    shadow: {
        shadowColor: '#1E4B43',
        shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10
    }
});


