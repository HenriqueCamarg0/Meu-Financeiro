import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import FormInfo from './FormInfo';
import FormVencimento from './FormVencimento';
import CardList from './CardList';
import { cartaoService, Cartao } from '../../services/cartoesService';
import { colors, spacing, typography } from '../../utils/designSystem';

export default function CardRegistration() {
  // Estados para controle de navegação e dados
  const [etapa, setEtapa] = useState(0); // 0: Lista, 1: Info Básica, 2: Vencimento
  const [loading, setLoading] = useState(false);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [dadosCartao, setDadosCartao] = useState({
    nomeCartao: '',
    digitosCartao: '',
    diaVencimento: ''
  });

  // 1. Carregar lista de cartões da API
  const carregarCartoes = async () => {
    setLoading(true);
    try {
      const lista = await cartaoService.listarTodos();
      setCartoes(lista);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar seus cartões.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCartoes();
  }, []);

  // 2. Atualizar estado local do formulário
  const atualizarDados = (novosDados: any) => {
    setDadosCartao(prev => ({ ...prev, ...novosDados }));
  };

  // 3. Lógica de Alterar Status com Confirmação
  const alternarStatusCartao = async (id: string, novoStatus: boolean) => {
    let cartaoAtual: Cartao | undefined;
    
    try {
      setLoading(true);
      
      // Busca o cartão no estado atual para pegar todos os dados necessários
      cartaoAtual = cartoes.find(c => c.cartaoId === id);
      
      if (!cartaoAtual) {
        Alert.alert("Erro", "Cartão não encontrado.");
        return;
      }
      
      // Chama a API para atualizar no banco de dados (envia todos os campos)
      await cartaoService.alternarStatus(cartaoAtual, novoStatus);
      
      // Atualiza o estado local após sucesso na API
      setCartoes(prev => prev.map(c => 
        c.cartaoId === id ? { ...c, ativo: novoStatus } : c
      ));

      Alert.alert("Sucesso", "Status do cartão atualizado!");
      
      // Recarrega a lista para garantir sincronização com o banco
      await carregarCartoes();
    } catch (error: any) {
      // Reverte a mudança no estado local em caso de erro
      await carregarCartoes();
      
      // Log detalhado do erro para debug
      if (__DEV__) {
        console.error("Erro ao atualizar status do cartão:", {
          error,
          response: error?.response?.data,
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          cartaoAtual: cartaoAtual,
          id,
          novoStatus
        });
      }
      
      // Mensagem de erro mais detalhada
      let mensagemErro = "Falha ao comunicar com o servidor.";
      if (error?.response?.status === 500) {
        const errorDetails = error?.response?.data;
        mensagemErro = `Erro interno do servidor (500). ${errorDetails?.message || 'Verifique se todos os dados do cartão estão corretos.'}`;
      } else if (error?.response?.data?.message) {
        mensagemErro = error.response.data.message;
      } else if (error?.message) {
        mensagemErro = error.message;
      }
      
      Alert.alert("Erro", mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  // 4. Finalizar Cadastro (POST para API)
  const finalizarCadastro = async () => {
    if (!dadosCartao.nomeCartao || !dadosCartao.digitosCartao || !dadosCartao.diaVencimento) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await cartaoService.cadastrar({
        nomeCartao: dadosCartao.nomeCartao,
        digitosCartao: dadosCartao.digitosCartao,
        diaVencimento: Number(dadosCartao.diaVencimento), // Converte para Number exigido pela API
        ativo: true
      });

      Alert.alert("Sucesso", "Cartão cadastrado!");
      
      // Reseta tudo e volta para a lista
      setDadosCartao({ nomeCartao: '', digitosCartao: '', diaVencimento: '' });
      setEtapa(0); 
      await carregarCartoes();
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar cartão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardCentral}>
          <Text style={styles.title}>Meus Cartões</Text>

          {/* EXIBIÇÃO DA LISTA (Etapa 0) */}
          {etapa === 0 && (
            <>
              {loading && cartoes.length === 0 ? (
                <ActivityIndicator size="large" color={colors.secondary} style={{ marginVertical: spacing.xl }} />
              ) : (
                <CardList cartoes={cartoes} onToggleStatus={alternarStatusCartao} />
              )}
              
              <TouchableOpacity 
                style={styles.btnNovo} 
                onPress={() => setEtapa(1)}
              >
                <Text style={styles.txtNovo}>+ ADICIONAR NOVO CARTÃO</Text>
              </TouchableOpacity>
            </>
          )}

          {/* FORMULÁRIO - ETAPA 1 */}
          {etapa === 1 && (
            <FormInfo onDataChange={atualizarDados} valores={dadosCartao} />
          )}

          {/* FORMULÁRIO - ETAPA 2 */}
          {etapa === 2 && (
            <FormVencimento onDataChange={atualizarDados} valores={dadosCartao} />
          )}

          {/* BOTÕES DE NAVEGAÇÃO DO FORMULÁRIO */}
          {etapa > 0 && (
            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.btnVoltar} 
                onPress={() => setEtapa(etapa - 1)}
              >
                <Text style={styles.txtVoltar}>Voltar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.btnProximo} 
                onPress={() => etapa === 1 ? setEtapa(2) : finalizarCadastro()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.txtProximo}>
                    {etapa === 2 ? 'Finalizar Cadastro' : 'Próximo'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: { paddingBottom: spacing['2xl'] },
  cardCentral: { 
    backgroundColor: colors.surface, 
    borderRadius: 15, 
    padding: spacing.xl,
    minHeight: 300 
  },
  title: { 
    fontSize: typography.sizes.xl, 
    fontWeight: typography.weights.bold, 
    color: colors.text, 
    marginBottom: spacing.xl, 
    textAlign: 'center' 
  },
  btnNovo: { 
    backgroundColor: colors.secondary, 
    padding: spacing.lg, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: spacing.xl,
    elevation: 2
  },
  txtNovo: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.sm },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: spacing['2xl'], 
    gap: spacing.md 
  },
  btnVoltar: { 
    flex: 1, 
    padding: spacing.lg, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: colors.gray300, 
    alignItems: 'center' 
  },
  btnProximo: { 
    flex: 2, 
    padding: spacing.lg, 
    borderRadius: 10, 
    backgroundColor: colors.secondary, 
    alignItems: 'center',
    elevation: 2
  },
  txtVoltar: { color: colors.textSecondary, fontWeight: typography.weights.bold },
  txtProximo: { color: colors.white, fontWeight: typography.weights.bold }
});