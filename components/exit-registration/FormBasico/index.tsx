import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { userService, Usuario } from "../../../services/userService";

export default function FormBasico({ onDataChange }: { onDataChange: (d: any) => void }) {
  const [descricao, setDescricao] = useState("");
  const [isProprio, setIsProprio] = useState(true);
  const [isParcelado, setIsParcelado] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [valorPrincipal, setValorPrincipal] = useState("");
  const [qtdParcelas, setQtdParcelas] = useState("1");

  // Carregamento inicial da API
  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const dados = await userService.listarPaginado(0, 50);
        
        // Filtra apenas os ativos para exibição no Picker
        const ativos = dados.filter((u: Usuario) => u.ativo === true);
        setUsuarios(ativos);

        if (ativos.length > 0) {
          // Busca o usuário padrão (defaultValue: true) conforme seu LOG
          const padrao = ativos.find((u: Usuario) => u.defaultValue === true);
          
          // Se achou o padrão (Ricardo), usa o userId dele, senão usa o primeiro ativo
          const idFinal = padrao ? padrao.userId : ativos[0].userId;

          // Pequeno delay para sincronização do componente Picker nativo
          setTimeout(() => {
            setUsuarioSelecionado(idFinal);
          }, 150);
        }
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  // Cálculos financeiros (Mantidos)
  const valorDigitado = Number(valorPrincipal.replace(/\D/g, "")) / 100;
  const numParcelas = parseInt(qtdParcelas) || 1;
  const totalGeral = isParcelado ? valorDigitado * numParcelas : valorDigitado;
  const valorDaParcela = isParcelado ? valorDigitado : (valorDigitado / numParcelas || 0);

  // Sincronização com o componente Pai
  useEffect(() => {
    // Busca o usuário na lista carregada usando o campo userId
    const userFound = usuarios.find(u => u.userId === usuarioSelecionado);

    if (userFound) {
      const timer = setTimeout(() => {
        onDataChange?.({
          descricao,
          nomeCompleto: `${userFound.nome} ${userFound.sobrenome}`,
          usuario: userFound.userId, // Envia o userId correto para a API
          modoParcelado: isParcelado,
          total: totalGeral,
          parcela: valorDaParcela,
          qtdParcelas: numParcelas,
          data: new Date().toISOString()
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [descricao, isParcelado, totalGeral, valorDaParcela, usuarioSelecionado, usuarios]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Descrição <Text style={styles.required}>*</Text></Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Supermercado" 
          value={descricao} 
          onChangeText={setDescricao}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Proprietário</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setIsProprio(true)}>
              <View style={[styles.circle, isProprio && styles.checked]} />
              <Text style={styles.radioText}>Minha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioButton} onPress={() => setIsProprio(false)}>
              <View style={[styles.circle, !isProprio && styles.checked]} />
              <Text style={styles.radioText}>Outra</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1.5 }}>
          <Text style={styles.label}>Usuário</Text>
          <View style={[styles.inputContainer, isProprio && styles.inputDisabled]}>
            {loading ? (
              <ActivityIndicator size="small" color="#8b5cf6" />
            ) : (
              <Picker 
                enabled={!isProprio} 
                selectedValue={usuarioSelecionado} 
                onValueChange={(v) => setUsuarioSelecionado(v)} 
                style={styles.picker}
              >
                {usuarios.map((u) => (
                  <Picker.Item 
                    key={u.userId} 
                    label={`${u.nome} ${u.sobrenome}`} 
                    value={u.userId} 
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfColumn}>
          <View style={styles.radioGroupVertical}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setIsParcelado(false)}>
              <View style={[styles.circle, !isParcelado && styles.checked]} />
              <Text style={styles.radioText}>Valor Total</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.radioButton, { marginTop: 15 }]} onPress={() => setIsParcelado(true)}>
              <View style={[styles.circle, isParcelado && styles.checked]} />
              <Text style={styles.radioText}>Valor por parcela</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.halfColumn}>
          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            value={valorPrincipal} 
            onChangeText={(t) => {
              let v = t.replace(/\D/g, "");
              v = (Number(v) / 100).toFixed(2).replace(".", ",");
              setValorPrincipal("R$ " + v);
            }}
            placeholder="R$ 0,00"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfColumn}>
          <Text style={styles.label}>Nº de Parcelas</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            value={qtdParcelas} 
            onChangeText={setQtdParcelas}
            placeholder="1"
          />
        </View>

        <View style={styles.halfColumn}>
          <View style={styles.resumoBox}>
            <Text style={styles.resumoLabel}>Parcela: R$ {(valorDaParcela || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
            <Text style={styles.resumoLabel}>Total: R$ {(totalGeral || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 0 },
  field: { marginBottom: 20 },
  label: { fontSize: 11, color: "#666", marginBottom: 8, fontWeight: '600' },
  required: { color: "#ef4444" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, height: 50, backgroundColor: "#fff", fontSize: 15, color: "#333" },
  inputContainer: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, height: 50, justifyContent: "center", backgroundColor: "#fff" },
  inputDisabled: { backgroundColor: "#f8f8f8", borderColor: "#eee" },
  picker: { width: "120%" }, 
  row: { flexDirection: "row", marginBottom: 15, gap: 12, alignItems: 'flex-end' },
  halfColumn: { flex: 1 },
  radioGroup: { flexDirection: "row", gap: 10, height: 50, alignItems: 'center' },
  radioGroupVertical: { justifyContent: "center", height: 50 },
  radioButton: { flexDirection: "row", alignItems: "center" },
  circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#8b5cf6", marginRight: 8 },
  checked: { backgroundColor: "#8b5cf6" },
  radioText: { fontSize: 13, color: "#4b5563" },
  resumoBox: { backgroundColor: "#fefce8", padding: 10, borderRadius: 12, borderWidth: 1, borderColor: "#fef08a", justifyContent: 'center', height: 50 },
  resumoLabel: { fontSize: 11, color: "#854d0e", fontWeight: "600" }
});