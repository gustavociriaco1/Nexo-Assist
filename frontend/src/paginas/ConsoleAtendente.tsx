import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Chamado {
  id: string;
  usuario: string;
  departamento: string;
  resumo_ia: string;
  status: "pendente" | "aguardando" | "em_andamento" | "resolvido";
  data_criacao: string;
}

export default function ConsoleAtendente() {
  const navegar = useNavigate();
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/chamados")
      .then((resposta) => resposta.json())
      .then((dados) => setChamados(dados))
      .catch((erro) => console.error("Erro ao carregar chamados:", erro));
  }, []);

  const totalPendentes = chamados.filter((c) => c.status === "aguardando").length;
const totalEmAndamento = chamados.filter((c) => c.status === "em_andamento").length;

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Fila de Atendimento
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Chamados escalados pela IA aguardando transbordo para analistas
            humanos.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 1.5, px: 3, borderRadius: 2, textAlign: "center" }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#d97706", lineHeight: 1 }}
            >
              {totalPendentes}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              PENDENTES
            </Typography>
          </Paper>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 1.5, px: 3, borderRadius: 2, textAlign: "center" }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#0056b3", lineHeight: 1 }}
            >
              {totalEmAndamento}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              EM ANDAMENTO
            </Typography>
          </Paper>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                TICKET
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                USUÁRIO
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                RESUMO DA IA
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                DATA
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "0.85rem" }}
              >
                STATUS
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "0.85rem" }}
              >
                AÇÃO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chamados.map((chamado) => (
              <TableRow
                key={chamado.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <TableCell sx={{ fontWeight: "bold", color: "#0056b3" }}>
                  {chamado.id}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {chamado.usuario}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {chamado.departamento}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" noWrap title={chamado.resumo_ia}>
                    {chamado.resumo_ia}
                  </Typography>
                </TableCell>
                {/* Formata a data vinda do banco */}
                <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  {new Date(chamado.data_criacao).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell align="center">
  <Chip
    label={chamado.status === "aguardando" ? "Aguardando" : "Em andamento"}
    size="small"
    sx={{
      bgcolor: chamado.status === "aguardando" ? "#fef3c7" : "#e0f2fe",
      color: chamado.status === "aguardando" ? "#b45309" : "#0369a1",
      fontWeight: "bold",
      fontSize: "0.75rem",
      borderRadius: 1.5,
    }}
  />
</TableCell>
<TableCell align="right">
  <Button
    variant="outlined"
    size="small"
    disableElevation
    onClick={() => navegar(`/console/chat/${chamado.id}`)}
    sx={{ textTransform: "none", borderRadius: 1.5, fontWeight: "bold" }}
  >
    {chamado.status === "aguardando" ? "Assumir" : "Ver chat"}
  </Button>
</TableCell>
              </TableRow>
            ))}
            {/* Mensagem caso a fila esteja vazia */}
            {chamados.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 3, color: "text.secondary" }}
                >
                  Nenhum chamado na fila no momento.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
