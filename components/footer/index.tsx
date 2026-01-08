import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import TabButton from './TabButton';
import ActionButton from './ActionButton';
import ExpandableMenu from './ExpandableMenu';

export default function Footer(props: any) {
  const [menuAberto, setMenuAberto] = useState(false); 

  return (
    <View style={{ width: '100%' }}>
      <ExpandableMenu 
        visible={menuAberto} 
        onClose={() => setMenuAberto(false)} 
        onAbrirCartao={props.onAbrirCartao}
        onAbrirCategoria={props.onAbrirCategoria}
        onAbrirUsuario={props.onAbrirUsuario} 
      />

      <View style={styles.navBar}>
        <TabButton icon="home-outline" label="Principal" ativo />
        <TabButton icon="list-outline" label="Transações" />
        <View style={{ width: 60 }} />
        <TabButton icon="bar-chart-outline" label="Meta" />
        <TabButton icon="ellipsis-horizontal" label="Mais" />
      </View>
      <ActionButton onPress={() => setMenuAberto(true)} />
    </View>
  );
}