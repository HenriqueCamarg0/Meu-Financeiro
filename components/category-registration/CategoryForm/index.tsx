import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoriaService, subCategoriaService } from '../../../services/categoriaService';
import { colors, typography, spacing, components, utils } from '../../../utils/designSystem';

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
    <View style={[components.card, { marginBottom: spacing.xl }]}>
      <Text style={[typography.styles.h4, { marginBottom: spacing.lg, color: colors.gray800 }]}>
        Nova Categoria
      </Text>

      <View style={{ marginBottom: spacing.lg }}>
        <Text style={[typography.styles.label, { marginBottom: spacing.sm }]}>
          Nome da Categoria <Text style={{ color: colors.error }}>*</Text>
        </Text>
        <TextInput 
          style={components.input}
          value={nomeCat} 
          onChangeText={setNomeCat} 
          placeholder="Ex: Moradia, Alimentação, Transporte..." 
          placeholderTextColor={colors.gray400}
        />
      </View>

      <View style={[components.row, { marginBottom: spacing.lg }]}>
        <Switch 
          value={querSub} 
          onValueChange={setQuerSub} 
          trackColor={{ true: colors.primary, false: colors.gray300 }}
          thumbColor={querSub ? colors.white : colors.gray400}
        />
        <Text style={[typography.styles.body, { color: colors.gray700 }]}>
          Adicionar subcategorias?
        </Text>
      </View>

      {querSub && (
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={[typography.styles.label, { marginBottom: spacing.sm }]}>
            Subcategorias
          </Text>
          
          <View style={[components.row, { gap: spacing.sm, marginBottom: spacing.md }]}>
            <TextInput 
              style={[components.input, { flex: 1 }]}
              value={inputSub} 
              onChangeText={setInputSub} 
              placeholder="Ex: Aluguel, Condomínio..." 
              placeholderTextColor={colors.gray400}
            />
            <TouchableOpacity 
              style={[components.buttonPrimary, components.buttonSmall, { paddingHorizontal: spacing.md }]}
              onPress={() => {
                if(inputSub.trim()){
                  setListaSubs([...listaSubs, inputSub.trim()]);
                  setInputSub('');
                }
              }}
            >
              <Ionicons name="add" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>

          {listaSubs.length > 0 && (
            <View style={[components.card, { backgroundColor: colors.gray50, padding: spacing.md }]}>
              <Text style={[typography.styles.caption, { marginBottom: spacing.sm, color: colors.gray600 }]}>
                {listaSubs.length} subcategoria{listaSubs.length > 1 ? 's' : ''} adicionada{listaSubs.length > 1 ? 's' : ''}:
              </Text>
              {listaSubs.map((item, idx) => (
                <View key={idx} style={[components.row, { 
                  backgroundColor: colors.white, 
                  padding: spacing.sm, 
                  borderRadius: 6, 
                  marginBottom: spacing.xs,
                  borderWidth: 1,
                  borderColor: colors.gray200,
                }]}>
                  <Text style={[typography.styles.bodySmall, { flex: 1, color: colors.gray700 }]}>
                    • {item}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setListaSubs(listaSubs.filter((_, i) => i !== idx))}
                    style={{ padding: spacing.xs }}
                  >
                    <Ionicons name="close-circle" size={18} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      <TouchableOpacity 
        style={[
          components.buttonPrimary, 
          carregando && components.loading,
          !nomeCat.trim() && components.disabled
        ]} 
        onPress={handleSalvarTudo} 
        disabled={carregando || !nomeCat.trim()}
      >
        {carregando ? (
          <>
            <ActivityIndicator color={colors.white} size="small" />
            <Text style={[typography.styles.button, { color: colors.white }]}>
              Salvando...
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="save-outline" size={20} color={colors.white} />
            <Text style={[typography.styles.button, { color: colors.white }]}>
              Salvar Categoria
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}