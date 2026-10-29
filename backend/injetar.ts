import db from "./src/db/database";

db.run(
  `INSERT OR IGNORE INTO usuarios (id, nome, email, departamento, senha) 
        VALUES (1, 'Ana Souza', 'ana.souza@nexo.com.br', 'Financeiro', '123')`,
  function (err) {
    if (err) {
      console.error("Erro no utilizador:", err.message);
      return;
    }

    db.run(
      `INSERT OR REPLACE INTO chamados (id, usuario_id, status, resumo_ia, data_criacao) 
            VALUES ('INC-2041', 1, 'pendente', 'Esqueci a minha senha do portal de RH', CURRENT_TIMESTAMP)`,
      function (err2) {
        if (err2) console.error("Erro no chamado:", err2.message);
        else
          console.log(
            "✅ Dados restaurados: Utilizador e Chamado inseridos com sucesso!",
          );
      },
    );
  },
);
