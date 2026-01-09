/**
 * Formata um valor numérico para Moeda Brasileira (R$)
 */
export const formatarMoeda = (valor: number | string): string => {
  const num = typeof valor === 'string' ? parseFloat(valor) : valor;
  if (isNaN(num)) return "R$ 0,00";

  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

/**
 * Converte data da API (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
 */
export const formatarDataBR = (dataISO: string): string => {
  if (!dataISO) return "--/--/----";
  
  // Trata se a data vier com timestamp (T00:00:00)
  const dataApenas = dataISO.split('T')[0];
  const [ano, mes, dia] = dataApenas.split('-');
  
  return `${dia}/${mes}/${ano}`;
};

/**
 * Formata a exibição da parcela (ex: 1/12)
 * Baseado nos campos 'parcela' e 'totalParcelas' da sua API
 */
export const formatarParcela = (atual: number, total: number): string => {
  if (!total || total <= 1) return "1/1";
  return `${atual}/${total}`;
};

/**
 * Abrevia nomes de usuários ou descrições muito longas
 */
export const abreviarTexto = (texto: string, limite: number = 20): string => {
  if (texto.length <= limite) return texto;
  return texto.substring(0, limite) + "...";
};