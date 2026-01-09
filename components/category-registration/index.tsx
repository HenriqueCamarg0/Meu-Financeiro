import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { colors, typography, spacing, components } from '../../utils/designSystem';

export default function CategoryRegistration() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(k => k + 1);

  return (
    <View style={[components.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[components.row, { marginBottom: spacing.xl }]}>
        <View style={{ flex: 1 }}>
          <Text style={[typography.styles.h2, { color: colors.gray900 }]}>
            Categorias
          </Text>
          <Text style={[typography.styles.bodySmall, { color: colors.gray600, marginTop: spacing.xs }]}>
            Organize suas despesas em categorias e subcategorias
          </Text>
        </View>
        <View style={[components.card, components.cardSmall, { backgroundColor: colors.primary }]}>
          <Ionicons name="folder-outline" size={24} color={colors.white} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryForm aoSalvar={refresh} />
        <CategoryList refreshKey={refreshKey} aoAtualizar={refresh} />
      </ScrollView>
    </View>
  );
}