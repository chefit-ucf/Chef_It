import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function MealModal({ navigation, date }) {


  return (
    <View style={styles.view}>
      <View style={styles.box}>
        <View style={{...styles.flex, justifyContent:"space-between", width: '100%', padding: 12}}>
          <Text>Today</Text>
          <Pressable
          onPress={() => navigation.navigate('Edit Macros')}>
          <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path 
            d="M21.099 3.66442L17.7972 0.362632C17.565 0.130442 17.25 0 16.9217 0C16.5933 0 16.2784 0.130442 16.0461 0.362632L6.14077 10.268C5.90859 10.5002 5.77815 10.8151 5.77813 11.1435V14.4453C5.77814 14.7737 5.90859 15.0886 6.14079 15.3208C6.37299 15.553 6.68792 15.6835 7.0163 15.6835H10.3181C10.4807 15.6835 10.6417 15.6515 10.7919 15.5892C10.9421 15.527 11.0786 15.4358 11.1936 15.3208L21.099 5.41547C21.214 5.3005 21.3052 5.164 21.3674 5.01378C21.4296 4.86356 21.4617 4.70255 21.4617 4.53995C21.4617 4.37735 21.4296 4.21634 21.3674 4.06611C21.3052 3.91589 21.214 3.77939 21.099 3.66442ZM16.9217 2.98919L18.4724 4.53995L17.3344 5.67796L15.7837 4.12722L16.9217 2.98919ZM9.80521 13.2071H8.25447V11.6564L14.0326 5.87828L15.5833 7.42901L9.80521 13.2071ZM20.6362 11.2022V19.398C20.6356 19.9451 20.4179 20.4696 20.0311 20.8565C19.6442 21.2434 19.1197 21.461 18.5726 21.4616H2.06362C1.5165 21.461 0.991971 21.2434 0.605101 20.8565C0.218232 20.4696 0.000617196 19.9451 0 19.398V2.88905C0.000612835 2.34194 0.218226 1.8174 0.605097 1.43053C0.991967 1.04366 1.5165 0.826048 2.06362 0.825435H10.2594C10.5878 0.825435 10.9028 0.955885 11.135 1.18809C11.3672 1.42029 11.4976 1.73522 11.4976 2.06361C11.4976 2.39199 11.3672 2.70692 11.135 2.93912C10.9028 3.17133 10.5878 3.30178 10.2594 3.30178H2.47634V18.9853H18.1598V11.2022C18.1598 10.8738 18.2903 10.5589 18.5225 10.3266C18.7547 10.0944 19.0696 9.964 19.398 9.964C19.7264 9.964 20.0413 10.0944 20.2735 10.3266C20.5057 10.5589 20.6362 10.8738 20.6362 11.2022Z" 
            fill="#47A695"
          />
          </Svg>
          </Pressable>
        </View>
        <View style={styles.relative}>
          <View style={styles.center}>
            <Svg style={styles.svg} width="213" height="213" viewBox="0 0 213 213" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M53.0329 159.099C42.544 148.61 35.4009 135.247 32.507 120.698C29.6131 106.15 31.0984 91.0696 36.7749 77.3651C42.4515 63.6607 52.0644 51.9473 64.3981 43.7061C76.7317 35.465 91.2322 31.0663 106.066 31.0663C120.899 31.0663 135.4 35.4649 147.734 43.706C160.067 51.9471 169.68 63.6605 175.357 77.3649C181.033 91.0693 182.519 106.149 179.625 120.698C176.731 135.246 169.588 148.61 159.099 159.099"
                stroke="#FEF3CD"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <Path
                d="M53.0329 159.099C39.5441 145.61 31.7021 127.488 31.1029 108.422C30.5037 89.355 37.1924 70.7766 49.8076 56.4674C62.4228 42.1583 80.0164 33.1939 99.0078 31.3987C117.999 29.6035 136.961 35.1124 152.034 46.8042"
                stroke="#F7D47A"
                strokeWidth="12"
                strokeLinecap="round"
              />

            </Svg>
              <Text style={{...styles.absolute, ...styles.center, ...styles.title}}>826 {"\n"} Remaining</Text>
          </View>
        </View>
        <View style={{...styles.flex, justifyContent: 'center', padding: 12, paddingTop: 0,}}>
          <View>
            <Text style={styles.title}>Carbs</Text>
            <Text style={styles.title}>10g</Text>
          </View>
          <View>
            <Text style={styles.title}t>Protein</Text>
            <Text style={styles.title}>10g</Text>

          </View>
          <View>
            <Text style={styles.title}>Fat</Text>
            <Text style={styles.title}>10g</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: "#494949",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  svg:{
  },
  relative: {
    position: 'relative',
    width: '100%',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});