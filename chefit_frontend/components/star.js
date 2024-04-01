import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Star = ({ filled }) => (
  <View style={{ display: 'inline-block', marginRight: 2 }}>
        <Ionicons name={ratingValue <= rating ? 'ios-star' : 'ios-star-outline'} size={18} color={filled ? "#ffc107" : "#e4e5e9"} />

  </View>
);

export default Star;
