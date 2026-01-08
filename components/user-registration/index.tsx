import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Correção do Warning
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import UserForm from './UserForm';
import UserList from './UserList';
import { userService, Usuario } from '../../services/userService';

interface Props {
  onClose: () => void;
}

interface UserRegistrationProps {
  onClose: () => void;
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
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Configurar Usuários</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle" size={32} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <UserForm aoSucesso={() => setRefreshKey(k => k + 1)} />
      <UserList usuarios={usuarios} atualizar={() => setRefreshKey(k => k + 1)} />
    </SafeAreaView>
  );
}