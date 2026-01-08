import { api } from '../api';

export interface Subcategoria {
  id: number;
  nome: string;
  categoriaId: number;
  ativo: boolean;
  defaultValue: boolean;
}

export interface Categoria {
  id: number;
  nome: string;
  subcategorias: Subcategoria[];
  ativo: boolean;
  defaultValue: boolean;
}

export const categoriaService = {
  listarTodas: async (): Promise<Categoria[]> => {
    const response = await api.get('/cadastros/categorias');
    return response.data;
  },
  salvar: async (nome: string): Promise<Categoria> => {
    // Envia ativo e defaultValue para evitar erro 500
    const response = await api.post('/cadastros/categorias', {
      nome, ativo: true, defaultValue: true 
    });
    return response.data;
  },
  editar: async (id: number, nome: string, ativo: boolean): Promise<void> => {
    await api.put(`/cadastros/categorias/${id}`, {
      nome, ativo, defaultValue: true
    });
  },
  excluir: async (id: number): Promise<void> => {
    await api.delete(`/cadastros/categorias/${id}`);
  }
};

export const subCategoriaService = {
  salvar: async (nome: string, categoriaId: number) => {
    const response = await api.post('/cadastros/subcategorias', {
      nome: nome,
      categoriaId: categoriaId,
      ativo: true,
      defaultValue: false 
    });
    return response.data;
  },
  editar: async (id: number, nome: string, categoriaId: number, ativo: boolean): Promise<void> => {
    await api.put(`/cadastros/subcategorias/${id}`, {
      nome, categoriaId, ativo, defaultValue: true
    });
  },
  excluir: async (id: number): Promise<void> => {
    await api.delete(`/cadastros/subcategorias/${id}`);
  }
};