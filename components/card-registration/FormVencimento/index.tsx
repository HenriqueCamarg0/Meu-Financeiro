import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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
  container: { marginTop: 10 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  hint: { fontSize: 12, color: '#999', marginTop: 4 },
  previewCard: { marginTop: 20, alignItems: 'center' },
  previewTitle: { fontSize: 13, color: '#666', marginBottom: 10, fontWeight: 'bold' },
  cardVisual: { backgroundColor: '#2c3e50', width: '90%', height: 150, borderRadius: 15, padding: 20, justifyContent: 'space-between', elevation: 5 },
  cardName: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
  cardNumber: { color: '#FFF', fontSize: 16, letterSpacing: 2 },
  cardDate: { color: '#bdc3c7', fontSize: 14 }
});