import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';
import { colors } from '../../../utils/designSystem';

export default function ActionButton({ onPress }: any) {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fabCircle} onPress={onPress}>
        <Ionicons name="add" size={35} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}