# 🚀 Sistema de Login e Cadastro

Um sistema completo de autenticação com interface moderna, tema escuro e backend robusto utilizando Node.js e MySQL.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este projeto é um sistema completo de autenticação que permite aos usuários se cadastrarem e fazerem login de forma segura. Desenvolvido com foco na experiência do usuário, conta com design responsivo e modo escuro.

### ✨ Destaques
- 🌙 **Tema Escuro/Claro** - Alternância suave entre temas
- 📱 **Design Responsivo** - Funciona perfeitamente em dispositivos móveis
- 🔒 **Validação Robusta** - Validações tanto no frontend quanto no backend
- ⚡ **Interface Moderna** - Design limpo e intuitivo
- 🛡️ **Segurança** - Prevenção de duplicação de emails

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- [x] Cadastro de novos usuários
- [x] Login com email e senha
- [x] Validação de confirmação de senha
- [x] Verificação de emails duplicados
- [x] Validação de campos obrigatórios

### 🎨 Interface do Usuário
- [x] Tema escuro/claro com toggle
- [x] Design responsivo para mobile
- [x] Animações suaves e transições
- [x] Feedback visual com alerts
- [x] Formulários estilizados

### 🛠️ Backend
- [x] API RESTful com Express.js
- [x] Conexão segura com MySQL
- [x] Tratamento de erros
- [x] Validação de dados no servidor
- [x] Respostas JSON estruturadas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
- **JavaScript ES6+** - Interatividade e requisições

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver para MySQL
- **Body-parser** - Parse de dados HTTP

### Banco de Dados
- **MySQL** - Sistema de gerenciamento de banco de dados

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8.0 ou superior)
- [Git](https://git-scm.com/)

## ⚙️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sistema-login-cadastro.git
cd sistema-login-cadastro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

4. **Edite o arquivo .env com suas configurações**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=formulario_db
PORT=3000
```

## 🗃️ Configuração do Banco de Dados

1. **Acesse o MySQL Workbench ou terminal**

2. **Execute os seguintes comandos SQL:**
```sql
-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS formulario_db;

-- Usar o banco criado
USE formulario_db;

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **Verificar se a tabela foi criada:**
```sql
DESCRIBE usuarios;
```

## 🚀 Como Usar

1. **Inicie o servidor**
```bash
npm start
# ou
node server.js
```

2. **Acesse a aplicação**
```
http://localhost:3000
```

3. **Navegue pelas funcionalidades:**
   - Página de Login: `http://localhost:3000/index.html`
   - Página de Cadastro: `http://localhost:3000/registrar.html`

## 📁 Estrutura do Projeto

```
sistema-login-cadastro/
├── assets/
│   ├── img/
│   │   └── formulario.svg
│   ├── styles.css
│   └── script.js
├── index.html              # Página de login
├── registrar.html          # Página de cadastro
├── server.js              # Servidor Express
├── package.json           # Dependências do projeto
├── .env                   # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
└── README.md             # Documentação
```

## 🔌 API Endpoints

### POST /register
Cadastra um novo usuário no sistema.

**Requisição:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "minhasenha123",
  "confirmPassword": "minhasenha123"
}
```

**Resposta de Sucesso (200):**
```
"Cadastro realizado com sucesso!"
```

**Resposta de Erro (400):**
```
"Este email já está cadastrado."
```

### POST /login
Realiza o login do usuário.

**Requisição:**
```json
{
  "email": "joao@email.com",
  "password": "minhasenha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Login realizado!",
  "nome": "João Silva"
}
```

**Resposta de Erro (401):**
```
"Email ou senha inválidos."
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor
Por: Gabriel Lins
