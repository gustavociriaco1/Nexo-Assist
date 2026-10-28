import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <-- Nova importação
// Tipagem estrita para os chamados na fila
interface Chamado {
  id: string;
  usuario: string;
  departamento: string;
  resumoIA: string;
  status: 'pendente' | 'em_andamento';
  tempoEspera: string;
}

const chamadosMock: Chamado[] = [
  { id: 'INC-2041', usuario: 'Ana Souza', departamento: 'Marketing', resumoIA: 'Falha de conexão com a VPN corporativa.', status: 'pendente', tempoEspera: '04:12' },
  { id: 'INC-2040', usuario: 'Carlos Mendes', departamento: 'Financeiro', resumoIA: 'Esquecimento de senha do ERP.', status: 'em_andamento', tempoEspera: '12:05' },
  { id: 'INC-2038', usuario: 'Mariana Silva', departamento: 'RH', resumoIA: 'Solicitação de novo monitor não aprovada pelo sistema.', status: 'pendente', tempoEspera: '25:30' },
];

export default function ConsoleAtendente() {
    const navegar = useNavigate(); // <-- Inicializar o hook
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>Fila de Atendimento</Typography>
          <Typography variant="body2" color="text.secondary">
            Chamados escalados pela IA aguardando transbordo para analistas humanos.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper elevation={0} variant="outlined" sx={{ p: 1.5, px: 3, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#d97706', lineHeight: 1 }}>2</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>PENDENTES</Typography>
          </Paper>
          <Paper elevation={0} variant="outlined" sx={{ p: 1.5, px: 3, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0056b3', lineHeight: 1 }}>1</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>EM ANDAMENTO</Typography>
          </Paper>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>TICKET</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>USUÁRIO</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>RESUMO DA IA</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>TEMPO</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>AÇÃO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chamadosMock.map((chamado) => (
              <TableRow key={chamado.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#0056b3' }}>{chamado.id}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{chamado.usuario}</Typography>
                  <Typography variant="caption" color="text.secondary">{chamado.departamento}</Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" noWrap title={chamado.resumoIA}>{chamado.resumoIA}</Typography>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>{chamado.tempoEspera}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={chamado.status === 'pendente' ? 'Aguardando' : 'Em andamento'} 
                    size="small" 
                    sx={{ 
                      bgcolor: chamado.status === 'pendente' ? '#fef3c7' : '#e0f2fe', 
                      color: chamado.status === 'pendente' ? '#b45309' : '#0369a1',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      borderRadius: 1.5
                    }} 
                  />
                </TableCell>
               <TableCell align="right">
                  {/* Adicionado o evento onClick para mudar de ecrã */}
                  <Button 
                    variant="outlined" 
                    size="small" 
                    disableElevation 
                    onClick={() => navegar('/console/chat')} 
                    sx={{ textTransform: 'none', borderRadius: 1.5, fontWeight: 'bold' }}
                  >
                    {chamado.status === 'pendente' ? 'Assumir' : 'Ver chat'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}