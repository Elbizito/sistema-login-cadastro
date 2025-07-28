# 🚀 Sistema de Login e Cadastro

📍 ACESSE O FORMULARIO AQUI: https://sistema-login-cadastro-production.up.railway.app/index.html

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este projeto é um sistema de autenticação frontend que permite aos usuários se cadastrarem e fazerem login utilizando localStorage para persistência de dados. Desenvolvido com foco na experiência do usuário, conta com design responsivo e modo escuro.

### ✨ Destaques
- 🌙 **Tema Escuro/Claro** - Alternância suave entre temas
- 📱 **Design Responsivo** - Funciona perfeitamente em dispositivos móveis
- 🔒 **Validação Robusta** - Validações completas no frontend
- ⚡ **Interface Moderna** - Design limpo e intuitivo
- 🛡️ **Segurança** - Prevenção de duplicação de emails
- 💾 **Armazenamento Local** - Dados persistem no navegador via localStorage

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- [x] Cadastro de novos usuários
- [x] Login com email e senha
- [x] Validação de confirmação de senha
- [x] Verificação de emails duplicados
- [x] Validação de campos obrigatórios
- [x] Persistência de dados no localStorage

### 🎨 Interface do Usuário
- [x] Tema escuro/claro com toggle
- [x] Design responsivo para mobile
- [x] Animações suaves e transições
- [x] Feedback visual com alerts
- [x] Formulários estilizados

### 🛠️ Backend (Node.js)
- [x] Servidor Express.js para servir arquivos estáticos
- [x] Deploy no Railway
- [x] Tratamento de rotas
- [x] Configuração para produção

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
- **JavaScript ES6+** - Lógica de autenticação e interatividade
- **localStorage** - Persistência de dados no navegador

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Servidor web para servir arquivos estáticos

### Deploy
- **Railway** - Plataforma de hospedagem

## 🏗️ Arquitetura do Sistema

### 📊 Como os Dados São Gerenciados

Este sistema utiliza uma **arquitetura frontend-first** com armazenamento local:

#### 🖥️ **Frontend (JavaScript + localStorage)**
- **Cadastro**: Validação e armazenamento de novos usuários no localStorage
- **Login**: Verificação de credenciais contra dados salvos localmente
- **Validação**: Verificação de emails duplicados e validação de senhas
- **Sessão**: Manutenção do estado de login do usuário
- **Preferências**: Configurações como tema escuro/claro

#### ⚙️ **Backend (Node.js + Express)**
- **Servidor Estático**: Serve os arquivos HTML, CSS e JS
- **Roteamento**: Gerencia as rotas da aplicação
- **Deploy**: Configurado para produção no Railway

#### 🔗 **Fluxo de Dados**
1. **Cadastro**: Frontend valida → Salva no localStorage
2. **Login**: Frontend verifica → localStorage
3. **Sessão**: Mantida no localStorage
4. **Preferências**: Salvas no localStorage

#### 💾 **Estrutura dos Dados no localStorage**
```javascript
// Usuários cadastrados
localStorage.setItem('users', JSON.stringify([
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    password: "senha123"
  }
]));

// Usuário logado
localStorage.setItem('currentUser', JSON.stringify({
  name: "João Silva",
  email: "joao@email.com"
}));

// Preferências
localStorage.setItem('theme', 'dark');
```

> **Nota**: Este sistema é ideal para projetos de demonstração, portfólios e aplicações que não requerem persistência de dados entre diferentes dispositivos. Para aplicações em produção com múltiplos usuários, considere integrar com um banco de dados real.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
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

3. **Configure o arquivo package.json (se necessário)**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

## 🚀 Como Usar

### 💻 **Desenvolvimento Local**

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

### 🌐 **Acesso Online (Railway)**

A aplicação está hospedada no Railway e pode ser acessada através da URL:
```
https://sistema-login-cadastro-production.up.railway.app
```

### 📱 **Navegação**
- **Página de Login**: `index.html`
- **Página de Cadastro**: `registrar.html`

### 📱 **Compatibilidade Mobile**
A aplicação é totalmente responsiva e funciona perfeitamente em:
- 📱 Smartphones (iOS/Android)
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores ultrawide

## 📁 Estrutura do Projeto

```
sistema-login-cadastro/
├── assets/
│   ├── img/
│   │   └── formulario.svg
│   ├── styles.css           # Estilos CSS principais
│   └── script.js            # Lógica JavaScript (localStorage)
├── index.html               # Página de login
├── registrar.html           # Página de cadastro
├── server.js               # Servidor Express (arquivos estáticos)
├── package.json            # Dependências e scripts
├── .gitignore             # Arquivos ignorados pelo Git
└── README.md              # Documentação
```

## 🔧 Funcionalidades Detalhadas

### 📝 **Sistema de Cadastro**
- Validação de campos obrigatórios
- Verificação de confirmação de senha
- Prevenção de emails duplicados
- Armazenamento seguro no localStorage

### 🔑 **Sistema de Login**
- Autenticação via email e senha
- Verificação contra dados salvos
- Manutenção de sessão ativa
- Redirecionamento automático

### 🎨 **Personalização**
- Toggle tema escuro/claro
- Preferências salvas automaticamente
- Design responsivo
- Animações suaves

## 👨‍💻 Autor
Por: Gabriel Lins
