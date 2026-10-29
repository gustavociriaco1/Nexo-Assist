import db from "./database";

console.log("🌱 A iniciar a injeção de dados de teste...");

db.serialize(() => {
  // 1. Inserir Usuários (Ignora se já existirem)
  db.run(`INSERT OR IGNORE INTO usuarios (id, nome, email, departamento, perfil) VALUES 
    ('U1', 'Ana Souza', 'ana.souza@nexo.com.br', 'Financeiro', 'cliente'),
    ('A1', 'Rafael Lima', 'rafael.lima@nexo.com.br', 'Suporte N2', 'atendente')
  `);

  // 2. Inserir um Chamado de teste
  db.run(`INSERT OR IGNORE INTO chamados (id, usuario_id, status, resumo_ia) VALUES 
    ('INC-2041', 'U1', 'pendente', 'Falha de conexão com a VPN corporativa.')
  `);

  // 3. Inserir o histórico inicial de mensagens
  db.run(`INSERT OR IGNORE INTO mensagens (chamado_id, autor, texto) VALUES 
    ('INC-2041', 'ia', 'Olá, Ana. Sou o Nexo Assist. Como posso ajudar com o seu equipamento ou acesso hoje?'),
    ('INC-2041', 'usuario', 'Minha VPN não conecta desde a atualização.')
  `);

  console.log("✅ Dados de teste inseridos com sucesso no SQLite!");
});
