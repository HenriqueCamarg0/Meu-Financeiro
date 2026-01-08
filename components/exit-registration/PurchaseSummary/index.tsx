import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator, 
} from "react-native";

interface ResumoProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean; // Adicionado para resolver o erro ts(2322)
  dados: {
    descricao: string;
    nomeCompleto: string; 
    valorTotal: number;
    isParcelado: boolean;
    qtdParcelas: number;
    valorParcela: number;
    data: string; 
    categoria: string;
    subcategoria: string;
    metodoPagamento: string;
    nomeCartao?: string; 
    digitosCartao?: string; 
  };
}

export default function ResumoNotaFiscal({
  visible,
  onClose,
  onConfirm,
  loading,
  dados,
}: ResumoProps) {
  
  // Função de segurança para formatar moeda
  const formatarMoeda = (valor: number | undefined) => {
    if (valor === undefined || valor === null) return "R$ 0,00";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.cupom}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titulo}>*** NOTA FISCAL DE SAÍDA ***</Text>
            <Text style={styles.tracejado}>
              --------------------------------------------------
            </Text>

            <View style={styles.section}>
              <Text style={styles.resumoLabel}>
                DESCRIÇÃO:{" "}
                <Text style={styles.resumoBold}>
                  {dados.descricao || "Não informada"}
                </Text>
              </Text>
              <Text style={styles.resumoLabel}>
                DATA:{" "}
                <Text style={styles.resumoBold}>
                  {dados.data || "00/00/0000"}
                </Text>
              </Text>
              <Text style={styles.resumoLabel}>
                RESPONSÁVEL:{" "}
                <Text style={styles.resumoBold}>
                  {dados.nomeCompleto || "Não selecionado"}
                </Text>
              </Text>
            </View>

            <Text style={styles.tracejado}>
              --------------------------------------------------
            </Text>

            <View style={styles.section}>
              <Text style={styles.resumoLabel}>
                CATEGORIA:{" "}
                <Text style={styles.resumoBold}>
                  {dados.categoria} / {dados.subcategoria}
                </Text>
              </Text>
              <Text style={styles.resumoLabel}>
                PAGAMENTO:{" "}
                <Text style={styles.resumoBold}>{dados.metodoPagamento}</Text>
              </Text>
              {dados.nomeCartao ? (
                <Text style={styles.resumoLabel}>
                  CARTÃO:{" "}
                  <Text style={styles.resumoBold}>
                    {dados.nomeCartao} {dados.digitosCartao ? `(${dados.digitosCartao})` : ""}
                  </Text>
                </Text>
              ) : null}
              <Text style={styles.resumoLabel}>
                TIPO:{" "}
                <Text style={styles.resumoBold}>
                  {dados.isParcelado ? "Parcelado" : "À Vista"}
                </Text>
              </Text>
              {dados.isParcelado && (
                <Text style={styles.resumoLabel}>
                  DETALHE:{" "}
                  <Text style={styles.resumoBold}>
                    {dados.qtdParcelas}x de {formatarMoeda(dados.valorParcela)}
                  </Text>
                </Text>
              )}
            </View>

            <Text style={styles.tracejado}>
              --------------------------------------------------
            </Text>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL:</Text>
              <Text style={styles.totalValue}>
                {formatarMoeda(dados.valorTotal)}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.btnCorrigir} 
                onPress={onClose}
                disabled={loading} // Bloqueia se estiver enviando
              >
                <Text style={styles.txtCorrigir}>CORRIGIR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btnConfirmar, loading && { opacity: 0.7 }]} 
                onPress={onConfirm}
                disabled={loading} // Bloqueia para evitar cliques duplos
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.txtConfirmar}>CONFIRMAR</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cupom: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    elevation: 10,
  },
  titulo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  tracejado: { color: "#ccc", textAlign: "center", marginVertical: 5 },
  section: { marginVertical: 10 },
  resumoLabel: { fontSize: 14, color: "#555", marginBottom: 5 },
  resumoBold: { fontWeight: "bold", color: "#000" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#8b5cf6" }, // Cor alterada para o padrão roxo do app
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    gap: 10,
  },
  btnCorrigir: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    borderRadius: 8,
  },
  btnConfirmar: {
    flex: 1,
    padding: 15,
    backgroundColor: "#8b5cf6", // Cor alterada para o padrão roxo do app
    alignItems: "center",
    borderRadius: 8,
    minHeight: 50,
    justifyContent: 'center'
  },
  txtCorrigir: { fontWeight: "bold", color: "#666" },
  txtConfirmar: { fontWeight: "bold", color: "#FFF" },
});