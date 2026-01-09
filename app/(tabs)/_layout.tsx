import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Footer from '../../components/footer';
import CardRegistration from '../../components/card-registration';
import CategoryRegistration from '../../components/category-registration';
import UserRegistration from '../../components/user-registration';
import ExitRegistration from '../../components/exit-registration';
import Goals from '../../components/goals';
import { colors, spacing, typography } from '../../utils/designSystem';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const abaAtiva = pathname.includes('transacoes') ? 'transacoes' : 'index';
  const insets = useSafeAreaInsets();

  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [goalsModalVisible, setGoalsModalVisible] = useState(false);
  const [moreModalVisible, setMoreModalVisible] = useState(false);

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="transacoes/index" />
      </Tabs>

      <View style={{ paddingBottom: insets.bottom }}>
        <Footer 
          abaAtiva={abaAtiva} 
          onAbrirSaida={() => setExitModalVisible(true)}
          onAbrirCartao={() => setCardModalVisible(true)} 
          onAbrirCategoria={() => setCatModalVisible(true)} 
          onAbrirUsuario={() => setUserModalVisible(true)}
          onAbrirMetas={() => setGoalsModalVisible(true)}
          onAbrirMais={() => setMoreModalVisible(true)}
          onIrParaPrincipal={() => router.push('/')}
          onIrParaTransacoes={() => router.push('/transacoes')}
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
            <UserRegistration onClose={() => setUserModalVisible(false)} />
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
            <ExitRegistration onClose={() => setExitModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* MODAL METAS */}
      <Modal animationType="slide" transparent={true} visible={goalsModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setGoalsModalVisible(false)}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
            <Goals />
          </View>
        </View>
      </Modal>

      {/* MODAL MAIS */}
      <Modal animationType="slide" transparent={true} visible={moreModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setMoreModalVisible(false)}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: typography.sizes.xl, color: colors.textPrimary, marginBottom: spacing.lg }}>
                ⚙️ Mais Opções
              </Text>
              <Text style={{ fontSize: typography.sizes.md, color: colors.textSecondary, textAlign: 'center' }}>
                Configurações e opções adicionais serão implementadas aqui!
              </Text>
            </View>
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