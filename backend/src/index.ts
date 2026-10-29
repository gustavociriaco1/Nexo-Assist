import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/database";
import rotasApi from "./rotas";
dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", rotasApi);

app.listen(PORTA, () => {
  console.log(`🚀 Servidor inicializado na porta ${PORTA}`);
});
