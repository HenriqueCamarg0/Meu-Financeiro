import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

import { router } from "expo-router";

interface HeaderProps {
  mes: string;
  saldo: number;
  receitas: number;
  despesas: number;
}

export function HeaderFinanceiro({
  mes,
  saldo,
  receitas,
  despesas,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      
      {/* Seletor de Mês Simples */}
      <TouchableOpacity style={styles.mesSelector}>
        <Text style={styles.mesText}>{mes}</Text>
        <Ionicons name="chevron-down" size={16} color="#333" />
      </TouchableOpacity>

      {/* Área do Saldo
      <View style={styles.saldoArea}>
        <Text style={styles.labelSaldo}>Saldo em contas</Text>
        <View style={styles.valorPrincipalRow}>
          <Text style={styles.valorSaldo}>R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="eye-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Resumo de Receitas e Despesas */}
      <View style={styles.resumoRow}>
        <View style={styles.resumoItem}>
          <View style={[styles.iconCircle, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons name="arrow-up" size={18} color="#2ecc71" />
          </View>
          <View>
            <Text style={styles.labelResumo}>Pagamentos</Text>
            <Text style={[styles.valorResumo, { color: "#2ecc71" }]}>
              R$ {receitas.toFixed(2)}
            </Text>
          </View>
        </View>


        <View style={styles.resumoItem}>
          <TouchableOpacity
            style={styles.resumoItem}
            onPress={() => router.push("/exit-registration")} 
          >
            <View style={[styles.iconCircle, { backgroundColor: "#FFEBEE" }]}>
              <Ionicons name="arrow-down" size={18} color="#e74c3c" />
            </View>
            <View>
              <Text style={styles.labelResumo}>Saidas</Text>
              <Text style={[styles.valorResumo, { color: "#e74c3c" }]}>
                R$ {despesas.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
