import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function MealModal({ date }) {
  const styles = StyleSheet.create({
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
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
    }
  });

  return (
    <View style={styles.view}>
      <View style={styles.box}>
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
              <Text style={{...styles.absolute, ...styles.center}}>826 Remaining</Text>
          </View>
        </View>
        <View style={{...styles.flex, justifyContent: 'center',}}>
          <View>
            <Text>Carbs</Text>
            <Text>10g</Text>
          </View>
          <View>
            <Text>Protien</Text>
            <Text>10g</Text>

          </View>
          <View>
            <Text>Fat</Text>
            <Text>10g</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
