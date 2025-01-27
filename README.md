# Simulador de Crédito

## 1. Setup do Projeto

### Requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Servidor de produção
npm test         # Executa testes
```

### Temas
A aplicação suporta tema claro e escuro, utilizando por padrão o tema do sistema operacional do usuário. Para alternar, basta clicar no ícone de sol ou lua no header.

## 2. Guia de Uso da Aplicação

### Simulação de Empréstimo
```typescript
import { useContext } from 'react';
import { LoanCalculatorContext } from './context/LoanCalculator';

function SimuladorEmprestimo() {
  const { formData, handleFormChange, handleSubmit } = useContext(LoanCalculatorContext);

  return (
    <form onSubmit={handleSubmit}>
      {/* Valor do Empréstimo - Mínimo R$1.000 */}
      <input
        value={formData.loanAmount}
        onChange={(e) => handleFormChange('loanAmount', e.target.value)}
      />
      
      {/* Prazo em Meses - Mínimo 12 meses */}
      <input
        value={formData.months}
        onChange={(e) => handleFormChange('months', e.target.value)}
      />
      
      {/* Data de Nascimento - Mínimo 18 anos */}
      <input
        type="date"
        value={formData.birthDate}
        onChange={(e) => handleFormChange('birthDate', e.target.value)}
      />
    </form>
  );
}
```

### Taxas de Juros
- Até 25 anos: 5% a.a.
- 26-40 anos: 3% a.a.
- 41-60 anos: 2% a.a.
- 60+ anos: 4% a.a.

## 3. Estrutura e Arquitetura

### Organização do Projeto
```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Form/           # Componentes de formulário
│   └── Results/        # Componentes de exibição de resultados
├── context/            # Contextos React
│   ├── LoanCalculator/ # Gerenciamento de estado da simulação
│   └── ThemeContext/   # Gerenciamento de tema claro/escuro
├── hooks/              # Hooks customizados
├── styles/             # Temas e estilos globais
├── types/              # TypeScript types e interfaces
└── utils/              # Utilitários e cálculos
```

### Decisões Arquiteturais

1. **Gerenciamento de Estado**
   - Context API para estado global
   - Estado local com hooks quando apropriado
   - Validações em tempo real

2. **Padrões de Projeto**
   - Provider Pattern para injeção de dependências
   - Factory Pattern para cálculos financeiros
   - Strategy Pattern para diferentes regras de juros

3. **Performance e UX**
   - Lazy loading de componentes
   - Memoização de cálculos pesados
   - PWA para funcionamento offline
   - Tema adaptativo baseado na preferência do usuário

4. **Qualidade**
   - TypeScript para tipagem estática
   - Jest para testes unitários
   - Cypress para testes E2E
   - ESLint + Prettier para padronização