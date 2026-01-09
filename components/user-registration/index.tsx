import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import UserForm from './UserForm';
import UserList from './UserList';
import { userService, Usuario } from '../../services/userService';
import { colors, typography, spacing } from '../../utils/designSystem';

interface UserRegistrationProps {
  onClose?: () => void;
}

export default function UserRegistration({ onClose }: UserRegistrationProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const carregar = useCallback(async () => {
    try {
      const dados = await userService.listarPaginado(0, 50);
      setUsuarios(dados);
    } catch (err) {
      console.error("Erro ao carregar:", err);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar, refreshKey]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurar Usuários</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-circle" size={32} color={colors.gray400} />
          </TouchableOpacity>
        )}
      </View>

      <UserForm aoSucesso={() => setRefreshKey(k => k + 1)} />
      <UserList usuarios={usuarios} atualizar={() => setRefreshKey(k => k + 1)} />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text,
  },
};