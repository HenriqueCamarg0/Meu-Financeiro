import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors, typography, spacing, components } from "../../utils/designSystem";

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
        <Ionicons name="chevron-down" size={16} color={colors.text} />
      </TouchableOpacity>

      {/* Resumo de Receitas e Despesas */}
      <View style={styles.resumoRow}>
        <View style={styles.resumoItem}>
          <View style={[styles.iconCircle, { backgroundColor: colors.success + '20' }]}>
            <Ionicons name="arrow-up" size={18} color={colors.success} />
          </View>
          <View>
            <Text style={styles.labelResumo}>Pagamentos</Text>
            <Text style={[styles.valorResumo, { color: colors.success }]}>
              R$ {receitas.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.resumoItem}>
          <TouchableOpacity
            style={styles.resumoItem}
            onPress={() => router.push("/exit-registration")} 
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.error + '20' }]}>
              <Ionicons name="arrow-down" size={18} color={colors.error} />
            </View>
            <View>
              <Text style={styles.labelResumo}>Saidas</Text>
              <Text style={[styles.valorResumo, { color: colors.error }]}>
                R$ {despesas.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  mesSelector: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: spacing.lg,
  },
  mesText: {
    ...typography.styles.h3,
    color: colors.text,
    marginRight: spacing.sm,
  },
  resumoRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    gap: spacing.md,
  },
  resumoItem: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.gray50,
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  labelResumo: {
    ...typography.styles.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  valorResumo: {
    ...typography.styles.body,
    fontWeight: typography.weights.bold,
  },
};
