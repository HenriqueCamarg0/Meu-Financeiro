import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import FormBasico from "./FormBasico";
import FormSelecao from "./FormSelecao";
import FormDivisao from "./FormDivisao";
import ResumoNotaFiscal from "./PurchaseSummary";
import { saidaService } from "../../services/exitService";

export default function ExitRegistration() {
  const [etapa, setEtapa] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [dadosCompra, setDadosCompra] = useState({
    descricao: "",
    nomeCompleto: "Ricardo Alves Roberto",
    usuarioId: "5d6471c3-8ec5-bec3-9f47-5ec5a0cb9c73",
    valorTotal: 0,
    isParcelado: false,
    valorParcela: 0,
    qtdParcelas: 1,
    data: new Date().toISOString().split("T")[0], // Padrão YYYY-MM-DD para API
    categoriaId: 0,
    categoriaNome: "",
    subcategoriaId: 0,
    subcategoriaNome: "",
    metodoPagamento: "Dinheiro",
    cartaoId: null,
    cartaoNome: "",
    digitosCartao: "",
    isDividido: false,
    divisao: [] as any[],
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

  // FUNÇÃO DE ENVIO PARA O BANCO (API)
 const finalizarRegistro = async () => {
  setEnviando(true);
  try {
    const formatarDataParaAPI = (dataBr: string) => {
      const partes = dataBr.split('/');
      return partes.length === 3 ? `${partes[2]}-${partes[1]}-${partes[0]}` : dataBr;
    };

    const dataFormatada = formatarDataParaAPI(dadosCompra.data);

    // AJUSTE AQUI: Se não for dividido, enviamos o próprio usuário no array
    const listaDivisao = dadosCompra.isDividido && dadosCompra.divisao.length > 0
      ? dadosCompra.divisao.map(d => ({
          usuarioId: d.id, 
          valor: Number(typeof d.valor === 'string' ? d.valor.replace(',', '.') : d.valor)
        }))
      : [
          {
            usuarioId: dadosCompra.usuarioId, // O ID do Ricardo ou do usuário selecionado na Etapa 1
            valor: Number(dadosCompra.isParcelado ? dadosCompra.valorParcela : dadosCompra.valorTotal)
          }
        ];

    const payload = {
      descricao: dadosCompra.descricao.trim() || "Saída sem descrição",
      divisionValues: listaDivisao, // Nunca vai vazio agora
      categoriaId: Number(dadosCompra.categoriaId), 
      subcategoriaId: Number(dadosCompra.subcategoriaId),
      valorTotal: Number(dadosCompra.valorTotal),
      valorParcela: Number(dadosCompra.valorParcela),
      parcelas: Number(dadosCompra.qtdParcelas),
      dataCompra: dataFormatada,
      formaPagamento: {
        tipo: dadosCompra.metodoPagamento,
        cartaoId: (dadosCompra.metodoPagamento === "Cartão de Crédito" && dadosCompra.cartaoId) 
                  ? dadosCompra.cartaoId 
                  : null,
        fatura: "ABERTA",
        dataVencimento: dataFormatada 
      }
    };

    console.log("Payload Tentativa Final:", JSON.stringify(payload, null, 2));

    await saidaService.salvar(payload);
    
    Alert.alert("Sucesso", "Saída registrada com sucesso!");
    setModalVisible(false);
  } catch (error: any) {
    console.error("ERRO COMPLETO API:", error.response?.data);
    const msg = error.response?.data?.mensagem || "Erro no processamento do servidor.";
    Alert.alert("Erro", msg);
  } finally {
    setEnviando(false);
  }
};

// FUNÇÃO DE AVANÇO DE ETAPA
  const proximaEtapa = () => {
    if (etapa < 3) setEtapa(etapa + 1);
    else setModalVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <View style={styles.cardCentral}>
        <Text style={styles.title}>↓ Adicionar Saída</Text>
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
                data: d.data, // FormSelecao deve enviar YYYY-MM-DD
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

        <TouchableOpacity style={styles.buttonPrincipal} onPress={proximaEtapa}>
          <Text style={styles.buttonText}>
            {etapa === 3 ? "Revisar" : "Próximo"}
          </Text>
        </TouchableOpacity>
      </View>

      <ResumoNotaFiscal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={finalizarRegistro} // Agora chama a função de salvar
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
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { paddingBottom: 40 },
  cardCentral: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 5,
  },
  stepText: { textAlign: "center", color: "#7f8c8d", marginBottom: 20 },
  buttonPrincipal: {
    backgroundColor: "#e67e22",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
