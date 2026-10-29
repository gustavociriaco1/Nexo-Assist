import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";

interface Mensagem {
  id: number;
  chamado_id: string;
  autor: "usuario" | "agente" | "ia";
  texto: string;
  data_criacao: string;
}

export default function Atendimento() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fimDoChatRef = useRef<HTMLDivElement>(null);

  // Busca o histórico real no banco de dados
  const carregarMensagens = () => {
    fetch("http://localhost:3000/api/chamados/INC-2041/mensagens")
      .then((res) => res.json())
      .then((dados) => setMensagens(dados))
      .catch((erro) => console.error("Erro ao carregar:", erro));
  };

  useEffect(() => {
    carregarMensagens();
  }, []);

  // Faz o scroll automático para o fundo
  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, carregando]);

  // Envia a mensagem e aciona a IA
  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    setCarregando(true);
    const texto = novaMensagem;
    setNovaMensagem("");

    try {
      await fetch("http://localhost:3000/api/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chamado_id: "INC-2041",
          texto: texto,
          autor: "usuario",
        }),
      });
      carregarMensagens(); // Recarrega para exibir a resposta da IA
    } catch (erro) {
      console.error("Erro ao enviar:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
        bgcolor: "#f8fafc",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      {/* Área de Mensagens */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {mensagens.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.autor === "usuario" ? "flex-end" : "flex-start",
              maxWidth: "75%",
              display: "flex",
              gap: 2,
            }}
          >
            {msg.autor !== "usuario" && (
              <Avatar
                sx={{
                  bgcolor: "#0056b3",
                  color: "white",
                  width: 32,
                  height: 32,
                  fontSize: "0.875rem",
                }}
              >
                {msg.autor === "ia" ? "N" : "A"}
              </Avatar>
            )}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: msg.autor === "usuario" ? "#0056b3" : "#ffffff",
                  color: msg.autor === "usuario" ? "#ffffff" : "text.primary",
                  border:
                    msg.autor === "usuario" ? "none" : "1px solid #e0e0e0",
                  borderRadius: 2,
                  borderTopRightRadius: msg.autor === "usuario" ? 0 : 8,
                  borderTopLeftRadius: msg.autor !== "usuario" ? 0 : 8,
                }}
              >
                <Typography variant="body2">{msg.texto}</Typography>
              </Paper>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mt: 0.5,
                  textAlign: msg.autor === "usuario" ? "right" : "left",
                }}
              >
                {new Date(msg.data_criacao).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
        ))}
        {carregando && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              alignSelf: "flex-start",
            }}
          >
            <CircularProgress size={16} />
            <Typography variant="caption" color="text.secondary">
              Nexo Assist a processar resposta...
            </Typography>
          </Box>
        )}
        <div ref={fimDoChatRef} />
      </Box>

      {/* Input de Texto */}
      <Box sx={{ p: 2, bgcolor: "#ffffff", borderTop: "1px solid #e0e0e0" }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 0.5,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Descreva seu problema (ex: Minha VPN não conecta)..."
            variant="standard"
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
            disabled={carregando}
            slotProps={{
              input: {
                disableUnderline: true,
                sx: { px: 2, fontSize: "0.9rem" },
              },
            }}
          />
          <IconButton
            onClick={enviarMensagem}
            disabled={carregando || !novaMensagem.trim()}
            color="primary"
            sx={{
              bgcolor: "#0056b3",
              color: "white",
              "&:hover": { bgcolor: "#004494" },
              borderRadius: 1.5,
              m: 0.5,
            }}
          >
            <Send sx={{ fontSize: 18 }} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
