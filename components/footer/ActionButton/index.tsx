import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

export default function ActionButton({ onPress }: any) {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fabCircle} onPress={onPress}>
        <Ionicons name="add" size={35} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}