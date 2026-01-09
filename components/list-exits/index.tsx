import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { saidaService } from '../../services/exitService';
import { montarMesAnoFiltro, MESES } from '../../utils/constants';
import { formatarMoeda } from '../../utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../utils/designSystem';

export default function ListExits() {
  const [loading, setLoading] = useState(true);
  const [transacoes, setTransacoes] = useState([]);
  const [transacoesFiltradas, setTransacoesFiltradas] = useState([]);
  
  // Controle de Navegação de Data
  const [dataFiltro, setDataFiltro] = useState(new Date());
  
  // Controles de Filtro
  const [filtroModalVisible, setFiltroModalVisible] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroCartao, setFiltroCartao] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [cartoes, setCartoes] = useState([]);

  // Cálculo do Total das Transações Filtradas
  const totalMensal = useMemo(() => {
    return transacoesFiltradas.reduce((acc, item) => acc + (item.valor || 0), 0);
  }, [transacoesFiltradas]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const filtro = montarMesAnoFiltro(dataFiltro.getMonth(), dataFiltro.getFullYear());
      const dados = await saidaService.buscarPorMes(filtro);
      setTransacoes(dados);
      
      // Extrair categorias e cartões únicos para os filtros
      const categoriasUnicas = [...new Set(dados.map(t => t.categoria?.nome).filter(Boolean))];
      const cartoesUnicos = [...new Set(dados.map(t => t.cartao?.nome).filter(Boolean))];
      
      setCategorias(categoriasUnicas);
      setCartoes(cartoesUnicos);
      
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    let dadosFiltrados = [...transacoes];
    
    if (filtroCategoria) {
      dadosFiltrados = dadosFiltrados.filter(t => t.categoria?.nome === filtroCategoria);
    }
    
    if (filtroCartao) {
      dadosFiltrados = dadosFiltrados.filter(t => t.cartao?.nome === filtroCartao);
    }
    
    setTransacoesFiltradas(dadosFiltrados);
  }, [transacoes, filtroCategoria, filtroCartao]);

  useEffect(() => {
    carregarDados();
  }, [dataFiltro]);

  const mudarMes = (direcao: number) => {
    const novaData = new Date(dataFiltro);
    novaData.setMonth(dataFiltro.getMonth() + direcao);
    setDataFiltro(novaData);
  };

  const limparFiltros = () => {
    setFiltroCategoria('');
    setFiltroCartao('');
    setFiltroModalVisible(false);
  };

  const aplicarFiltros = () => {
    setFiltroModalVisible(false);
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

      {/* Barra de Filtros */}
      <View style={styles.filtrosContainer}>
        <TouchableOpacity 
          style={styles.botaoFiltro} 
          onPress={() => setFiltroModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={20} color={colors.primary} />
          <Text style={styles.textoFiltro}>Filtros</Text>
          {(filtroCategoria || filtroCartao) && <View style={styles.indicadorFiltro} />}
        </TouchableOpacity>

        {(filtroCategoria || filtroCartao) && (
          <TouchableOpacity style={styles.botaoLimpar} onPress={limparFiltros}>
            <Text style={styles.textoLimpar}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros Ativos */}
      {(filtroCategoria || filtroCartao) && (
        <View style={styles.filtrosAtivos}>
          {filtroCategoria && (
            <View style={styles.chipFiltro}>
              <Text style={styles.textoChip}>📂 {filtroCategoria}</Text>
              <TouchableOpacity onPress={() => setFiltroCategoria('')}>
                <Ionicons name="close" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          {filtroCartao && (
            <View style={styles.chipFiltro}>
              <Text style={styles.textoChip}>💳 {filtroCartao}</Text>
              <TouchableOpacity onPress={() => setFiltroCartao('')}>
                <Ionicons name="close" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Resumo do Total do Mês Selecionado */}
      <View style={styles.cardTotal}>
        <Text style={styles.labelTotal}>
          {(filtroCategoria || filtroCartao) ? 'Total Filtrado' : 'Total de Saídas no Mês'}
        </Text>
        <Text style={styles.valorTotal}>{formatarMoeda(totalMensal)}</Text>
        <Text style={styles.contadorTransacoes}>
          {transacoesFiltradas.length} transação{transacoesFiltradas.length !== 1 ? 'ões' : ''}
        </Text>
      </View>

      <FlatList
        data={transacoesFiltradas}
        keyExtractor={(item, index) => `${item.faturaId || item.debitoPixOutrosId}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <View style={styles.itemIcone}>
              <Ionicons 
                name={item.cartao ? "card-outline" : "cash-outline"} 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.descricao}>{item.descricao || "Sem título"}</Text>
              <View style={styles.detalhesContainer}>
                <Text style={styles.categoria}>📂 {item.categoria?.nome || "Geral"}</Text>
                {item.cartao && (
                  <Text style={styles.cartao}>💳 {item.cartao.nome}</Text>
                )}
              </View>
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
            <Text style={{ color: colors.textSecondary, marginTop: 10 }}>
              {(filtroCategoria || filtroCartao) 
                ? "Nenhuma transação encontrada com os filtros aplicados." 
                : "Nenhuma transação neste mês."
              }
            </Text>
          </View>
        }
      />

      {/* Modal de Filtros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filtroModalVisible}
        onRequestClose={() => setFiltroModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>🔍 Filtrar Transações</Text>
              <TouchableOpacity onPress={() => setFiltroModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.gray400} />
              </TouchableOpacity>
            </View>

            {/* Filtro por Categoria */}
            <View style={styles.secaoFiltro}>
              <Text style={styles.tituloSecao}>📂 Por Categoria</Text>
              <View style={styles.opcoesContainer}>
                <TouchableOpacity 
                  style={[styles.opcaoFiltro, !filtroCategoria && styles.opcaoSelecionada]}
                  onPress={() => setFiltroCategoria('')}
                >
                  <Text style={[styles.textoOpcao, !filtroCategoria && styles.textoSelecionado]}>
                    Todas
                  </Text>
                </TouchableOpacity>
                {categorias.map((categoria) => (
                  <TouchableOpacity 
                    key={categoria}
                    style={[styles.opcaoFiltro, filtroCategoria === categoria && styles.opcaoSelecionada]}
                    onPress={() => setFiltroCategoria(categoria)}
                  >
                    <Text style={[styles.textoOpcao, filtroCategoria === categoria && styles.textoSelecionado]}>
                      {categoria}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Filtro por Cartão */}
            <View style={styles.secaoFiltro}>
              <Text style={styles.tituloSecao}>💳 Por Cartão</Text>
              <View style={styles.opcoesContainer}>
                <TouchableOpacity 
                  style={[styles.opcaoFiltro, !filtroCartao && styles.opcaoSelecionada]}
                  onPress={() => setFiltroCartao('')}
                >
                  <Text style={[styles.textoOpcao, !filtroCartao && styles.textoSelecionado]}>
                    Todos
                  </Text>
                </TouchableOpacity>
                {cartoes.map((cartao) => (
                  <TouchableOpacity 
                    key={cartao}
                    style={[styles.opcaoFiltro, filtroCartao === cartao && styles.opcaoSelecionada]}
                    onPress={() => setFiltroCartao(cartao)}
                  >
                    <Text style={[styles.textoOpcao, filtroCartao === cartao && styles.textoSelecionado]}>
                      {cartao}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.botoesContainer}>
              <TouchableOpacity style={styles.botaoSecundario} onPress={limparFiltros}>
                <Text style={styles.textoBotaoSecundario}>Limpar Tudo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoPrimario} onPress={aplicarFiltros}>
                <Text style={styles.textoBotaoPrimario}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filtrosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  botaoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    elevation: 2,
  },
  textoFiltro: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  indicadorFiltro: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    marginLeft: spacing.xs,
  },
  botaoLimpar: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  textoLimpar: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    fontWeight: typography.weights.medium,
  },
  filtrosAtivos: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexWrap: 'wrap',
  },
  chipFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  textoChip: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    marginRight: spacing.xs,
    fontWeight: typography.weights.medium,
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
  contadorTransacoes: {
    color: colors.white + '60',
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
  itemLista: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
  },
  itemIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  descricao: { 
    ...typography.styles.body,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  detalhesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoria: { 
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  cartao: {
    fontSize: typography.sizes.xs,
    color: colors.secondary,
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
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitulo: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  secaoFiltro: {
    marginBottom: spacing.xl,
  },
  tituloSecao: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  opcoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  opcaoFiltro: {
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  opcaoSelecionada: {
    backgroundColor: colors.primary,
  },
  textoOpcao: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  textoSelecionado: {
    color: colors.white,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  botaoSecundario: {
    flex: 1,
    backgroundColor: colors.gray200,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  textoBotaoSecundario: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.semibold,
  },
  botaoPrimario: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  textoBotaoPrimario: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
});