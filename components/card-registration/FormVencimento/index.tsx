import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../utils/designSystem';

export default function FormVencimento({ onDataChange, valores }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Dia de Vencimento</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 15" 
          keyboardType="numeric"
          maxLength={2}
          value={valores.diaVencimento}
          onChangeText={(t) => {
            // Validação simples para não passar de 31 dias
            const dia = parseInt(t);
            if (!t || (dia >= 1 && dia <= 31)) {
              onDataChange({ diaVencimento: t });
            }
          }}
        />
        <Text style={styles.hint}>Digite o dia (01 a 31)</Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Prévia do Cartão</Text>
        <View style={styles.cardVisual}>
          <Text style={styles.cardName}>{valores.nomeCartao || "NOME DO CARTÃO"}</Text>
          <Text style={styles.cardNumber}>**** **** **** {valores.digitosCartao || "0000"}</Text>
          <Text style={styles.cardDate}>Vencimento: Dia {valores.diaVencimento || "--"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: spacing.sm },
  field: { marginBottom: spacing.xl },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.text, marginBottom: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.gray300, borderRadius: 8, padding: spacing.md, fontSize: typography.sizes.base, backgroundColor: colors.surface },
  hint: { fontSize: typography.sizes.xs, color: colors.textLight, marginTop: 4 },
  previewCard: { marginTop: spacing.xl, alignItems: 'center' },
  previewTitle: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: spacing.sm, fontWeight: typography.weights.bold },
  cardVisual: { backgroundColor: colors.gray800, width: '90%', height: 150, borderRadius: 15, padding: spacing.xl, justifyContent: 'space-between', elevation: 5 },
  cardName: { color: colors.white, fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, textTransform: 'uppercase' },
  cardNumber: { color: colors.white, fontSize: typography.sizes.base, letterSpacing: 2 },
  cardDate: { color: colors.gray300, fontSize: typography.sizes.sm }
});