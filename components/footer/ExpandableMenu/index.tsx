import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../utils/designSystem';

export default function ExpandableMenu(props: any) {
  const radius = 140; 
  
  const menuItems = [
    { icon: "arrow-down-circle", label: "Saída", color: colors.error, angle: 185 },   
    { icon: "arrow-up-circle", label: "Entrada", color: colors.success, angle: 145 },   
    { icon: "card-outline", label: "Cartão", color: colors.secondary, angle: 95 },       
    { icon: "grid-outline", label: "Categoria", color: colors.primary, angle: 45 },    
    { icon: "people-outline", label: "Usuários", color: colors.info, angle: 5 }, 
  ];

  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={props.onClose}>
        <View style={styles.menuAreaCircular}>
          
          {menuItems.map((item, index) => {
            const rad = (item.angle * Math.PI) / 190;
            const x = Math.cos(rad) * radius;
            const y = -Math.sin(rad) * (radius * 1.10); 

            return (
              <View 
                key={index}
                style={[
                  styles.itemPosicaoAbsoluta, 
                  { transform: [{ translateX: x }, { translateY: y }] }
                ]}
              >
                <Item 
                  icon={item.icon} 
                  label={item.label} 
                  color={item.color} 
                  onPress={() => {
                    props.onClose(); // Fecha o menu primeiro
                    
                    // Executa a função baseada no label
                    if (item.label === "Saída") props.onAbrirSaida?.();
                    else if (item.label === "Entrada") props.onAbrirEntrada?.();
                    else if (item.label === "Cartão") props.onAbrirCartao?.();
                    else if (item.label === "Categoria") props.onAbrirCategoria?.();
                    else if (item.label === "Usuários") props.onAbrirUsuario?.();
                  }} 
                />
              </View>
            );
          })}

          <TouchableOpacity style={styles.btnFecharCircular} onPress={props.onClose}>
            <Ionicons name="close" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function Item({ icon, label, color, onPress }: any) {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity 
        style={[styles.circuloOpcao, { backgroundColor: color }]} 
        onPress={onPress}
      >
        <Ionicons name={icon} size={28} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.labelOpcao}>{label}</Text>
    </View>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    paddingBottom: 120,
    zIndex: 999,
  },
  menuAreaCircular: { 
    width: 60, 
    height: 60, 
    alignItems: 'center' as const, 
    justifyContent: 'center' as const,
  },
  itemPosicaoAbsoluta: { 
    position: 'absolute' as const, 
    alignItems: 'center' as const, 
    width: 100,
  },
  circuloOpcao: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    justifyContent: 'center' as const, 
    alignItems: 'center' as const, 
    elevation: 8,
  },
  labelOpcao: { 
    color: colors.white, 
    marginTop: spacing.sm, 
    fontSize: typography.sizes.xs, 
    fontWeight: typography.weights.bold,
  },
  btnFecharCircular: { 
    backgroundColor: colors.primary, 
    width: 65, 
    height: 65, 
    borderRadius: 33, 
    justifyContent: 'center' as const, 
    alignItems: 'center' as const,
  },
  fabContainer: { 
    alignItems: 'center' as const,
  },
};