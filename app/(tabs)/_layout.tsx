import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Footer from '../../components/footer';
import CardRegistration from '../../components/card-registration';
import CategoryRegistration from '../../components/category-registration';
import UserRegistration from '../../components/user-registration';
import ExitRegistration from '../../components/exit-registration';
import { colors, spacing, typography } from '../../utils/designSystem';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determina aba ativa baseada na rota
  let abaAtiva = 'index';
  if (pathname.includes('transacoes')) abaAtiva = 'transacoes';
  else if (pathname.includes('metas')) abaAtiva = 'metas';
  else if (pathname.includes('mais')) abaAtiva = 'mais';
  
  const insets = useSafeAreaInsets();

  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="transacoes/index" />
        <Tabs.Screen name="metas/index" />
        <Tabs.Screen name="mais/index" />
      </Tabs>

      <View style={{ paddingBottom: insets.bottom }}>
        <Footer 
          abaAtiva={abaAtiva} 
          onAbrirSaida={() => setExitModalVisible(true)}
          onAbrirCartao={() => setCardModalVisible(true)} 
          onAbrirCategoria={() => setCatModalVisible(true)} 
          onAbrirUsuario={() => setUserModalVisible(true)}
          onIrParaPrincipal={() => router.push('/')}
          onIrParaTransacoes={() => router.push('/transacoes')}
          onIrParaMetas={() => router.push('/metas')}
          onIrParaMais={() => router.push('/mais')}
        />
      </View>

      {/* MODAL CARTÃO */}
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

      {/* MODAL CATEGORIA */}
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

      {/* MODAL USUÁRIO */}
      <Modal animationType="slide" transparent={true} visible={userModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setUserModalVisible(false)}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
            <UserRegistration />
          </View>
        </View>
      </Modal>

      {/* MODAL SAÍDA */}
      <Modal animationType="slide" transparent={true} visible={exitModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setExitModalVisible(false)}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
            <ExitRegistration />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.background },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 25, borderTopRightRadius: 25, height: '90%', padding: spacing.xl },
  closeBtn: { alignSelf: 'flex-end', padding: spacing.sm },
  closeTxt: { fontSize: typography.sizes['3xl'], color: colors.textLight, fontWeight: typography.weights.bold }
});