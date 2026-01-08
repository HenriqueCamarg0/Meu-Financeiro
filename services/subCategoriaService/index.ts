import { api } from '../api';


import { Subcategoria } from '../categoriaService';

export const subcategoriaService = {
  listarTodas: async (): Promise<Subcategoria[]> => {
    try {
      const response = await api.get('/cadastros/subcategorias');
      return response.data;
    } catch (err: any) {
      if (__DEV__) console.error('subCategoriaService.listarTodas error', err?.response?.status, err?.message);
      throw err;
    }
  },
  // Útil para filtrar quando o usuário escolhe a categoria
  listarPorCategoria: async (categoriaId: number): Promise<Subcategoria[]> => {
    const todas = await subcategoriaService.listarTodas();
    return todas.filter(sub => sub.categoriaId === categoriaId && sub.ativo);
  }
};