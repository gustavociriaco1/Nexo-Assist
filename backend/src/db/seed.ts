import db from "./database";

console.log("A iniciar a reconstrução do banco de dados...");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      departamento TEXT,
      senha TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS chamados (
      id TEXT PRIMARY KEY,
      usuario_id INTEGER,
      status TEXT,
      resumo_ia TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS mensagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chamado_id TEXT,
      autor TEXT,
      texto TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chamado_id) REFERENCES chamados(id)
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO usuarios (id, nome, email, departamento, senha) 
    VALUES (1, 'Ana Souza', 'ana.souza@nexo.com.br', 'Financeiro', '123')
  `);

  db.run(
    `
    INSERT OR REPLACE INTO chamados (id, usuario_id, status, resumo_ia) 
    VALUES ('INC-2041', 1, 'pendente', 'Problema com a VPN após a atualização')
  `,
    (err) => {
      if (err) {
        console.error("Erro ao inserir chamado:", err);
      } else {
        console.log("✅ Banco de dados reconstruído e populado com sucesso!");
      }
    },
  );
});
