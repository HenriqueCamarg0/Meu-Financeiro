import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormBasico from "./FormBasico";
import FormSelecao from "./FormSelecao";
import FormDivisao from "./FormDivisao";
import ResumoNotaFiscal from "./PurchaseSummary";
import { saidaService } from "../../services/exitService";
import { colors, typography, spacing, components } from "../../utils/designSystem";

export default function ExitRegistration() {
  const [etapa, setEtapa] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [dadosCompra, setDadosCompra] = useState({
    descricao: "",
    nomeCompleto: "",
    usuarioId: "",
    valorTotal: 0,
    isParcelado: false,
    valorParcela: 0,
    qtdParcelas: 1,
    data: new Date().toISOString().split("T")[0], 
    dataVencimento: "",
    categoriaId: 0,
    categoriaNome: "",
    subcategoriaId: 0,
    subcategoriaNome: "",
    metodoPagamento: "Débito em Conta",
    cartaoId: null,
    cartaoNome: "",
    digitosCartao: "",
    isDividido: false,
    divisao: [] as any[],
    faturaPersonalizada: null,
    tipoFatura: "atual",
    isValid: false,
  });

  const atualizarDados = (novosDados: any) => {
    setDadosCompra((prev) => {
      const mudou = Object.keys(novosDados).some(
        (key) =>
          JSON.stringify(prev[key as keyof typeof prev]) !==
          JSON.stringify(novosDados[key])
      );
      if (!mudou) return prev;
      return { ...prev, ...novosDados };
    });
  };

  const finalizarRegistro = async () => {
    setEnviando(true);
    try {
      const formatarDataParaAPI = (data: string) => {
        if (data.includes('/')) {
          const [dia, mes, ano] = data.split('/');
          return `${ano}-${mes}-${dia}`;
        }
        return data;
      };

      const dataFinal = formatarDataParaAPI(dadosCompra.data);

      // Validação adicional antes do envio
      if (dadosCompra.metodoPagamento === "Débito em Conta" && !dadosCompra.dataVencimento) {
        Alert.alert("Erro", "Data de vencimento é obrigatória para débito em conta.");
        return;
      }

      if (dadosCompra.metodoPagamento === "Cartão de Crédito" && !dadosCompra.cartaoId) {
        Alert.alert("Erro", "Selecione um cartão de crédito.");
        return;
      }

      // 1. Lógica de Divisão: SEMPRE incluir o usuário selecionado
      const listaDivisao = dadosCompra.isDividido && dadosCompra.divisao.length > 0
        ? dadosCompra.divisao.map(d => ({
            usuarioId: String(d.usuarioId || d.id), 
            valor: Number(typeof d.valor === 'string' ? d.valor.replace(',', '.') : d.valor)
          }))
        : [
            // Se não dividido, inclui apenas o usuário selecionado na primeira etapa
            {
              usuarioId: String(dadosCompra.usuarioId),
              valor: Number(dadosCompra.valorTotal)
            }
          ];

      // 2. Gerar Fatura Dinâmica (ex: janeiro/2026) igual ao Web
      const obterFaturaAtual = () => {
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
                       "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const d = new Date();
        return `${meses[d.getMonth()]}/${d.getFullYear()}`;
      };

      console.log("Dados antes do payload:", {
        metodoPagamento: dadosCompra.metodoPagamento,
        cartaoId: dadosCompra.cartaoId,
        dataVencimento: dadosCompra.dataVencimento,
        data: dadosCompra.data,
        isDividido: dadosCompra.isDividido,
        divisao: dadosCompra.divisao,
        usuarioId: dadosCompra.usuarioId,
        valorTotal: dadosCompra.valorTotal,
        nomeCompleto: dadosCompra.nomeCompleto
      });

      // Estrutura específica para débito em conta baseada na imagem
      const formaPagamento = dadosCompra.metodoPagamento === "Débito em Conta" 
        ? {
            tipo: "debito-em-conta",
            dataVencimento: formatarDataParaAPI(dadosCompra.dataVencimento || dadosCompra.data),
            fatura: obterFaturaAtual()
          }
        : dadosCompra.metodoPagamento === "Cartão de Crédito"
        ? {
            tipo: "cartao-credito",
            cartaoId: String(dadosCompra.cartaoId),
            fatura: dadosCompra.faturaPersonalizada || obterFaturaAtual(), // Usa fatura personalizada se disponível
            dataVencimento: dataFinal
          }
        : {
            tipo: "pix",
            fatura: "N/A",
            dataVencimento: dataFinal
          };

      const payload = {
        descricao: dadosCompra.descricao.trim() || "Saída sem descrição",
        divisionValues: listaDivisao,
        categoriaId: String(dadosCompra.categoriaId), 
        subcategoriaId: String(dadosCompra.subcategoriaId),
        valorTotal: Number(dadosCompra.valorTotal),
        valorParcela: Number(dadosCompra.isParcelado ? dadosCompra.valorParcela : dadosCompra.valorTotal),
        parcelas: Number(dadosCompra.isParcelado ? dadosCompra.qtdParcelas : 1),
        dataCompra: dataFinal,
        formaPagamento
      };

      console.log("Enviando Payload Corrigido:", JSON.stringify(payload, null, 2));

      await saidaService.salvar(payload);
      
      Alert.alert("Sucesso", "Saída registrada com sucesso!");
      setModalVisible(false);
      setEtapa(1); 
      
    } catch (error: any) {
      console.error("ERRO API:", error.response?.data || error.message);
      const msg = error.response?.data?.mensagem || "Erro ao processar saída. Verifique os dados.";
      Alert.alert("Erro", msg);
    } finally {
      setEnviando(false);
    }
  };

  const proximaEtapa = () => {
    // Validação antes de avançar
    if (etapa === 1) {
      if (!dadosCompra.descricao.trim() || dadosCompra.valorTotal <= 0) {
        Alert.alert("Atenção", "Preencha a descrição e o valor antes de continuar.");
        return;
      }
    }
    
    if (etapa === 2) {
      if (dadosCompra.categoriaId === 0 || dadosCompra.subcategoriaId === 0) {
        Alert.alert("Atenção", "Selecione categoria e subcategoria antes de continuar.");
        return;
      }
      
      if (dadosCompra.metodoPagamento === "Débito em Conta" && !dadosCompra.dataVencimento) {
        Alert.alert("Atenção", "Para débito em conta, a data de vencimento é obrigatória.");
        return;
      }
      
      if (dadosCompra.metodoPagamento === "Cartão de Crédito" && !dadosCompra.cartaoId) {
        Alert.alert("Atenção", "Selecione um cartão de crédito.");
        return;
      }
    }

    if (etapa < 3) setEtapa(etapa + 1);
    else setModalVisible(true);
  };

  const voltarEtapa = () => {
    if (etapa > 1) setEtapa(etapa - 1);
  };

  const cancelarRegistro = () => {
    Alert.alert(
      "Cancelar Registro",
      "Tem certeza que deseja cancelar? Todos os dados serão perdidos.",
      [
        { text: "Não", style: "cancel" },
        { 
          text: "Sim, Cancelar", 
          style: "destructive",
          onPress: () => {
            // Reset completo
            setEtapa(1);
            setDadosCompra({
              descricao: "",
              nomeCompleto: "",
              usuarioId: "",
              valorTotal: 0,
              isParcelado: false,
              valorParcela: 0,
              qtdParcelas: 1,
              data: new Date().toISOString().split("T")[0], 
              dataVencimento: "",
              categoriaId: 0,
              categoriaNome: "",
              subcategoriaId: 0,
              subcategoriaNome: "",
              metodoPagamento: "Débito em Conta",
              cartaoId: null,
              cartaoNome: "",
              digitosCartao: "",
              isDividido: false,
              divisao: [] as any[],
              faturaPersonalizada: null,
              tipoFatura: "atual",
              isValid: false,
            });
            setModalVisible(false);
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={styles.cardCentral}>
        {/* Header com título e botão cancelar */}
        <View style={styles.header}>
          <Text style={styles.title}>↓ Adicionar Saída</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelarRegistro}>
            <Ionicons name="close" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.stepText}>Etapa {etapa} de 3</Text>

        {etapa === 1 && (
          <FormBasico
            onDataChange={(d: any) =>
              atualizarDados({
                descricao: d.descricao,
                nomeCompleto: d.nomeCompleto,
                usuarioId: d.usuario,
                valorTotal: d.total,
                isParcelado: d.modoParcelado,
                valorParcela: d.parcela,
                qtdParcelas: d.qtdParcelas,
              })
            }
          />
        )}

        {etapa === 2 && (
          <FormSelecao
            onDataChange={(d: any) =>
              atualizarDados({
                categoriaId: d.categoriaId,
                categoriaNome: d.categoriaNome,
                subcategoriaId: d.subcategoriaId,
                subcategoriaNome: d.subcategoriaNome,
                metodoPagamento: d.pagamentoDescricao,
                cartaoId: d.cartaoId,
                cartaoNome: d.cartaoNome,
                digitosCartao: d.digitosCartao,
                data: d.data,
                dataVencimento: d.dataVencimento,
                faturaPersonalizada: d.faturaPersonalizada,
                tipoFatura: d.tipoFatura,
                isValid: d.isValid,
              })
            }
          />
        )}

        {etapa === 3 && (
          <FormDivisao
            isParcelado={dadosCompra.isParcelado}
            valorTotal={dadosCompra.valorTotal}
            valorParcela={dadosCompra.valorParcela}
            onDataChange={(d: any) =>
              atualizarDados({
                isDividido: d.isDividido,
                divisao: d.usuariosDivididos,
              })
            }
          />
        )}

        {/* Botões de navegação */}
        <View style={styles.navigationButtons}>
          {etapa > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={voltarEtapa}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
              <Text style={[styles.backButtonText, { color: colors.white }]}>Voltar</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.buttonPrincipal, etapa === 1 ? styles.buttonFullWidth : styles.buttonHalfWidth]} 
            onPress={proximaEtapa}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              {etapa === 3 ? "Revisar" : "Próximo"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ResumoNotaFiscal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={finalizarRegistro}
        loading={enviando}
        dados={{
          ...dadosCompra,
          categoria: dadosCompra.categoriaNome,
          subcategoria: dadosCompra.subcategoriaNome,
          nomeCartao: dadosCompra.cartaoNome,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 40 },
  cardCentral: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: 15,
    ...components.card,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text,
    flex: 1,
    textAlign: "center",
  },
  cancelButton: {
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  stepText: { 
    textAlign: "center", 
    color: colors.textSecondary, 
    marginBottom: spacing.xl,
    ...typography.styles.bodySmall,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  buttonPrincipal: {
    ...components.buttonSecondary,
    flex: 1,
  },
  buttonFullWidth: {
    flex: 1,
  },
  buttonHalfWidth: {
    flex: 1,
  },
  backButton: {
    backgroundColor: colors.gray400,
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    flex: 1,
  },
  buttonText: { 
    color: colors.white, 
    fontWeight: typography.weights.bold, 
    fontSize: typography.sizes.base,
  },
  backButtonText: { 
    color: colors.white, 
    fontWeight: typography.weights.bold, 
    fontSize: typography.sizes.base,
  },
});