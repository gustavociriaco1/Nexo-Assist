import { Box, Typography, Avatar, TextField, Button, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip, IconButton, Paper } from '@mui/material';
import { Search, Send, SmartToyOutlined, AssignmentOutlined, CheckCircleOutlined } from '@mui/icons-material';

export default function ConversaAtendente() {
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)', bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      
      {/* 1. Painel Esquerdo - Fila de Conversas */}
      <Box sx={{ width: 320, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Conversas</Typography>
          <TextField 
            fullWidth 
            size="small" 
            placeholder="Pesquisar conversa..." 
            slotProps={{ input: { startAdornment: <Search sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />, sx: { fontSize: '0.85rem', borderRadius: 2 } } }}
          />
        </Box>
        <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
          {/* Item Ativo */}
          <ListItem disablePadding>
            <ListItemButton selected sx={{ bgcolor: '#f0f7ff', borderLeft: '4px solid #0056b3', '&.Mui-selected': { bgcolor: '#f0f7ff' } }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0056b3', width: 40, height: 40, fontWeight: 'bold' }}>AS</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={<Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Ana Souza</Typography>}
                secondary={<Typography variant="caption" sx={{ color: '#0056b3', fontWeight: 'medium' }}>Você está atendendo</Typography>}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>10:05</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          {/* Item na Fila */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#fef3c7', color: '#b45309', width: 40, height: 40, fontWeight: 'bold' }}>CM</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={<Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>Carla Mendes</Typography>}
                secondary={<Typography variant="caption" sx={{ color: '#d97706', fontWeight: 'medium' }}>Aguardando analista</Typography>}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>09:58</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* 2. Painel Central - Chat de Atendimento */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        {/* Cabeçalho do Chat */}
        <Box sx={{ p: 2, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0056b3', fontWeight: 'bold' }}>AS</Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Ana Souza</Typography>
              <Typography variant="caption" color="text.secondary">Financeiro • INC-2041</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2, color: 'text.secondary', borderColor: '#e0e0e0' }}>Devolver ao agent</Button>
            <Button variant="outlined" color="error" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>Encerrar atendimento</Button>
          </Box>
        </Box>

        {/* Histórico */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Mensagem IA */}
          <Box sx={{ alignSelf: 'flex-end', maxWidth: '75%' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'right', mb: 0.5 }}>Nexo Assist (IA)</Typography>
            <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#e0f2fe', color: '#0369a1', borderRadius: 2, borderTopRightRadius: 4 }}>
              <Typography variant="body2">Entendi. A falha de conexão com a VPN corporativa pode estar relacionada com a atualização recente do Windows. Quer que eu chame um analista?</Typography>
            </Paper>
          </Box>
          {/* Mensagem Utilizador */}
          <Box sx={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Ana Souza</Typography>
            <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 2, borderTopLeftRadius: 4 }}>
              <Typography variant="body2">Sim, por favor. Estou parada há 1 hora e preciso fechar o relatório.</Typography>
            </Paper>
          </Box>
          {/* Evento de Transferência */}
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Chip icon={<SmartToyOutlined sx={{ fontSize: 16 }} />} label="Transferido para analista humano - 10:05" size="small" sx={{ mx: 2, bgcolor: '#f1f5f9', color: 'text.secondary', fontSize: '0.75rem' }} />
            <Divider sx={{ flex: 1 }} />
          </Box>
          {/* Mensagem Atendente */}
          <Box sx={{ alignSelf: 'flex-end', maxWidth: '75%' }}>
             <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'right', mb: 0.5 }}>Você</Typography>
            <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#0056b3', color: '#ffffff', borderRadius: 2, borderTopRightRadius: 4 }}>
              <Typography variant="body2">Olá Ana, bom dia. Já estou a analisar os logs do seu acesso. Pode confirmar se reiniciou o computador após a atualização?</Typography>
            </Paper>
          </Box>
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, bgcolor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>
          <Paper elevation={0} variant="outlined" sx={{ p: 0.5, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
            <TextField fullWidth placeholder="Escreva a sua resposta..." variant="standard" slotProps={{ input: { disableUnderline: true, sx: { px: 2, fontSize: '0.9rem' } } }} />
            <IconButton color="primary" sx={{ bgcolor: '#0056b3', color: 'white', '&:hover': { bgcolor: '#004494' }, borderRadius: 1.5, m: 0.5 }}><Send sx={{ fontSize: 18 }} /></IconButton>
          </Paper>
        </Box>
      </Box>

      {/* 3. Painel Direito - Contexto do Utilizador */}
      <Box sx={{ width: 300, borderLeft: '1px solid #e0e0e0', bgcolor: '#ffffff', p: 3, overflowY: 'auto' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 3 }}>Detalhes do Chamado</Typography>
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2, mb: 4 }}>
          <Typography variant="caption" sx={{ color: '#0056b3', fontWeight: 'bold', display: 'block', mb: 0.5 }}>INC-2041</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Falha na VPN após update</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label="Redes" size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
            <Chip label="Prioridade Alta" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentOutlined sx={{ fontSize: 14 }} /> Assumido por si
          </Typography>
        </Paper>

        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>Histórico Recente</Typography>
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <CheckCircleOutlined sx={{ fontSize: 16, color: '#10b981', mr: 1 }} />
            <ListItemText primary={<Typography variant="caption" sx={{ fontWeight: 'medium' }}>Acesso à pasta Financeiro</Typography>} secondary={<Typography sx={{ fontSize: '0.65rem' }}>Resolvido há 2 semanas</Typography>} />
          </ListItem>
          <ListItem disablePadding>
             <CheckCircleOutlined sx={{ fontSize: 16, color: '#10b981', mr: 1 }} />
            <ListItemText primary={<Typography variant="caption" sx={{ fontWeight: 'medium' }}>Troca de senha ERP</Typography>} secondary={<Typography sx={{ fontSize: '0.65rem' }}>Resolvido há 1 mês</Typography>} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}