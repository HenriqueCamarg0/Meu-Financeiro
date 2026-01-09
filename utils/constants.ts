export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


export const montarMesAnoFiltro = (mesIndice: number, ano: number): string => {
  const mesNome = MESES[mesIndice]; 
  return `${mesNome}/${ano}`; 
};