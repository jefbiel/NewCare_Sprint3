
# LifeQuest

LifeQuest é um aplicativo mobile gamificado para evolução de hábitos de saúde física, saúde mental, lazer e sono. O app não realiza diagnóstico, prescrição ou telemedicina; ele apenas organiza missões de bem-estar e mostra progresso do usuário.

## Funcionalidades

- Login com validação de e-mail e senha.
- Sessão local persistida com AsyncStorage.
- Onboarding com foco, tempo diário disponível e nível atual.
- Geração de missões personalizadas.
- Missões pendentes, concluídas e adicionadas pelo usuário.
- Liberação de novas missões quando metade das missões atuais foi concluída.
- XP, níveis, moedas, streak e dia perfeito.
- Conquistas desbloqueáveis.
- Perfil editável com avatar, nome, área dominante, preferências e meta diária.
- Barra de progresso da meta diária no perfil.
- Feedback visual para erros, loading, conclusão de missão e criação de missão.
- Tela de carregamento inicial enquanto os dados locais são restaurados.

## Estrutura

```txt
src/
  components/
    Botao.tsx
    CardMissao.tsx
  context/
    AppContext.tsx
  data/
    missoes.ts
  routes/
    AppNavigator.tsx
    types.ts
  screens/
    LoginScreen.tsx
    OnboardingScreen.tsx
    HomeScreen.tsx
    HabitosScreen.tsx
    ProgressoScreen.tsx
    PerfilScreen.tsx
  services/
    storage.ts
  types/
    index.ts
```

## Tecnologias

- Expo
- React Native
- TypeScript
- React Navigation
- AsyncStorage
- ESLint

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start -c
```

Depois escolha uma opção no terminal:

```txt
a  Android Emulator
i  iOS Simulator
w  navegador
```

## Login de teste

O app aceita qualquer e-mail válido e senha com pelo menos 6 caracteres.

Exemplo:

```txt
email: teste@email.com
senha: 123456
```

## Scripts úteis

Validar TypeScript:

```bash
./node_modules/.bin/tsc --noEmit
```

Rodar lint:

```bash
npm run lint
```

Verificar compatibilidade Expo:

```bash
npx expo install --check
```

## Demonstração

Adicione screenshots na pasta `docs/screenshots` ou um vídeo curto demonstrando:

- Login
- Onboarding
- Home
- Missões
- Progresso
- Perfil

## Checklist Sprint 3

### Estrutura do projeto e TypeScript

- Projeto organizado por pastas: `screens`, `services`, `components`, `context`, `routes`, `data` e `types`.
- `strict` ativado no `tsconfig.json`.
- Interfaces, enums e types centralizados em `src/types`.
- Navegação tipada em `src/routes/types.ts`.
- Código em `src` sem uso de `any`.

### Telas e navegação

- Mais de 3 telas funcionais: Login, Onboarding, Home, Missões, Progresso e Perfil.
- Navegação com Stack e Bottom Tabs.
- Componentes nativos utilizados: `FlatList`, `ScrollView`, `Image`, `TextInput`, `Switch`, `TouchableOpacity`.
- Formulários com validação no Login, Onboarding, Missões e Perfil.
- Feedback visual com loading, alerts de erro e alerts de sucesso.

### Gerenciamento de estado

- `useState` e `useEffect` usados com dados tipados.
- Estado global centralizado em `AppContext`.
- XP, moedas, streak, conquistas, missões e preferências refletem ações do usuário em tempo real.
- Fluxo de autenticação funcional com sessão local.

### Persistência local

- `AsyncStorage` usado em `src/services/storage.ts`.
- Sessão do usuário, missões, progresso e preferências são salvos localmente.
- Dados restaurados na abertura do app com tela de carregamento inicial.

### Documentação

- README com descrição do projeto.
- Instruções de execução com Expo.
- Tecnologias utilizadas.
- Espaço reservado para screenshots ou vídeo curto de demonstração.
