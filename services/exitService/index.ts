import { api } from '../api';

export const saidaService = {
  salvar: async (dados: any) => {
    const response = await api.post('/saidas/nova-saida', dados); 
    return response.data;
  },

  buscarPorMes: async (mesAno: string) => {
    try {
      const response = await api.get(`/saidas/buscar-por-mes-ano?mesAno=${mesAno}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar saídas por mês:", error.response?.data || error.message);
      throw error;
    }
  }
};