import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../utils/designSystem';

export default function MaisScreen() {
  const opcoes = [
    { id: 1, titulo: 'Configurações', icone: 'settings-outline', descricao: 'Ajustes do aplicativo' },
    { id: 2, titulo: 'Backup', icone: 'cloud-upload-outline', descricao: 'Backup dos seus dados' },
    { id: 3, titulo: 'Relatórios', icone: 'document-text-outline', descricao: 'Relatórios detalhados' },
    { id: 4, titulo: 'Exportar Dados', icone: 'download-outline', descricao: 'Exportar para Excel/PDF' },
    { id: 5, titulo: 'Sobre', icone: 'information-circle-outline', descricao: 'Informações do app' },
    { id: 6, titulo: 'Ajuda', icone: 'help-circle-outline', descricao: 'Central de ajuda' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Mais Opções</Text>
        <Text style={styles.subtitle}>Configurações e funcionalidades adicionais</Text>
      </View>

      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao) => (
          <TouchableOpacity key={opcao.id} style={styles.opcaoCard}>
            <View style={styles.opcaoIcone}>
              <Ionicons name={opcao.icone as any} size={24} color={colors.primary} />
            </View>
            <View style={styles.opcaoTexto}>
              <Text style={styles.opcaoTitulo}>{opcao.titulo}</Text>
              <Text style={styles.opcaoDescricao}>{opcao.descricao}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitulo}>💡 Em Desenvolvimento</Text>
        <Text style={styles.infoTexto}>
          Essas funcionalidades estão sendo desenvolvidas e estarão disponíveis em breve!
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
    padding: spacing.xl,
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
  },
  opcoesContainer: {
    padding: spacing.lg,
  },
  opcaoCard: {
    backgroundColor: colors.surface,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    elevation: 2,
  },
  opcaoIcone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: spacing.md,
  },
  opcaoTexto: {
    flex: 1,
  },
  opcaoTitulo: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  opcaoDescricao: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: 12,
    elevation: 2,
    marginBottom: spacing.xl,
  },
  infoTitulo: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoTexto: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
};