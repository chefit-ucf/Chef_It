import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Star = ({ filled }) => (
    <View style={{ display: filled ? 'flex' : 'none', marginRight: 2 }}>
      <Ionicons name="ios-star" size={15} color="#ffc107" />
    </View>
  );

export default Star;
