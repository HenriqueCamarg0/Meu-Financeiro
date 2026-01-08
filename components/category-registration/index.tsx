import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

export default function CategoryRegistration() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(k => k + 1);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFF' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Categorias</Text>
      <CategoryForm aoSalvar={refresh} />
      <CategoryList refreshKey={refreshKey} aoAtualizar={refresh} />
    </View>
  );
}