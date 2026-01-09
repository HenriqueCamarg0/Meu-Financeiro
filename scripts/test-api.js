const axios = require('axios');
const baseURL = 'http://201.77.115.146:11000/api/v1';

async function diagnosticoConexao() {
  const endpoint = '/saidas/buscar-por-mes-ano';
  
  // Lista de tentativas para descobrir como o seu servidor lê o "mm/yyyy"
  const tentativas = [
    { desc: "Com Barra (Padrão)", valor: "01/2026" },
    { desc: "Sem Barra (Apenas números)", valor: "012026" },
    { desc: "Com Hífen", valor: "01-2026" },
    { desc: "Mês Extenso", valor: "Janeiro/2026" }
  ];

  console.log(`--- INICIANDO DIAGNÓSTICO DE CONEXÃO ---`);

  for (const t of tentativas) {
    try {
      const res = await axios.get(`${baseURL}${endpoint}`, {
        params: { mesAno: t.valor }
      });
      console.log(`✅ SUCESSO com [${t.desc}]: Usando "${t.valor}"`);
      console.log(`Dados recebidos: ${res.data.length} itens.`);
      return; // Se um funcionar, paramos aqui.
    } catch (err) {
      console.log(`❌ ERRO com [${t.desc}]: Status ${err.response?.status} - ${err.response?.data}`);
    }
  }
  
  console.log(`\n--- ÚLTIMA TENTATIVA: URL BRUTA ---`);
  try {
    // Teste enviando a barra sem deixar o Axios mexer nela
    const resRaw = await axios.get(`${baseURL}${endpoint}?mesAno=01/2026`);
    console.log(`✅ SUCESSO com URL Bruta!`);
  } catch (err) {
    console.log(`❌ FALHA TOTAL: O servidor rejeita a barra "/" de todas as formas.`);
  }
}

diagnosticoConexao();