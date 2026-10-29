import { Router } from "express";
import db from "./db/database";
import { agenteSuporte } from "./agente";

const router = Router();

router.get("/chamados", (req, res) => {
  const query = `
    SELECT c.id, c.status, c.resumo_ia, c.data_criacao, u.nome as usuario, u.departamento 
    FROM chamados c 
    JOIN usuarios u ON c.usuario_id = u.id
  `;

  db.all(query, [], (err, linhas) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(linhas);
  });
});

// Rota para buscar o histórico de um chat
router.get("/chamados/:id/mensagens", (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT * FROM mensagens WHERE chamado_id = ? ORDER BY id ASC`,
    [id],
    (err, linhas) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(linhas);
    },
  );
});

// 3. Rota principal: Recebe a mensagem e aciona a Inteligência Artificial
router.post("/mensagens", (req, res) => {
  const { chamado_id, texto, autor } = req.body;

  // Passo A: Grava a mensagem do utilizador no SQLite
  db.run(
    `INSERT INTO mensagens (chamado_id, autor, texto) VALUES (?, ?, ?)`,
    [chamado_id, autor, texto],
    async function (err) {
      if (err) return res.status(500).json({ erro: err.message });

      // Se a mensagem veio do utilizador, a IA deve pensar e responder
      if (autor === "usuario") {
        try {
          // Passo B: Envia o texto para o Gemini (via Mastra)
          const respostaMastra = await agenteSuporte.generate(texto);
          const textoIA = respostaMastra.text;

          // Passo C: Grava a resposta gerada pela IA no banco de dados
          db.run(
            `INSERT INTO mensagens (chamado_id, autor, texto) VALUES (?, 'ia', ?)`,
            [chamado_id, textoIA],
            function (err2) {
              if (err2) return res.status(500).json({ erro: err2.message });

              // Devolve o sucesso e o texto da IA para a interface
              res.json({ sucesso: true, resposta: textoIA });
            },
          );
        } catch (erroIA) {
          console.error("Erro na comunicação com a IA:", erroIA);
          res.status(500).json({
            erro: "O agente Nexo Assist está temporariamente indisponível.",
          });
        }
      } else {
        // Se for o analista humano a responder, apenas grava e confirma
        res.json({
          sucesso: true,
          resposta: "Mensagem do analista registada com sucesso.",
        });
      }
    },
  );
});

export default router;
