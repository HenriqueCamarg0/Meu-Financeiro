import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../utils/designSystem';

export default function FormInfo({ onDataChange, valores }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Nome do Cartão</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Nubank, C6 Bank" 
          value={valores.nomeCartao}
          onChangeText={(t) => onDataChange({ nomeCartao: t })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Últimos 4 Dígitos</Text>
        <TextInput 
          style={styles.input} 
          placeholder="0000" 
          keyboardType="numeric"
          maxLength={4}
          value={valores.digitosCartao}
          onChangeText={(t) => onDataChange({ digitosCartao: t })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: spacing.sm },
  field: { marginBottom: spacing.xl },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.text, marginBottom: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.gray300, borderRadius: 8, padding: spacing.md, fontSize: typography.sizes.base, backgroundColor: colors.surface }
});