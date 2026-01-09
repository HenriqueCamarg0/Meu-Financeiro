import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../utils/designSystem';

export default function Goals() {
  const [metas] = useState([
    {
      id: 1,
      nome: 'Gasto Mensal',
      valorMeta: 3000,
      valorAtual: 2150,
      tipo: 'gasto-mensal',
      progresso: 71.7,
      status: 'ok'
    },
    {
      id: 2,
      nome: 'Moradia',
      valorMeta: 1200,
      valorAtual: 980,
      tipo: 'categoria',
      progresso: 81.7,
      status: 'atencao'
    },
    {
      id: 3,
      nome: 'Reserva de Emergência',
      valorMeta: 10000,
      valorAtual: 6500,
      tipo: 'economia',
      progresso: 65,
      status: 'ok'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return colors.success;
      case 'atencao': return colors.warning;
      case 'excedida': return colors.error;
      default: return colors.gray400;
    }
  };

  const getStatusIcon = (tipo: string) => {
    switch (tipo) {
      case 'gasto-mensal': return 'calendar-outline';
      case 'categoria': return 'home-outline';
      case 'economia': return 'wallet-outline';
      default: return 'analytics-outline';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Minhas Metas</Text>
        <Text style={styles.subtitle}>Controle seus gastos e alcance seus objetivos</Text>
        
        <TouchableOpacity style={styles.newGoalButton}>
          <Ionicons name="add" size={20} color={colors.white} />
          <Text style={styles.newGoalText}>Nova Meta</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>📊 Resumo do Mês</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>✅ Metas OK</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>⚠️ Atenção</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>❌ Excedidas</Text>
          </View>
        </View>
      </View>

      {/* Lista de Metas */}
      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>Suas Metas</Text>
        
        {metas.map((meta) => (
          <View key={meta.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Ionicons 
                  name={getStatusIcon(meta.tipo)} 
                  size={24} 
                  color={getStatusColor(meta.status)} 
                />
                <Text style={styles.goalName}>{meta.nome}</Text>
              </View>
              <Text style={[styles.goalPercentage, { color: getStatusColor(meta.status) }]}>
                {meta.progresso.toFixed(0)}%
              </Text>
            </View>

            <View style={styles.goalValues}>
              <Text style={styles.goalCurrent}>
                R$ {meta.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
              <Text style={styles.goalTarget}>
                / R$ {meta.valorMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${Math.min(meta.progresso, 100)}%`,
                      backgroundColor: getStatusColor(meta.status)
                    }
                  ]} 
                />
              </View>
            </View>

            <Text style={styles.goalRemaining}>
              {meta.valorAtual < meta.valorMeta 
                ? `Restam R$ ${(meta.valorMeta - meta.valorAtual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : `Excedeu em R$ ${(meta.valorAtual - meta.valorMeta).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              }
            </Text>
          </View>
        ))}
      </View>

      {/* Dicas */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Dicas para suas Metas</Text>
        <Text style={styles.tipsText}>
          • Revise suas metas semanalmente{'\n'}
          • Ajuste valores conforme necessário{'\n'}
          • Comemore quando atingir seus objetivos!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    marginBottom: spacing.lg,
  },
  newGoalButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    elevation: 3,
  },
  newGoalText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  summaryItem: {
    alignItems: 'center' as const,
  },
  summaryNumber: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  goalsSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  goalCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.sm,
  },
  goalInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  goalName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  goalPercentage: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  goalValues: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.sm,
  },
  goalCurrent: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  goalTarget: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    marginBottom: spacing.sm,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  goalRemaining: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic' as const,
  },
  tipsCard: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
    elevation: 2,
    marginBottom: spacing.xl,
  },
  tipsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tipsText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
};