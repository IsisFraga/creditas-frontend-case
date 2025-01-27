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

### Deploy
O projeto está hospedado na Vercel com CI/CD automático:
```bash

# Deploy manual (caso necessário)

npm run build

vercel --prod

```

Configurações do projeto na Vercel:

- Framework Preset: Next.js

- Build Command: npm run build

- Output Directory: .next

- Environment Variables: Configuradas via dashboard da Vercel


Acesse o projeto aqui > https://creditas-frontend-case-jt0fid2z0-isisfragas-projects.vercel.app/


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

### Estrutura do Projeto

```

src/

├── app/               # Configurações da aplicação Next.js

├── components/        # Componentes React reutilizáveis

├── constants/         # Constantes da aplicação

├── contexts/         # Contextos React

├── hooks/            # Hooks customizados

├── services/         # Serviços da aplicação

│   └── LoanCalculator/

│       └── index.ts

├── styles/           # Estilos e temas

├── types/            # TypeScript types

└── utils/            # Utilitários

    ├── tests/

    ├── analysis.ts

    ├── calculations.ts

    ├── dateValidations.ts

    ├── formatters.ts

    └── validators.ts

Arquivos de Configuração:

├── .gitignore

├── .next/

├── .swc/

├── .vercel/

├── coverage/

├── cypress/

├── cypress.config.ts

├── eslint.config.mjs

├── jest.config.ts

├── jest.setup.ts

├── next-env.d.ts

├── next.config.js

├── package.json

├── package-lock.json

├── postcss.config.mjs

├── README.md

└── tsconfig.json

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