import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from '../styles';
import { userService } from '../../../services/userService';

export default function UserForm({ aoSucesso }: { aoSucesso: () => void }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!nome.trim() || !sobrenome.trim()) return Alert.alert("Erro", "Preencha todos os campos.");
    setLoading(true);
    try {
      await userService.salvar(nome, sobrenome);
      setNome(''); setSobrenome('');
      aoSucesso();
    } catch { Alert.alert("Erro", "Falha ao cadastrar usuário."); }
    finally { setLoading(false); }
  };

  return (
    <View style={styles.cardForm}>
      <Text style={styles.label}>Nome do Usuário</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome..." />
      
      <Text style={styles.label}>Sobrenome</Text>
      <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome} placeholder="Digite o sobrenome..." />

      <TouchableOpacity style={styles.btnSalvar} onPress={handleAdd} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnSalvarText}>+ Adicionar Usuário</Text>}
      </TouchableOpacity>
    </View>
  );
}