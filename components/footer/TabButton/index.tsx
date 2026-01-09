import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../../utils/designSystem';

export default function TabButton({ icon, label, ativo, onPress }: any) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Ionicons name={icon} size={22} color={ativo ? colors.primary : colors.gray400} />
      <Text style={[styles.tabText, ativo && styles.tabTextAtivo]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  tabItem: { alignItems: 'center' as const, flex: 1 },
  tabText: { 
    fontSize: typography.sizes.xs, 
    color: colors.gray400, 
    marginTop: 4,
  },
  tabTextAtivo: { 
    color: colors.primary, 
    fontWeight: typography.weights.bold,
  },
};