

# NewCare 

NewCare é um aplicativo mobile gamificado para ajudar na evolução de hábitos de saúde física, mental, lazer e sono. O app acompanha o progresso do usuário e incentiva a rotina saudável de forma divertida.

---

## Passo a passo para rodar o projeto com Expo

1. **Pré-requisitos:**
  - Node.js instalado (recomendado versão LTS)
  - npm instalado (vem junto com o Node.js)
  - Git instalado

2. **Clone o repositório:**
  ```bash
  git clone https://github.com/jefbiel/NewCare_Sprint3.git
  cd NewCare_Sprint3/newcare
  ```

3. **Instale o Expo CLI globalmente (se ainda não tiver):**
  ```bash
  npm install -g expo-cli
  ```

4. **Instale as dependências do projeto:**
  ```bash
  npm install
  ```

5. **Inicie o servidor de desenvolvimento Expo:**
  ```bash
  npx expo start -c
  ```

6. **Execute o app:**
  - No terminal do Expo, escolha:
    - `a` para Android Emulator (precisa ter Android Studio instalado)
    - `i` para iOS Simulator (apenas em Mac, precisa do Xcode)
    - `w` para rodar no navegador (Web)
    - Ou escaneie o QR Code com o app Expo Go no seu celular

---

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

