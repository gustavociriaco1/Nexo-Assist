import sqlite3 from "sqlite3";
import path from "path";

// Cria o arquivo database.sqlite na raiz do backend (ou conecta se já existir)
const dbPath = path.resolve(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao SQLite:", err.message);
  } else {
    console.log("📦 Conectado ao banco de dados SQLite.");
    inicializarTabelas();
  }
});

function inicializarTabelas() {
  db.serialize(() => {
    // 1. Tabela de Usuários (Clientes e Atendentes)
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      departamento TEXT,
      perfil TEXT NOT NULL -- 'cliente' ou 'atendente'
    )`);

    // 2. Tabela de Chamados (Fila de TI)
    db.run(`CREATE TABLE IF NOT EXISTS chamados (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      status TEXT NOT NULL, -- 'pendente', 'em_andamento', 'resolvido'
      resumo_ia TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )`);

    // 3. Tabela de Mensagens (O histórico do chat de 3 colunas)
    db.run(`CREATE TABLE IF NOT EXISTS mensagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chamado_id TEXT NOT NULL,
      autor TEXT NOT NULL, -- 'usuario', 'agente', 'ia'
      texto TEXT NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chamado_id) REFERENCES chamados (id)
    )`);

    console.log("Tabelas verificadas/criadas com sucesso.");
  });
}

export default db;
