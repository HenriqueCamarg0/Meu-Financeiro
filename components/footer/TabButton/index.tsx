import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

export default function TabButton({ icon, label, ativo }: any) {
  return (
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name={icon} size={22} color={ativo ? "#8b5cf6" : "#888"} />
      <Text style={[styles.tabText, ativo && styles.tabTextAtivo]}>{label}</Text>
    </TouchableOpacity>
  );
}