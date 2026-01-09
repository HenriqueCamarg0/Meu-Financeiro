import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function TableHeader() {
  return (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.cellVencimento]}>VENCIMENTO</Text>
      <Text style={[styles.headerText, styles.cellDescricao]}>DESCRIÇÃO</Text>
      <Text style={[styles.headerText, styles.cellPagamento]}>PAGAMENTO</Text>
      <Text style={[styles.headerText, styles.cellCategoria]}>CATEGORIA</Text>
      <Text style={[styles.headerText, styles.cellUsuario]}>USUÁRIO</Text>
      <Text style={[styles.headerText, styles.cellParcelaContainer]}>PARCELA</Text>
      <Text style={[styles.headerText, styles.cellValor]}>VALOR</Text>
    </View>
  );
}