import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal, FlatList } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '../../utils/designSystem';

const screenWidth = Dimensions.get("window").width;

interface Props {
  data: any[];           // Dados formatados para o gráfico
  rawTransactions: any[]; // Lista bruta da API para o Filtro do Modal
}

export default function ChartPie({ data, rawTransactions = [] }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const total = data.reduce((sum, item) => sum + item.population, 0);

  // FILTRO: Busca as compras que pertencem à categoria clicada
  const transacoesFiltradas = rawTransactions.filter(t => 
    (t.categoria?.nome || "Outros") === selectedCategory
  );

  const abrirModal = (nome: string) => {
    setSelectedCategory(nome);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos por categoria</Text>
      
      <View style={styles.chartWrapper}>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"} 
          center={[screenWidth / 4, 0]} // Garante a centralização
          hasLegend={false}
        />
        {/* Overlay para criar o efeito de rosca fina */}
        <View style={styles.totalOverlay}>
          <Text style={styles.totalLabel}>
            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        {data.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.categoryItem}
            onPress={() => abrirModal(item.name)}
          >
            <View style={[styles.categoryIconCircle, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryValue}>R$ {item.population.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.gray300} />
          </TouchableOpacity>
        ))}
      </View>

      {/* MODAL DE DETALHES COM FILTRO */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedCategory}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color={colors.gray300} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={transacoesFiltradas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={[styles.categoryItem, { borderBottomWidth: 1, borderBottomColor: colors.gray100 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.descricao || "Compra"}</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{item.dataCompra}</Text>
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>
                    R$ {Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text style={{ color: colors.textLight }}>Nenhuma compra encontrada nesta categoria.</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}