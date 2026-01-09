import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { userService, Usuario } from "../../../services/userService";
import { colors, typography, spacing } from "../../../utils/designSystem";

interface FormDivisaoProps {
  isParcelado: boolean;
  valorTotal: number;
  valorParcela: number;
  onDataChange: (dados: any) => void;
}

export default function FormDivisao({
  isParcelado,
  valorTotal,
  valorParcela,
  onDataChange,
}: FormDivisaoProps) {
  const [isDividir, setIsDividir] = useState(false);
  const [usuariosAPI, setUsuariosAPI] = useState<Usuario[]>([]);
  const [divisoes, setDivisoes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Define o alvo da soma baseado na regra de negócio
  const valorAlvo = isParcelado ? valorParcela : valorTotal;

  useEffect(() => {
    async function load() {
      try {
        // Atualizado para usar o método paginado do seu userService
        const dados = await userService.listarPaginado(0, 100); 
        setUsuariosAPI(dados.filter((u: Usuario) => u.ativo));
      } catch (error) {
        console.error("Erro ao carregar usuários para divisão:", error);
      }
    }
    load();
  }, []);

  const adicionarUsuario = (user: Usuario) => {
    // Corrigido de userId para id
    if (!divisoes.find((d) => d.id === user.userId)) {
      setDivisoes([
        ...divisoes,
        { 
          id: user.userId, 
          nome: `${user.nome} ${user.sobrenome}`, // Corrigido para compor o nome
          valor: "0,00" 
        },
      ]);
    }
    setModalVisible(false);
  };

  const atualizarValor = (id: string, texto: string) => {
    const novas = divisoes.map((d) => {
      if (d.id === id) { // Corrigido para id
        let v = texto.replace(/\D/g, "");
        v = (Number(v) / 100).toFixed(2).replace(".", ",");
        return { ...d, valor: v };
      }
      return d;
    });
    setDivisoes(novas);
  };

  const totalSoma = divisoes.reduce(
    (acc, item) => acc + (Number(item.valor.replace(",", ".")) || 0),
    0
  );
  const isValido = Math.abs(totalSoma - valorAlvo) < 0.01;

  useEffect(() => {
    onDataChange?.({
      isDividido: isDividir,
      usuariosDivididos: divisoes
    });
  }, [isDividir, divisoes]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dividir a Conta?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsDividir(false)}
        >
          <View style={[styles.circle, !isDividir && styles.checked]} />
          <Text style={styles.radioText}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsDividir(true)}
        >
          <View style={[styles.circle, isDividir && styles.checked]} />
          <Text style={styles.radioText}>Sim</Text>
        </TouchableOpacity>
      </View>

      {isDividir && (
        <View style={{ marginTop: 15 }}>
          <View style={styles.alvoBox}>
            <Text style={styles.alvoText}>
              Dividir valor de: R${" "}
              {valorAlvo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btnSelect}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="people" size={20} color={colors.primary} />
            <Text style={{ marginLeft: 8, fontWeight: "bold", color: colors.primary }}>
              Selecionar Usuários
            </Text>
          </TouchableOpacity>

          {divisoes.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.userName}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setDivisoes(
                      divisoes.filter((d) => d.id !== item.id)
                    )
                  }
                >
                  <Ionicons name="close-circle" size={22} color={colors.error} />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                value={item.valor}
                keyboardType="numeric"
                onChangeText={(t) => atualizarValor(item.id, t)}
              />
            </View>
          ))}

          <View
            style={[
              styles.totalRow,
              !isValido && divisoes.length > 0 && { borderColor: colors.error, borderWidth: 1.5 },
            ]}
          >
            <Text style={styles.totalLabel}>Total das divisões:</Text>
            <Text style={[styles.totalValue, !isValido && divisoes.length > 0 && { color: colors.error }]}>
              R${" "}
              {totalSoma.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Text>
          </View>
          {!isValido && divisoes.length > 0 && (
            <Text style={styles.errorText}>A soma deve ser igual a R$ {valorAlvo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
          )}
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Usuário</Text>
            <FlatList
              data={usuariosAPI}
              keyExtractor={(item) => item.userId} // Corrigido para id
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => adicionarUsuario(item)}
                >
                  <Text style={styles.itemText}>{item.nome} {item.sobrenome}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.btnFechar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnFecharText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  label: { 
    fontSize: typography.sizes.sm, 
    fontWeight: typography.weights.bold, 
    color: colors.text,
  },
  radioGroup: { flexDirection: "row", gap: spacing.xl, marginTop: spacing.md },
  radioButton: { flexDirection: "row", alignItems: "center" },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.sm,
  },
  checked: { backgroundColor: colors.primary },
  radioText: { 
    fontSize: typography.sizes.sm, 
    color: colors.textSecondary,
  },
  alvoBox: {
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  alvoText: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bold },
  btnSelect: {
    flexDirection: "row",
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderStyle: 'dashed'
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' },
  userName: { fontWeight: typography.weights.bold, fontSize: typography.sizes.sm, color: colors.text },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    padding: spacing.sm,
    fontSize: typography.sizes.xl,
    marginTop: 5,
    color: colors.text,
    fontWeight: typography.weights.medium
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  totalLabel: { color: colors.textSecondary, fontSize: 13 },
  totalValue: { fontWeight: typography.weights.bold, fontSize: typography.sizes.lg, color: colors.text },
  errorText: { color: colors.error, fontSize: 11, marginTop: 5, textAlign: 'right', fontWeight: typography.weights.medium },
  modal: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    padding: 25,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.lg, color: colors.text, textAlign: 'center' },
  item: { padding: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  itemText: { fontSize: typography.sizes.lg, color: colors.text },
  btnFechar: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    alignItems: "center",
    backgroundColor: colors.gray100,
    borderRadius: 12,
  },
  btnFecharText: { color: colors.textSecondary, fontWeight: typography.weights.semibold }
});