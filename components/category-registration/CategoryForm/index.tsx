import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';
import { categoriaService, subCategoriaService } from '../../../services/categoriaService';

export default function CategoryForm({ aoSalvar }: { aoSalvar: () => void }) {
  const [nomeCat, setNomeCat] = useState('');
  const [querSub, setQuerSub] = useState(false);
  const [inputSub, setInputSub] = useState('');
  const [listaSubs, setListaSubs] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);

  // Lógica de salvamento robusta
  async function handleSalvarTudo() {
    if (!nomeCat.trim()) return Alert.alert("Erro", "Nome da categoria obrigatório.");
    
    setCarregando(true);
    try {
      // 1. Criar a Categoria Pai primeiro
      const novaCat = await categoriaService.salvar(nomeCat.trim());
      console.log("Categoria criada:", novaCat.id);

      // 2. Criar as Subcategorias se houver
      if (querSub && listaSubs.length > 0) {
        // Criamos uma cópia da lista para garantir que trabalhamos com os dados atuais
        const subsParaCadastrar = [...listaSubs];
        
        // Usamos um loop for...of que aguarda a conclusão real de cada requisição
        for (const nome of subsParaCadastrar) {
          console.log(`Tentando cadastrar subcategoria: ${nome}`);
          await subCategoriaService.salvar(nome.trim(), novaCat.id);
          
          // Pequena pausa de 300ms apenas para garantir a ordem no banco de dados
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      Alert.alert("Sucesso", `Categoria "${nomeCat}" e ${listaSubs.length} subcategorias criadas!`);
      
      // Resetar tudo após o sucesso total
      setNomeCat('');
      setListaSubs([]);
      setQuerSub(false);
      aoSalvar();

    } catch (err: any) {
      console.error("Erro no processo:", err.response?.data || err.message);
      Alert.alert("Erro no Cadastro", "A categoria foi criada, mas houve um problema nas subcategorias ou o nome já existe.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>Nome da Categoria</Text>
      <TextInput 
        style={[styles.input, { padding: 10 }]} // Ajuste de padding para visibilidade
        value={nomeCat} 
        onChangeText={setNomeCat} 
        placeholder="Ex: Moradia" 
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Switch 
          value={querSub} 
          onValueChange={setQuerSub} 
          trackColor={{ true: '#8b5cf6', false: '#CCC' }} 
        />
        <Text style={{ marginLeft: 10, color: '#666' }}>Adicionar subcategorias?</Text>
      </View>

      {querSub && (
        <View style={{ marginBottom: 15 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <TextInput 
              style={[styles.input, { flex: 1, marginBottom: 0, padding: 10 }]} 
              value={inputSub} 
              onChangeText={setInputSub} 
              placeholder="Ex: Aluguel" 
            />
            <TouchableOpacity 
              style={styles.btnAdicionarSub}
              onPress={() => {
                if(inputSub.trim()){
                  setListaSubs([...listaSubs, inputSub.trim()]);
                  setInputSub('');
                }
              }}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {listaSubs.length > 0 && (
            <View style={{ marginTop: 10, backgroundColor: '#f9fafb', borderRadius: 8, padding: 5 }}>
              {listaSubs.map((item, idx) => (
                <View key={idx} style={styles.tagSub}>
                  <Text style={{ flex: 1, color: '#333' }}>• {item}</Text>
                  <TouchableOpacity onPress={() => setListaSubs(listaSubs.filter((_, i) => i !== idx))}>
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      <TouchableOpacity 
        style={[styles.btnSalvar, { opacity: carregando ? 0.7 : 1 }]} 
        onPress={handleSalvarTudo} 
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.btnSalvarText}>Salvar Categoria</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}