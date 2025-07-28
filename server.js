const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Configuração do banco para Railway
let db;

function createConnection() {
  // Railway fornece a URL completa do MySQL
  if (process.env.MYSQL_URL) {
    // Usar a URL completa do MySQL fornecida pelo Railway
    db = mysql.createConnection(process.env.MYSQL_URL);
  } else {
    // Configuração local para desenvolvimento
    db = mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "admin",
      database: process.env.MYSQL_DATABASE || "formulario_db"
    });
  }

  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        reject(err);
        return;
      }
      console.log("✅ Conectado ao MySQL com sucesso.");
      resolve();
    });
  });
}

// Criar tabela se não existir
function createTable() {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createTableQuery, (err) => {
      if (err) {
        console.error("Erro ao criar tabela:", err);
        reject(err);
      } else {
        console.log("✅ Tabela usuarios verificada/criada com sucesso.");
        resolve();
      }
    });
  });
}

// Inicializar conexão com retry
async function initializeDatabase() {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await createConnection();
      await createTable();
      return;
    } catch (error) {
      retries++;
      console.log(`❌ Tentativa ${retries}/${maxRetries} falhou. Tentando novamente em 5s...`);
      
      if (retries >= maxRetries) {
        console.error("❌ Máximo de tentativas excedido. Iniciando sem banco de dados.");
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Rota de cadastro
app.post("/register", (req, res) => {
  if (!db) {
    return res.status(500).send("Banco de dados não disponível.");
  }

  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send("Preencha todos os campos.");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("As senhas não coincidem.");
  }

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Erro no cadastro:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send("Este email já está cadastrado.");
      }
      return res.status(500).send("Erro no servidor.");
    }
    res.status(200).send("Cadastro realizado com sucesso!");
  });
});

// Rota de login
app.post("/login", (req, res) => {
  if (!db) {
    return res.status(500).send("Banco de dados não disponível.");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Campos obrigatórios.");
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Erro no login:", err);
      return res.status(500).send("Erro no servidor.");
    }

    if (results.length === 0) {
      return res.status(401).send("Email ou senha inválidos.");
    }

    const user = results[0];
    res.status(200).json({ message: "Login realizado!", nome: user.nome });
  });
});

// Rota para página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ 
    message: "Servidor funcionando!",
    database: db ? "Conectado" : "Desconectado",
    env: process.env.NODE_ENV || "development"
  });
});

// Inicializar banco e servidor
async function startServer() {
  console.log("🚀 Iniciando servidor...");
  
  // Tentar conectar ao banco
  await initializeDatabase();
  
  // Iniciar servidor
  app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
    console.log(`🌐 Variáveis de ambiente carregadas:`);
    console.log(`   - MYSQL_URL: ${process.env.MYSQL_URL ? 'Definida' : 'Não definida'}`);
    console.log(`   - MYSQL_HOST: ${process.env.MYSQL_HOST || 'localhost'}`);
    console.log(`   - PORT: ${port}`);
  });
}

startServer().catch(console.error);
