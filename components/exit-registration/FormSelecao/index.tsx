import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categoriaService, Categoria } from "../../../services/categoriaService";
import { cartaoService, Cartao } from "../../../services/cartoesService";
import { colors, typography, spacing } from "../../../utils/designSystem";

export default function FormSelecao({ onDataChange }: any) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [catId, setCatId] = useState<number>(0);
  const [subId, setSubId] = useState<number>(0);
  const [metodo, setMetodo] = useState("Débito em Conta");
  const [cartaoId, setCartaoId] = useState("");
  const [dataCompra, setDataCompra] = useState(new Date().toLocaleDateString('pt-BR'));
  const [dataVencimento, setDataVencimento] = useState("");
  const [erroData, setErroData] = useState("");
  
  // Novos estados para fatura do cartão
  const [tipoFatura, setTipoFatura] = useState("atual"); // "atual", "proxima", "outra"
  const [mesPersonalizado, setMesPersonalizado] = useState("");
  const [anoPersonalizado, setAnoPersonalizado] = useState("");

  useEffect(() => {
    async function carregar() {
      const [cats, cards] = await Promise.all([categoriaService.listarTodas(), cartaoService.listarTodos()]);
      setCategorias(cats);
      setCartoes(cards);
    }
    carregar();
  }, []);

  // Função para gerar fatura baseada no tipo selecionado
  const gerarFatura = () => {
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
                   "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const agora = new Date();
    
    switch (tipoFatura) {
      case "atual":
        return `${meses[agora.getMonth()]}/${agora.getFullYear()}`;
      case "proxima":
        const proximoMes = agora.getMonth() === 11 ? 0 : agora.getMonth() + 1;
        const proximoAno = agora.getMonth() === 11 ? agora.getFullYear() + 1 : agora.getFullYear();
        return `${meses[proximoMes]}/${proximoAno}`;
      case "outra":
        if (mesPersonalizado && anoPersonalizado) {
          return `${mesPersonalizado}/${anoPersonalizado}`;
        }
        return `${meses[agora.getMonth()]}/${agora.getFullYear()}`;
      default:
        return `${meses[agora.getMonth()]}/${agora.getFullYear()}`;
    }
  };

  // Reset das opções de fatura quando muda o método
  useEffect(() => {
    if (metodo !== "Cartão de Crédito") {
      setTipoFatura("atual");
      setMesPersonalizado("");
      setAnoPersonalizado("");
    }
  }, [metodo]);

  // Validação de data para débito em conta
  const validarData = (data: string) => {
    if (metodo === "Débito em Conta" && !data.trim()) {
      setErroData("Data é obrigatória para débito em conta");
      return false;
    }
    
    // Validação básica de formato DD/MM/AAAA
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (data && !regex.test(data)) {
      setErroData("Formato inválido. Use DD/MM/AAAA");
      return false;
    }
    
    setErroData("");
    return true;
  };

  // Validação quando muda o método de pagamento
  useEffect(() => {
    if (metodo === "Débito em Conta") {
      validarData(dataCompra);
      // Para débito em conta, a data de vencimento é obrigatória
      if (!dataVencimento.trim()) {
        setDataVencimento(dataCompra);
      }
    } else {
      setErroData("");
      setDataVencimento(""); // Limpa data de vencimento para outros métodos
    }
  }, [metodo, dataCompra]);

useEffect(() => {
  const cObj = categorias.find(c => c.id === catId);
  const sObj = cObj?.subcategorias.find(s => s.id === subId);
  const cardObj = cartoes.find(c => c.cartaoId === cartaoId);

  // Validação mais robusta
  const dadosValidos = catId > 0 && subId > 0 && 
    (metodo !== "Débito em Conta" || (dataCompra.trim() && dataVencimento.trim())) &&
    (metodo !== "Cartão de Crédito" || (cartaoId.trim() && (tipoFatura !== "outra" || (mesPersonalizado && anoPersonalizado))));

  onDataChange?.({
    categoriaId: catId,
    categoriaNome: cObj?.nome || "",
    subcategoriaId: subId,
    subcategoriaNome: sObj?.nome || "",
    pagamentoDescricao: metodo,
    cartaoId: cartaoId || null,
    cartaoNome: cardObj?.nomeCartao || "",
    digitosCartao: cardObj?.digitosCartao || "",
    data: dataCompra,
    dataVencimento: metodo === "Débito em Conta" ? (dataVencimento || dataCompra) : dataCompra,
    faturaPersonalizada: metodo === "Cartão de Crédito" ? gerarFatura() : null,
    tipoFatura,
    isValid: dadosValidos
  });
}, [catId, subId, metodo, cartaoId, dataCompra, dataVencimento, tipoFatura, mesPersonalizado, anoPersonalizado, categorias, cartoes]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>
          Data da Compra 
          {metodo === "Débito em Conta" && <Text style={styles.required}> *</Text>}
        </Text>
        <TextInput 
          style={[styles.input, erroData ? styles.inputError : null]} 
          value={dataCompra} 
          onChangeText={(text) => {
            setDataCompra(text);
            validarData(text);
          }} 
          placeholder="DD/MM/AAAA" 
        />
        {erroData ? <Text style={styles.errorText}>{erroData}</Text> : null}
      </View>

      {metodo === "Débito em Conta" && (
        <View style={styles.field}>
          <Text style={styles.label}>Data de Vencimento <Text style={styles.required}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            value={dataVencimento} 
            onChangeText={setDataVencimento} 
            placeholder="DD/MM/AAAA" 
          />
          <Text style={styles.helpText}>Para débito em conta, informe quando será debitado</Text>
        </View>
      )}

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
          <Picker selectedValue={metodo} onValueChange={setMetodo}>
            <Picker.Item label="Débito em Conta" value="Débito em Conta" />
            <Picker.Item label="Cartão de Crédito" value="Cartão de Crédito" />
            <Picker.Item label="Pix" value="Pix" />
          </Picker>
        </View>
      </View>
      {metodo === "Cartão de Crédito" && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Qual Cartão?</Text>
            <View style={styles.inputContainer}>
              <Picker selectedValue={cartaoId} onValueChange={setCartaoId}>
                <Picker.Item label="Selecione..." value="" />
                {cartoes.map(c => (<Picker.Item key={c.cartaoId} label={`${c.nomeCartao} (${c.digitosCartao})`} value={c.cartaoId} />))}
              </Picker>
            </View>
          </View>

          {cartaoId && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Fatura</Text>
                <View style={styles.inputContainer}>
                  <Picker selectedValue={tipoFatura} onValueChange={setTipoFatura}>
                    <Picker.Item label="Fatura Atual" value="atual" />
                    <Picker.Item label="Próxima Fatura" value="proxima" />
                    <Picker.Item label="Outra Fatura" value="outra" />
                  </Picker>
                </View>
              </View>

              {tipoFatura === "outra" && (
                <View style={[styles.row, { flexDirection: 'row' }]}>
                  <View style={styles.halfColumn}>
                    <Text style={styles.label}>Mês</Text>
                    <View style={styles.inputContainer}>
                      <Picker selectedValue={mesPersonalizado} onValueChange={setMesPersonalizado}>
                        <Picker.Item label="Selecione..." value="" />
                        <Picker.Item label="Janeiro" value="janeiro" />
                        <Picker.Item label="Fevereiro" value="fevereiro" />
                        <Picker.Item label="Março" value="março" />
                        <Picker.Item label="Abril" value="abril" />
                        <Picker.Item label="Maio" value="maio" />
                        <Picker.Item label="Junho" value="junho" />
                        <Picker.Item label="Julho" value="julho" />
                        <Picker.Item label="Agosto" value="agosto" />
                        <Picker.Item label="Setembro" value="setembro" />
                        <Picker.Item label="Outubro" value="outubro" />
                        <Picker.Item label="Novembro" value="novembro" />
                        <Picker.Item label="Dezembro" value="dezembro" />
                      </Picker>
                    </View>
                  </View>
                  <View style={[styles.halfColumn, { marginRight: 0 }]}>
                    <Text style={styles.label}>Ano</Text>
                    <TextInput 
                      style={styles.input} 
                      value={anoPersonalizado} 
                      onChangeText={setAnoPersonalizado} 
                      placeholder="2026" 
                      keyboardType="numeric"
                      maxLength={4}
                    />
                  </View>
                </View>
              )}

              {/* Preview da fatura selecionada */}
              <View style={styles.faturaPreview}>
                <Text style={styles.faturaPreviewText}>
                  📅 Será lançado na fatura: <Text style={styles.faturaPreviewBold}>{gerarFatura()}</Text>
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  field: { marginBottom: 18 },
  label: { 
    fontSize: typography.sizes.sm, 
    fontWeight: typography.weights.bold, 
    color: colors.text, 
    marginBottom: spacing.sm,
  },
  input: { 
    borderWidth: 1, 
    borderColor: colors.gray200, 
    borderRadius: 8, 
    padding: spacing.md, 
    fontSize: typography.sizes.base, 
    backgroundColor: colors.surface, 
    height: 50,
  },
  inputError: { borderColor: colors.error, borderWidth: 2 },
  inputContainer: { 
    borderWidth: 1, 
    borderColor: colors.gray200, 
    borderRadius: 8, 
    height: 50, 
    justifyContent: "center", 
    overflow: "hidden",
  },
  row: { marginBottom: spacing.lg },
  halfColumn: { flex: 1, marginRight: spacing.sm },
  required: { color: colors.error, fontWeight: typography.weights.bold },
  errorText: { color: colors.error, fontSize: typography.sizes.xs, marginTop: 4 },
  helpText: { color: colors.textSecondary, fontSize: typography.sizes.xs, marginTop: 4, fontStyle: "italic" },
  faturaPreview: { 
    backgroundColor: colors.success + '20', 
    padding: spacing.md, 
    borderRadius: 8, 
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  faturaPreviewText: { fontSize: typography.sizes.sm, color: colors.success },
  faturaPreviewBold: { fontWeight: typography.weights.bold, color: colors.success },
});