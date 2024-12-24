# Teste prático: Gerenciamento de Usuários

## Instruções para Rodar

### Configuração e inicialização da API Fake

1. Instale o JSON Server:
   ```bash
   npm install -g json-server
   ```
2. Inicie o servidor:
   ```bash
   npm run server
   ```
4. Endereços da API:
   - Usuários: `http://localhost:3000/usuarios`
   - Login: `http://localhost:3000/login`

### Configuração e inicialização do Projeto Vue

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo .env e insira a variável a seguir:
   ```gradle
   VITE_BASE_URL=http://localhost:3000
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```
