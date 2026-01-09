import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { saidaService } from '../../services/exitService';
import { montarMesAnoFiltro, MESES } from '../../utils/constants';
import { formatarMoeda } from '../../utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../utils/designSystem';

export default function ListExits() {
  const [loading, setLoading] = useState(true);
  const [transacoes, setTransacoes] = useState([]);
  
  // Controle de Navegação de Data
  const [dataFiltro, setDataFiltro] = useState(new Date());

  // Cálculo do Total das Transações
  const totalMensal = useMemo(() => {
    return transacoes.reduce((acc, item) => acc + (item.valor || 0), 0);
  }, [transacoes]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      // Gera o filtro ex: "Janeiro/2026"
      const filtro = montarMesAnoFiltro(dataFiltro.getMonth(), dataFiltro.getFullYear());
      const dados = await saidaService.buscarPorMes(filtro);
      setTransacoes(dados);
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [dataFiltro]); // Recarrega sempre que o usuário mudar o mês

  const mudarMes = (direcao: number) => {
    const novaData = new Date(dataFiltro);
    novaData.setMonth(dataFiltro.getMonth() + direcao);
    setDataFiltro(novaData);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Seletor de Meses Superior */}
      <View style={styles.headerMes}>
        <TouchableOpacity onPress={() => mudarMes(-1)}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.textoMes}>
          {MESES[dataFiltro.getMonth()]} / {dataFiltro.getFullYear()}
        </Text>

        <TouchableOpacity onPress={() => mudarMes(1)}>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Resumo do Total do Mês Selecionado */}
      <View style={styles.cardTotal}>
        <Text style={styles.labelTotal}>Total de Saídas no Mês</Text>
        <Text style={styles.valorTotal}>{formatarMoeda(totalMensal)}</Text>
      </View>

      <FlatList
        data={transacoes}
        keyExtractor={(item, index) => `${item.faturaId || item.debitoPixOutrosId}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <View style={{ flex: 1 }}>
              <Text style={styles.descricao}>{item.descricao || "Sem título"}</Text>
              <Text style={styles.categoria}>{item.categoria?.nome || "Geral"}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.valorItem}>{formatarMoeda(item.valor)}</Text>
              <Text style={styles.parcela}>
                {item.parcela}/{item.totalParcelas || 1}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="alert-circle-outline" size={40} color={colors.gray300} />
            <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Nenhuma transação neste mês.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  textoMes: { 
    ...typography.styles.h4,
    color: colors.text,
  },
  cardTotal: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: 15,
    alignItems: 'center',
  },
  labelTotal: { 
    color: colors.white + '80', 
    fontSize: typography.sizes.sm,
  },
  valorTotal: { 
    color: colors.white, 
    fontSize: typography.sizes['3xl'], 
    fontWeight: typography.weights.bold,
  },
  itemLista: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
  },
  descricao: { 
    ...typography.styles.body,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  categoria: { 
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  valorItem: { 
    ...typography.styles.body,
    fontWeight: typography.weights.bold,
    color: colors.error,
  },
  parcela: { 
    fontSize: typography.sizes.xs,
    color: colors.textLight,
  },
});