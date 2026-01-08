import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categoriaService, Categoria } from "../../../services/categoriaService";
import { cartaoService, Cartao } from "../../../services/cartoesService";

export default function FormSelecao({ onDataChange }: any) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [catId, setCatId] = useState<number>(0);
  const [subId, setSubId] = useState<number>(0);
  const [metodo, setMetodo] = useState("Dinheiro");
  const [cartaoId, setCartaoId] = useState("");
  const [dataCompra, setDataCompra] = useState(new Date().toLocaleDateString('pt-BR'));

  useEffect(() => {
    async function carregar() {
      const [cats, cards] = await Promise.all([categoriaService.listarTodas(), cartaoService.listarTodos()]);
      setCategorias(cats);
      setCartoes(cards);
    }
    carregar();
  }, []);

useEffect(() => {
  const cObj = categorias.find(c => c.id === catId);
  const sObj = cObj?.subcategorias.find(s => s.id === subId);
  const cardObj = cartoes.find(c => c.cartaoId === cartaoId);

  onDataChange?.({
    categoriaId: catId,             // ADICIONADO: Enviando o ID numérico
    categoriaNome: cObj?.nome || "",
    subcategoriaId: subId,          // ADICIONADO: Enviando o ID numérico
    subcategoriaNome: sObj?.nome || "",
    pagamentoDescricao: metodo,
    cartaoId: cartaoId,             // ADICIONADO: Enviando o UUID do cartão
    cartaoNome: cardObj?.nomeCartao || "",
    digitosCartao: cardObj?.digitosCartao || "",
    data: dataCompra
  });
}, [catId, subId, metodo, cartaoId, dataCompra, categorias, cartoes]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Data da Compra</Text>
        <TextInput style={styles.input} value={dataCompra} onChangeText={setDataCompra} placeholder="DD/MM/AAAA" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={catId} onValueChange={(v) => setCatId(v)}>
            <Picker.Item label="Selecione..." value={0} />
            {categorias.map(c => <Picker.Item key={c.id} label={c.nome} value={c.id} />)}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Subcategoria</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={subId} onValueChange={setSubId} enabled={catId !== 0}>
            <Picker.Item label="Selecione..." value={0} />
            {categorias.find(c => c.id === catId)?.subcategorias.map(s => (<Picker.Item key={s.id} label={s.nome} value={s.id} />))}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Forma de Pagamento</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={metodo} onValueChange={setMetodo}><Picker.Item label="Dinheiro" value="Dinheiro" /><Picker.Item label="Cartão de Crédito" value="Cartão de Crédito" /><Picker.Item label="Pix" value="Pix" /></Picker>
        </View>
      </View>
      {metodo === "Cartão de Crédito" && (
        <View style={styles.row}>
          <Text style={styles.label}>Qual Cartão?</Text>
          <View style={styles.inputContainer}>
            <Picker selectedValue={cartaoId} onValueChange={setCartaoId}>
              <Picker.Item label="Selecione..." value="" />
              {cartoes.map(c => (<Picker.Item key={c.cartaoId} label={`${c.nomeCartao} (${c.digitosCartao})`} value={c.cartaoId} />))}
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  field: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: "bold", color: "#333", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, fontSize: 15, backgroundColor: "#fff", height: 50 },
  inputContainer: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden" },
  row: { marginBottom: 15 }
});