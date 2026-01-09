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
import { colors, typography, spacing } from "../../../utils/designSystem";

interface ResumoProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
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
                <Text style={styles.resumoBold}>{dados.descricao || "Não informada"}</Text>
              </Text>
              <Text style={styles.resumoLabel}>
                DATA:{" "}
                <Text style={styles.resumoBold}>{dados.data || "00/00/0000"}</Text>
              </Text>
              <Text style={styles.resumoLabel}>
                RESPONSÁVEL:{" "}
                <Text style={styles.resumoBold}>{dados.nomeCompleto || "Não selecionado"}</Text>
              </Text>
            </View>

            <Text style={styles.tracejado}>
              --------------------------------------------------
            </Text>

            <View style={styles.section}>
              <Text style={styles.resumoLabel}>
                CATEGORIA:{" "}
                <Text style={styles.resumoBold}>{dados.categoria} / {dados.subcategoria}</Text>
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
                <Text style={styles.resumoBold}>{dados.isParcelado ? "Parcelado" : "À Vista"}</Text>
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
              <Text style={styles.totalValue}>{formatarMoeda(dados.valorTotal)}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.btnCorrigir} 
                onPress={onClose}
                disabled={loading}
              >
                <Text style={styles.txtCorrigir}>CORRIGIR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btnConfirmar, loading && { opacity: 0.7 }]} 
                onPress={onConfirm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} size="small" />
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
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: "center", alignItems: "center", padding: spacing.xl },
  cupom: { backgroundColor: colors.surface, width: "100%", padding: spacing.xl, borderRadius: 8, elevation: 10 },
  titulo: { textAlign: "center", fontWeight: typography.weights.bold, fontSize: typography.sizes.base, color: colors.text },
  tracejado: { color: colors.gray300, textAlign: "center", marginVertical: 5 },
  section: { marginVertical: spacing.md },
  resumoLabel: { 
    fontSize: typography.sizes.sm, 
    color: colors.textSecondary, 
    marginBottom: 5,
  },
  resumoBold: { fontWeight: typography.weights.bold, color: colors.text },
  totalRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: spacing.lg,
  },
  totalLabel: { 
    fontSize: typography.sizes.lg, 
    fontWeight: typography.weights.bold,
  },
  totalValue: { 
    fontSize: typography.sizes.xl, 
    fontWeight: typography.weights.bold, 
    color: colors.primary,
  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: spacing['2xl'], 
    gap: spacing.md,
  },
  btnCorrigir: { 
    flex: 1, 
    padding: spacing.lg, 
    borderWidth: 1, 
    borderColor: colors.gray300, 
    alignItems: "center", 
    borderRadius: 8,
  },
  btnConfirmar: { 
    flex: 1, 
    padding: spacing.lg, 
    backgroundColor: colors.primary, 
    alignItems: "center", 
    borderRadius: 8, 
    minHeight: 50, 
    justifyContent: 'center',
  },
  txtCorrigir: { fontWeight: typography.weights.bold, color: colors.textSecondary },
  txtConfirmar: { fontWeight: typography.weights.bold, color: colors.white },
});