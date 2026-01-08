import { api } from '../api';

export interface Cartao {
  cartaoId: string;
  nomeCartao: string;
  digitosCartao: string;
  diaVencimento: number;
  ativo: boolean;
}

export const cartaoService = {
  listarTodos: async (): Promise<Cartao[]> => {
    const response = await api.get('/cadastros/cartoes');
    return response.data;
  },

  // Cadastro respeitando a requisição da API
  cadastrar: async (dados: Omit<Cartao, 'cartaoId'>): Promise<void> => {
    await api.post('/cadastros/cartoes', {
      nomeCartao: dados.nomeCartao,
      diaVencimento: Number(dados.diaVencimento),
      digitosCartao: dados.digitosCartao,
      ativo: true // Todo cartão novo começa como ativo
    });
  },

  // Função para alterar status no banco (Baseado na sua lista web)
  // A API exige TODOS os campos do cartão no body, não apenas o status
  alternarStatus: async (cartao: Cartao, novoStatus: boolean): Promise<void> => {
    // Valida se todos os campos necessários estão presentes
    if (!cartao.cartaoId || !cartao.nomeCartao || !cartao.digitosCartao) {
      throw new Error('Dados incompletos do cartão. Por favor, recarregue a lista.');
    }

    // Garante que diaVencimento seja um número válido
    let diaVencimento = cartao.diaVencimento;
    if (diaVencimento === null || diaVencimento === undefined) {
      diaVencimento = 0; // Valor padrão se não tiver
    } else if (typeof diaVencimento === 'string') {
      diaVencimento = Number(diaVencimento) || 0;
    }
    
    const body = {
      nomeCartao: String(cartao.nomeCartao).trim(),
      diaVencimento: Number(diaVencimento),
      digitosCartao: String(cartao.digitosCartao).trim(),
      ativo: Boolean(novoStatus)
    };

    // Log para debug (apenas em desenvolvimento)
    if (__DEV__) {
      console.log('Atualizando cartão:', {
        cartaoId: cartao.cartaoId,
        body,
        novoStatus,
        cartaoOriginal: cartao
      });
    }

    // A API não suporta PATCH, então usa PUT conforme o erro indicou
    const response = await api.put(`/cadastros/cartoes/${cartao.cartaoId}`, body);
    
    // Log da resposta (apenas em desenvolvimento)
    if (__DEV__) {
      console.log('Resposta da API:', response.data);
    }
  }
};