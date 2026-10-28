import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

// Middlewares para segurança e leitura de JSON
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/api/status", (req, res) => {
  res.json({
    status: "ativo",
    mensagem: "Backend do Nexo Assist a correr perfeitamente!",
  });
});

app.listen(PORTA, () => {
  console.log(`🚀 Servidor inicializado na porta ${PORTA}`);
});
