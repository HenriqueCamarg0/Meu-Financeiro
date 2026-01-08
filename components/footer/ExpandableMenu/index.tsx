import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

const { width } = Dimensions.get('window');

export default function ExpandableMenu(props: any) {
  // CONFIGURAÇÕES DO LEQUE
  const radius = 140; 
  
  const menuItems = [
    { icon: "arrow-down-circle", label: "Saída", color: "#e74c3c", angle: 185 },   
    { icon: "arrow-up-circle", label: "Entrada", color: "#2ecc71", angle: 145 },   
    { icon: "card-outline", label: "Cartão", color: "#e67e22", angle: 95 },       
    { icon: "grid-outline", label: "Categoria", color: "#8b5cf6", angle: 45 },    
    { icon: "people-outline", label: "Usuários", color: "#6366f1", angle: 5, action: props.onAbrirUsuario }, 
  ];

  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={props.onClose}
      >
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
                    props.onClose();
                    if(item.action) item.action();
                    else if(item.label === "Cartão") props.onAbrirCartao();
                    else if(item.label === "Categoria") props.onAbrirCategoria();
                  }} 
                />
              </View>
            );
          })}

          <TouchableOpacity style={styles.btnFecharCircular} onPress={props.onClose}>
            <Ionicons name="close" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function Item({ icon, label, color, onPress }: any) {
  return (
    <View style={styles.opcaoContainer}>
      <TouchableOpacity 
        style={[styles.circuloOpcao, { backgroundColor: color }]} 
        onPress={onPress}
      >
        <Ionicons name={icon} size={28} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.labelOpcao}>{label}</Text>
    </View>
  );
}