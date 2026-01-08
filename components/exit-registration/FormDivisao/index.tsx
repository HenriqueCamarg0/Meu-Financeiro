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
    if (!divisoes.find((d) => d.id === user.id)) {
      setDivisoes([
        ...divisoes,
        { 
          id: user.id, 
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
            <Ionicons name="people" size={20} color="#8b5cf6" />
            <Text style={{ marginLeft: 8, fontWeight: "bold", color: "#8b5cf6" }}>
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
                  <Ionicons name="close-circle" size={22} color="#ef4444" />
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
              !isValido && divisoes.length > 0 && { borderColor: "#ef4444", borderWidth: 1.5 },
            ]}
          >
            <Text style={styles.totalLabel}>Total das divisões:</Text>
            <Text style={[styles.totalValue, !isValido && divisoes.length > 0 && { color: "#ef4444" }]}>
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
              keyExtractor={(item) => item.id} // Corrigido para id
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
  label: { fontSize: 13, fontWeight: "bold", color: "#555" },
  radioGroup: { flexDirection: "row", gap: 20, marginTop: 10 },
  radioButton: { flexDirection: "row", alignItems: "center" },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#8b5cf6",
    marginRight: 8,
  },
  checked: { backgroundColor: "#8b5cf6" },
  radioText: { fontSize: 14, color: "#4b5563" },
  alvoBox: {
    backgroundColor: "#f3f0ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  alvoText: { fontSize: 13, color: "#7c3aed", fontWeight: "bold" },
  btnSelect: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: "#8b5cf6",
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderStyle: 'dashed'
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' },
  userName: { fontWeight: "bold", fontSize: 14, color: '#1f2937' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#8b5cf6",
    padding: 8,
    fontSize: 18,
    marginTop: 5,
    color: '#1f2937',
    fontWeight: '500'
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  totalLabel: { color: '#6b7280', fontSize: 13 },
  totalValue: { fontWeight: "bold", fontSize: 15, color: '#111827' },
  errorText: { color: '#ef4444', fontSize: 11, marginTop: 5, textAlign: 'right', fontWeight: '500' },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 25,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#111827', textAlign: 'center' },
  item: { padding: 18, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  itemText: { fontSize: 15, color: '#374151' },
  btnFechar: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
  },
  btnFecharText: { color: '#6b7280', fontWeight: '600' }
});