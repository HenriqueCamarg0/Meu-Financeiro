# 🎯 Sugestões para Tela de Metas

## 📱 **Conceito da Tela de Metas**

A tela de metas deve ajudar o usuário a **controlar gastos** e **atingir objetivos financeiros** de forma visual e motivadora.

---

## 🎨 **Layout e Design**

### **Header da Tela:**
```
🎯 Minhas Metas
Controle seus gastos e alcance seus objetivos

[+ Nova Meta]
```

### **Cards de Metas:**
- **Card Principal**: Meta ativa com progresso visual
- **Cards Secundários**: Outras metas em lista
- **Cores**: Verde para metas atingidas, laranja para em progresso, vermelho para excedidas

---

## 🎯 **Tipos de Metas Sugeridas**

### **1. Meta de Gasto Mensal**
```
💰 Gasto Total Mensal
Meta: R$ 3.000,00
Gasto Atual: R$ 2.150,00
Restante: R$ 850,00
Progresso: 71% (barra verde)
```

### **2. Meta por Categoria**
```
🏠 Moradia
Meta: R$ 1.200,00
Gasto: R$ 980,00
Restante: R$ 220,00
Progresso: 82% (barra laranja)
```

### **3. Meta de Economia**
```
💎 Reserva de Emergência
Meta: R$ 10.000,00
Economizado: R$ 6.500,00
Faltam: R$ 3.500,00
Progresso: 65% (barra azul)
```

### **4. Meta de Cartão de Crédito**
```
💳 Limite do Cartão
Limite: R$ 2.000,00
Usado: R$ 1.200,00
Disponível: R$ 800,00
Progresso: 60% (barra amarela)
```

---

## 🎨 **Componentes Visuais**

### **1. Barra de Progresso Circular**
```
    85%
   ┌─────┐
  │  🎯  │  Meta Mensal
  │ 85%  │  R$ 2.550 / R$ 3.000
   └─────┘
```

### **2. Cards com Status**
```
┌─────────────────────────┐
│ 🏠 Moradia         82% │
│ R$ 980,00 / R$ 1.200   │
│ ████████░░ Restam R$220│
└─────────────────────────┘
```

### **3. Resumo Visual**
```
📊 Resumo do Mês
┌─────────────────┐
│ ✅ 3 Metas OK   │
│ ⚠️  2 Atenção   │
│ ❌ 1 Excedida   │
└─────────────────┘
```

---

## 🚀 **Funcionalidades Principais**

### **1. Criar Nova Meta**
- **Tipo**: Gasto mensal, por categoria, economia, cartão
- **Valor**: Input numérico com formatação R$
- **Período**: Mensal, semanal, anual
- **Categoria**: Seleção de categoria (se aplicável)
- **Notificações**: Alertas quando atingir 80%, 90%, 100%

### **2. Acompanhar Progresso**
- **Barra visual** com cores semânticas
- **Percentual** em tempo real
- **Valor restante** ou excedido
- **Dias restantes** no período

### **3. Histórico de Metas**
- **Metas anteriores** com resultado
- **Gráfico de evolução** mensal
- **Taxa de sucesso** geral

### **4. Alertas e Notificações**
- **80% da meta**: "⚠️ Atenção! Você já gastou 80% da sua meta"
- **100% da meta**: "🚨 Meta atingida! Cuidado com os gastos"
- **Meta excedida**: "❌ Você excedeu sua meta em R$ 150,00"

---

## 🎯 **Estrutura de Dados**

### **Modelo de Meta:**
```typescript
interface Meta {
  id: string;
  tipo: 'gasto-mensal' | 'categoria' | 'economia' | 'cartao';
  nome: string;
  valorMeta: number;
  valorAtual: number;
  categoriaId?: number; // Para metas por categoria
  periodo: 'mensal' | 'semanal' | 'anual';
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
  notificacoes: {
    percentual80: boolean;
    percentual90: boolean;
    percentual100: boolean;
  };
}
```

### **API Endpoints:**
```typescript
// Listar metas do usuário
GET /metas/usuario/{userId}

// Criar nova meta
POST /metas

// Atualizar meta
PUT /metas/{id}

// Deletar meta
DELETE /metas/{id}

// Obter progresso atual
GET /metas/{id}/progresso
```

---

## 🎨 **Implementação com Design System**

### **Cores por Status:**
```typescript
const metaColors = {
  sucesso: colors.success,     // Verde - meta OK
  atencao: colors.warning,     // Amarelo - 80-99%
  excedida: colors.error,      // Vermelho - >100%
  economia: colors.info,       // Azul - metas de economia
};
```

### **Componentes:**
```typescript
// Card de Meta
<MetaCard 
  meta={meta}
  progresso={85}
  status="atencao"
  onEdit={() => {}}
  onDelete={() => {}}
/>

// Barra de Progresso
<ProgressBar 
  value={85}
  max={100}
  color={colors.warning}
  showPercentage={true}
/>

// Botão Nova Meta
<TouchableOpacity style={components.buttonPrimary}>
  <Ionicons name="add" size={20} color={colors.white} />
  <Text>Nova Meta</Text>
</TouchableOpacity>
```

---

## 📱 **Fluxo de Navegação**

### **1. Tela Principal de Metas**
```
🎯 Minhas Metas
├── Card: Meta Mensal (principal)
├── Lista: Outras metas
├── Botão: + Nova Meta
└── Resumo: Status geral
```

### **2. Criar/Editar Meta**
```
📝 Nova Meta
├── Tipo de Meta (radio buttons)
├── Nome da Meta
├── Valor da Meta
├── Categoria (se aplicável)
├── Período
├── Notificações (switches)
└── Botões: Cancelar | Salvar
```

### **3. Detalhes da Meta**
```
📊 Detalhes da Meta
├── Progresso visual grande
├── Histórico de gastos
├── Gráfico de evolução
├── Botões: Editar | Excluir
└── Dicas para atingir meta
```

---

## 🎯 **Recursos Avançados (Futuro)**

### **1. Metas Inteligentes**
- **Sugestão automática** baseada no histórico
- **Ajuste dinâmico** conforme padrão de gastos
- **Metas sazonais** (Natal, férias, etc.)

### **2. Gamificação**
- **Pontos** por metas atingidas
- **Badges** de conquistas
- **Ranking** familiar/amigos
- **Desafios** mensais

### **3. Análises Avançadas**
- **Previsão** de atingimento da meta
- **Comparativo** com meses anteriores
- **Sugestões** de economia
- **Relatórios** detalhados

---

## 🚀 **Implementação Sugerida**

### **Fase 1 - MVP:**
1. ✅ Criar meta de gasto mensal
2. ✅ Visualizar progresso com barra
3. ✅ Alertas básicos (80%, 100%)
4. ✅ Editar/excluir metas

### **Fase 2 - Melhorias:**
1. 🔄 Metas por categoria
2. 🔄 Histórico de metas
3. 🔄 Gráficos de evolução
4. 🔄 Notificações push

### **Fase 3 - Avançado:**
1. 🔮 Metas de economia
2. 🔮 Metas de cartão
3. 🔮 Gamificação
4. 🔮 IA para sugestões

---

## 💡 **Dicas de UX**

### **1. Visual:**
- **Cores intuitivas**: Verde = bom, Amarelo = atenção, Vermelho = problema
- **Progresso claro**: Barras grandes e visíveis
- **Números destacados**: Valores em destaque

### **2. Interação:**
- **Swipe para editar**: Deslizar card para opções
- **Tap para detalhes**: Tocar para ver mais informações
- **Pull to refresh**: Atualizar dados puxando para baixo

### **3. Feedback:**
- **Animações**: Progresso animado
- **Haptic feedback**: Vibração em ações importantes
- **Toasts**: Mensagens de sucesso/erro

---

**🎯 A tela de metas será o coração do controle financeiro do usuário!**