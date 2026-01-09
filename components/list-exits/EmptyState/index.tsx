import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>🚫 Nenhuma saída encontrada para este mês.</Text>
    </View>
  );
}