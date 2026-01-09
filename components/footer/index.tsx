import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../utils/designSystem';
import ExpandableMenu from './ExpandableMenu';

export default function Footer(props: any) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View>
      <ExpandableMenu 
        {...props} 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.tabItem} onPress={props.onIrParaPrincipal}>
          <Ionicons 
            name="home-outline" 
            size={24} 
            color={props.abaAtiva === 'index' ? colors.primary : colors.gray400} 
          />
          <Text style={[
            styles.tabText, 
            { color: props.abaAtiva === 'index' ? colors.primary : colors.gray400 },
            props.abaAtiva === 'index' && styles.tabTextAtivo
          ]}>
            Principal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={props.onIrParaTransacoes}>
          <Ionicons 
            name="list-outline" 
            size={24} 
            color={props.abaAtiva === 'transacoes' ? colors.primary : colors.gray400} 
          />
          <Text style={[
            styles.tabText,
            { color: props.abaAtiva === 'transacoes' ? colors.primary : colors.gray400 },
            props.abaAtiva === 'transacoes' && styles.tabTextAtivo
          ]}>
            Transações
          </Text>
        </TouchableOpacity>

        {/* FAB Button - Melhorado */}
        <View style={styles.fabContainer}>
          <TouchableOpacity 
            style={styles.fabCircle} 
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.tabItem} onPress={props.onIrParaMetas}>
          <Ionicons 
            name="bar-chart-outline" 
            size={24} 
            color={props.abaAtiva === 'metas' ? colors.primary : colors.gray400} 
          />
          <Text style={[
            styles.tabText, 
            { color: props.abaAtiva === 'metas' ? colors.primary : colors.gray400 },
            props.abaAtiva === 'metas' && styles.tabTextAtivo
          ]}>
            Meta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={props.onIrParaMais}>
          <Ionicons 
            name="ellipsis-horizontal" 
            size={24} 
            color={props.abaAtiva === 'mais' ? colors.primary : colors.gray400} 
          />
          <Text style={[
            styles.tabText, 
            { color: props.abaAtiva === 'mais' ? colors.primary : colors.gray400 },
            props.abaAtiva === 'mais' && styles.tabTextAtivo
          ]}>
            Mais
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  navBar: {
    flexDirection: 'row' as const,
    height: 80,
    backgroundColor: colors.surface,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  tabItem: { 
    alignItems: 'center' as const, 
    flex: 1,
    paddingVertical: spacing.xs,
  },
  tabText: { 
    fontSize: typography.sizes.xs, 
    marginTop: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  tabTextAtivo: { 
    fontWeight: typography.weights.bold,
  },
  fabContainer: { 
    position: 'absolute' as const, 
    alignSelf: 'center' as const, 
    top: -30,
    zIndex: 10,
  },
  fabCircle: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: colors.surface,
  },
};