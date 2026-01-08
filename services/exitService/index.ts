import { api } from '../api';

export const saidaService = {
  salvar: async (dados: any) => {
    const response = await api.post('/saidas/nova-saida', dados);
    return response.data;
  }
};