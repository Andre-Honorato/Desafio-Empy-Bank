# Desafio Empy Bank

## Instalação

É necessário ter o runtime do Node.js instalado localmente em sua máquina. As versões utilizadas neste ambiente foram:

- **Node.js**: 20.10.0
- **NPM**: 10.2.3

Após a instalação, instale todas as dependências de ambos os projetos executando o seguinte comando na raiz de cada um (frontend e backend):

```bash
npm install
```

## Configuração

Ambos os sistemas possuem variáveis de ambiente que precisam ser configuradas. Para ajudar na configuração, cada um contém um arquivo **.env.example** que serve como exemplo de como preencher as informações.

### Frontend

- **VITE_API_BASE_URL**: URL base da API.

### Backend

- **DATABASE_URL**: URL correspondente ao banco de dados MySQL.
- **PORT**: Número da porta onde a API irá executar (por padrão, a porta é **5000**).

## Prisma

Antes de executar a aplicação, é necessário iniciar o Prisma e criar as tabelas no banco de dados. Para isso, rode os seguintes comandos na raiz do backend:

```bash
npx prisma generate
npx prisma migrate dev
```

## Execução

Para rodar a aplicação localmente, basta executar o seguinte comando em ambos os sistemas:

```bash
npm run dev
```

Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente e que o banco de dados está rodando localmente com as tabelas já criadas.

## Deploy

Caso queira ver o deploy do sistema, [clique aqui](https://desafio-empy-bank-frontend.vercel.app/)
