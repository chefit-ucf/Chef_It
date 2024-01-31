import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react'
import { Tab, TabView} from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';

import IngredientsScreen from '../subScreens/ingredients';
import SavedRecipesScreen from '../subScreens/savedRecipes';
import RecipeIdeasScreen from '../subScreens/recipeIdeas';

const windowWidth = Dimensions.get('window').width;

export default function PantryScreen({navigation}) {
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
            <TabView value={index} onChange={setIndex} animationType="timing" disableSwipe={true}>
                <TabView.Item style={{width: "100%"}}>
                    <IngredientsScreen></IngredientsScreen>
                </TabView.Item>
                <TabView.Item style={{width: "100%"}}>
                    <SavedRecipesScreen></SavedRecipesScreen>
                </TabView.Item>
                <TabView.Item style={{width: "100%"}}>
                    <RecipeIdeasScreen></RecipeIdeasScreen>
                </TabView.Item>
            </TabView>
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    titleText: {
        paddingTop: 50,
        fontSize: 24,
        textAlign: 'left',
        marginLeft: 20,
        fontFamily: 'Coiny_400Regular',
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


