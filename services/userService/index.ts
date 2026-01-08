import { api } from '../api';

export interface Usuario {
  userId: string; // Fiel à sua API (UUID)
  nome: string;
  sobrenome: string;
  ativo: boolean;
  defaultValue: boolean;
  nomeCompleto?: string;
}

export const userService = {
  listarPaginado: async (page = 0, size = 50) => {
    const response = await api.get(`/cadastros/usuarios/paginado?page=${page}&size=${size}`);
    // Retorna os dados puros da API (content), mantendo a fidelidade
    return response.data.content;
  },
  salvar: async (nome: string, sobrenome: string) => {
    const response = await api.post('/cadastros/usuarios', {
      nome, sobrenome, ativo: true, defaultValue: false
    });
    return response.data;
  },
  atualizar: async (userId: string, dados: Partial<Usuario>) => {
    await api.put(`/cadastros/usuarios/${userId}`, dados);
  },
  excluir: async (userId: string) => {
    return await api.delete(`/cadastros/usuarios/${userId}`); 
  }
};