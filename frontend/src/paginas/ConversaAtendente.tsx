import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Chip,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  Send,
  AssignmentOutlined,
  CheckCircleOutlined,
  ArrowBack,
} from "@mui/icons-material";

interface Mensagem {
  id: number;
  chamado_id: string;
  autor: "usuario" | "agente" | "ia";
  texto: string;
  data_criacao: string;
}

export default function ConversaAtendente() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Referência para rolar automaticamente para o final do chat
  const fimDoChatRef = useRef<HTMLDivElement>(null);

  const carregarMensagens = () => {
    fetch("http://localhost:3000/api/chamados/INC-2041/mensagens")
      .then((res) => res.json())
      .then((dados) => setMensagens(dados))
      .catch((erro) => console.error("Erro ao carregar chat:", erro));
  };

  useEffect(() => {
    carregarMensagens();
  }, []);

  // Rola para a última mensagem sempre que a lista de mensagens for atualizada
  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, carregando]);

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    setCarregando(true);
    const textoEnviado = novaMensagem;
    setNovaMensagem("");

    try {
      await fetch("http://localhost:3000/api/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chamado_id: "INC-2041",
          texto: textoEnviado,
          autor: "usuario",
        }),
      });
      carregarMensagens();
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
        height: { xs: "calc(100vh - 80px)", md: "calc(100vh - 120px)" },
        bgcolor: "#ffffff",
        borderRadius: { xs: 0, md: 2 },
        border: { xs: "none", md: "1px solid #e0e0e0" },
        overflow: "hidden",
      }}
    >
      {/* 1. Painel Esquerdo - Fila (Oculto em mobile, visível de tablet para cima) */}
      <Box
        sx={{
          width: { sm: 260, md: 300 },
          display: { xs: "none", sm: "flex" },
          flexShrink: 0,
          borderRight: "1px solid #e0e0e0",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Conversas
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Pesquisar..."
            slotProps={{
              input: {
                startAdornment: (
                  <Search
                    sx={{ color: "text.secondary", mr: 1, fontSize: 20 }}
                  />
                ),
                sx: { fontSize: "0.85rem", borderRadius: 2 },
              },
            }}
          />
        </Box>
        <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              selected
              sx={{ bgcolor: "#f0f7ff", borderLeft: "4px solid #0056b3" }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#e0f2fe",
                    color: "#0056b3",
                    width: 40,
                    height: 40,
                    fontWeight: "bold",
                  }}
                >
                  AS
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Ana Souza
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{ color: "#0056b3", fontWeight: "medium" }}
                  >
                    Você está atendendo
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* 2. Painel Central - Chat Dinâmico (Sempre visível, ocupa o espaço restante) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f8fafc",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ display: { sm: "none" } }}>
              <ArrowBack />
            </IconButton>
            <Avatar
              sx={{ bgcolor: "#e0f2fe", color: "#0056b3", fontWeight: "bold" }}
            >
              AS
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Ana Souza
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Financeiro • INC-2041
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Histórico */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {mensagens.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.autor === "usuario" ? "flex-start" : "flex-end",
                maxWidth: { xs: "90%", md: "75%" },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  textAlign: msg.autor === "usuario" ? "left" : "right",
                  mb: 0.5,
                }}
              >
                {msg.autor === "ia"
                  ? "Nexo Assist (IA)"
                  : msg.autor === "usuario"
                    ? "Ana Souza"
                    : "Você"}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  bgcolor:
                    msg.autor === "ia"
                      ? "#e0f2fe"
                      : msg.autor === "usuario"
                        ? "#ffffff"
                        : "#0056b3",
                  color:
                    msg.autor === "ia"
                      ? "#0369a1"
                      : msg.autor === "usuario"
                        ? "text.primary"
                        : "#ffffff",
                  border:
                    msg.autor === "usuario" ? "1px solid #e0e0e0" : "none",
                  borderRadius: 2,
                  wordBreak: "break-word", // Evita quebra de palavras muito longas
                }}
              >
                <Typography variant="body2">{msg.texto}</Typography>
              </Paper>
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
                Nexo Assist a analisar...
              </Typography>
            </Box>
          )}
          <div ref={fimDoChatRef} /> {/* Âncora invisível para o auto-scroll */}
        </Box>

        {/* Input Dinâmico */}
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
              placeholder="Digite o problema (ex: Minha VPN parou)..."
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

      {/* 3. Painel Direito - Contexto (Oculto em mobile e tablet, visível apenas em desktop grande) */}
      <Box
        sx={{
          width: 280,
          display: { xs: "none", lg: "block" },
          flexShrink: 0,
          borderLeft: "1px solid #e0e0e0",
          bgcolor: "#ffffff",
          p: 3,
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 3 }}>
          Detalhes do Chamado
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#0056b3",
              fontWeight: "bold",
              display: "block",
              mb: 0.5,
            }}
          >
            INC-2041
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            Falha na VPN após update
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <Chip
              label="Redes"
              size="small"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
            <Chip
              label="Prioridade Alta"
              size="small"
              color="error"
              variant="outlined"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AssignmentOutlined sx={{ fontSize: 14 }} /> Assumido por si
          </Typography>
        </Paper>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
          Histórico Recente
        </Typography>
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <CheckCircleOutlined
              sx={{ fontSize: 16, color: "#10b981", mr: 1 }}
            />
            <ListItemText
              primary={
                <Typography variant="caption" sx={{ fontWeight: "medium" }}>
                  Acesso à pasta Financeiro
                </Typography>
              }
              secondary={
                <Typography sx={{ fontSize: "0.65rem" }}>
                  Resolvido há 2 semanas
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
