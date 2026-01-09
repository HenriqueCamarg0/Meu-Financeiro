import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../utils/designSystem';

const configCategorias: any = {
  "Entretenimento": { cor: colors.info, icone: 'videocam' },
  "Educação": { cor: colors.primary, icone: 'book' },
  "Geral": { cor: colors.gray500, icone: 'apps' },
  "Contas Fixas": { cor: colors.warning, icone: 'calendar' },
  "Mercado": { cor: colors.success, icone: 'cart' },
  "Outros": { cor: colors.gray400, icone: 'ellipsis-horizontal' },
};

export const obterMesAnoTexto = () => {
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const agora = new Date();
  return `${meses[agora.getMonth()]}/${agora.getFullYear()}`; // Retorna "janeiro/2026"
};

export const prepararDadosPizza = (saidas: any[]) => {
  if (!saidas || saidas.length === 0) return [];

  // Agrupa e soma os valores por nome da categoria
  const agrupado = saidas.reduce((acc: any, item: any) => {
    const nomeCat = item.categoria?.nome || "Outros"; 
    acc[nomeCat] = (acc[nomeCat] || 0) + Number(item.valor);
    return acc;
  }, {});

  return Object.keys(agrupado).map((nome) => {
    const config = configCategorias[nome] || configCategorias["Outros"];
    return {
      name: nome,
      population: agrupado[nome],
      color: config.cor,
      icon: config.icone,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12
    };
  });
};