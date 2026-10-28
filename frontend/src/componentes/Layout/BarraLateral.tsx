import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { ChatBubbleOutlined, PersonOutlined, Logout,AssignmentOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Adicionado

export default function BarraLateral() {
  const navegar = useNavigate(); // <-- Adicionado
  const local = useLocation(); // <-- Para saber qual menu deixar "selecionado" (azul)

  return (
    <Box sx={{ width: 260, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#ffffff' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" sx={{ color: '#0056b3', fontWeight: 'bold' }}>N</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Nexo Assist</Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton selected={local.pathname === '/atendimento'} onClick={() => navegar('/atendimento')} sx={{ borderRadius: 2, color: local.pathname === '/atendimento' ? '#0056b3' : 'text.secondary', '&.Mui-selected': { bgcolor: '#f0f7ff' } }}>
            <ChatBubbleOutlined sx={{ mr: 2, fontSize: 20 }} />
            <ListItemText primary={<Typography sx={{ fontSize: '0.9rem', fontWeight: local.pathname === '/atendimento' ? 'bold' : 'medium' }}>Atendimento</Typography>} />
          </ListItemButton>
        </ListItem>
        
        {/* Novo botão do Console */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton selected={local.pathname === '/console'} onClick={() => navegar('/console')} sx={{ borderRadius: 2, color: local.pathname === '/console' ? '#0056b3' : 'text.secondary', '&.Mui-selected': { bgcolor: '#f0f7ff' } }}>
            <AssignmentOutlined sx={{ mr: 2, fontSize: 20 }} />
            <ListItemText primary={<Typography sx={{ fontSize: '0.9rem', fontWeight: local.pathname === '/console' ? 'bold' : 'medium' }}>Fila (Console)</Typography>} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton selected={local.pathname === '/perfil'} onClick={() => navegar('/perfil')} sx={{ borderRadius: 2, color: local.pathname === '/perfil' ? '#0056b3' : 'text.secondary', '&.Mui-selected': { bgcolor: '#f0f7ff' } }}>
            <PersonOutlined sx={{ mr: 2, fontSize: 20 }} />
            <ListItemText primary={<Typography sx={{ fontSize: '0.9rem', fontWeight: local.pathname === '/perfil' ? 'bold' : 'medium' }}>Meu perfil</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0f2fe', color: '#0056b3', fontSize: '0.9rem', fontWeight: 'bold' }}>AS</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Ana Souza</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>ana.souza@nexo.com.br</Typography>
          </Box>
        </Box>
        {/* Adicionado o clique de Sair, que manda de volta pro Login */}
        <ListItemButton onClick={() => navegar('/')} sx={{ borderRadius: 2, p: 1, color: 'text.secondary' }}>
          <Logout sx={{ mr: 2, fontSize: 18 }} />
          <ListItemText primary={<Typography sx={{ fontSize: '0.85rem' }}>Sair</Typography>} />
        </ListItemButton>
      </Box>
    </Box>
  );
}