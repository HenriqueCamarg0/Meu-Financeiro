import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, RefreshControl, Alert, View } from "react-native";
import { HeaderFinanceiro } from "../../components/header";
import ChartPie from "../../components/chart-flow"; // Seu novo componente de Pizza
import { saidaService } from "../../services/exitService";
import {
  obterMesAnoTexto,
  prepararDadosPizza,
} from "../../components/chart-flow/utils";
import { colors } from "../../utils/designSystem";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [dadosPizza, setDadosPizza] = useState<any[]>([]);
  const [transacoesBrutas, setTransacoesBrutas] = useState<any[]>([]); // Adicione este estado!

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      const res = await saidaService.buscarPorMes(obterMesAnoTexto());

      setTransacoesBrutas(res); // Guarda os dados para o Modal filtrar
      setDadosPizza(prepararDadosPizza(res));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={carregarDados}
          tintColor={colors.primary}
        />
      }
    >
      {/* Resumo Financeiro no Topo */}
      <HeaderFinanceiro
        mes="Janeiro"
        saldo={1082.09}
        receitas={0.0}
        despesas={8841.33}
      />

      {/* Gráfico de Pizza com Lista de Categorias Embaixo */}
      <View style={{ paddingBottom: 30 }}>
        <ChartPie data={dadosPizza} rawTransactions={transacoesBrutas} />
      </View>
    </ScrollView>
  );
}
