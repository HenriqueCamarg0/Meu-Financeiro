import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importando seus componentes
import { HeaderFinanceiro } from '../components/header';
import CardRegistration from '../components/card-registration'; 
import CategoryRegistration from '../components/category-registration'; 
import UserRegistration from '../components/user-registration'; // Importando o novo cadastro
import Footer from '../components/footer';

export default function Home() {
  // Estados para controlar a visibilidade dos modais
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false); // Novo estado

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderFinanceiro mes="Janeiro" saldo={1082.09} receitas={0.00} despesas={0.00} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#999' }}>Conteúdo Principal</Text>
        </View>

        {/* MODAL 1: CADASTRO DE CARTÃO */}
        <Modal animationType="slide" transparent={true} visible={cardModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setCardModalVisible(false)}>
                <Text style={styles.closeTxt}>✕</Text>
              </TouchableOpacity>
              <CardRegistration />
            </View>
          </View>
        </Modal>

        {/* MODAL 2: CADASTRO DE CATEGORIA */}
        <Modal animationType="slide" transparent={true} visible={catModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setCatModalVisible(false)}>
                <Text style={styles.closeTxt}>✕</Text>
              </TouchableOpacity>
              <CategoryRegistration />
            </View>
          </View>
        </Modal>

        {/* MODAL 3: CADASTRO DE USUÁRIO */}
        <Modal animationType="slide" transparent={true} visible={userModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setUserModalVisible(false)}>
                <Text style={styles.closeTxt}>✕</Text>
              </TouchableOpacity>
              {/* Passamos o onClose para o componente interno se precisar fechar via código */}
              <UserRegistration onClose={() => setUserModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      {/* FOOTER: Passando as TRÊS funções necessárias */}
      <Footer 
        onAbrirCartao={() => setCardModalVisible(true)} 
        onAbrirCategoria={() => setCatModalVisible(true)} 
        onAbrirUsuario={() => setUserModalVisible(true)} // Agora o Footer reconhece esta função
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 15, paddingBottom: 80 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    height: '90%', // Aumentei um pouco para caber a lista de usuários confortavelmente
    padding: 20 
  },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  closeTxt: { fontSize: 22, color: '#999', fontWeight: 'bold' }
});