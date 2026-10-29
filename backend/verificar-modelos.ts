import dotenv from "dotenv";
dotenv.config();

async function listarModelos() {
  const chave = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${chave}`,
  );
  const dados = await resposta.json();

  console.log("Modelos exatos liberados para a sua chave:");
  dados.models.forEach((modelo: any) => console.log(modelo.name));
}

listarModelos();
