const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const os = require('os');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Conexão com o banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "admin",       
  database: "formulario_db"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso.");
});

// Rota de cadastro
app.post("/register", (req, res) => {
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Campos obrigatórios.");
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).send("Erro no servidor.");

    if (results.length === 0) {
      return res.status(401).send("Email ou senha inválidos.");
    }

    const user = results[0];
    res.status(200).json({ message: "Login realizado!", nome: user.nome });
  });
});

// Função para obter IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(port, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log(`🚀 Servidor rodando em:`);
  console.log(`   Local:    http://localhost:${port}`);
  console.log(`   Rede:     http://${localIP}:${port}`);
  console.log(`📱 Para acessar no celular, use: http://${localIP}:${port}`);
});