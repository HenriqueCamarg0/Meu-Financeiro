import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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
  container: { marginTop: 10 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' }
});