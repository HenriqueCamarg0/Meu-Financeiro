export interface ChartData {
  labels: string[];    // Ex: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
  datasets: {
    data: number[];    // Ex: [1500, 3200, 2100, 4800] -> Seus dados reais
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
}

export interface ChartFlowProps {
  data: number[];      // Valores de saída da sua API
  categories?: string[]; // Datas ou nomes dos períodos
  loading?: boolean;   // Estado de carregamento
  labels: string[];
}