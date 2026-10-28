import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login efetuado com:', email);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Lado Esquerdo - Institucional */}
      <Box sx={{ 
        flex: 1, 
        bgcolor: '#1C212B', 
        color: 'white', 
        p: 8, 
        display: { xs: 'none', md: 'flex' }, 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Nexo Assist</Typography>
          
          <Typography variant="body2" sx={{ mt: 10, mb: 1, color: '#94a3b8' }}>
            Service desk de TI da Nexo
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, maxWidth: 500, lineHeight: 1.2 }}>
            Seu problema de TI, resolvido em uma conversa.
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 450, mb: 4, lineHeight: 1.6 }}>
            Descreva o que está acontecendo. O assistente consulta seus chamados, busca na central de ajuda e chama um analista quando precisa.
          </Typography>
        </Box>
        
        {/* Estatísticas */}
        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'regular' }}>8 s</Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>primeira resposta, em média</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'regular' }}>72%</Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>resolvidos sem fila</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'regular' }}>6 <span style={{color: '#10b981'}}>•</span></Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>analistas online agora</Typography>
          </Box>
        </Box>
      </Box>

      {/* Lado Direito - Formulário */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 4, 
        bgcolor: '#ffffff' 
      }}>
        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, width: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: 'regular', mb: 1 }}>
            Entrar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
            Use seu e-mail corporativo e a senha da rede Nexo.
          </Typography>

<Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 1 }}>            E-mail corporativo
          </Typography>
          <TextField 
            fullWidth 
            size="small"
            variant="outlined" 
            placeholder="ana.souza@nexo.com.br" 
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Senha</Typography>
            <Link href="#" underline="none" variant="caption" sx={{ color: '#0056b3' }}>Esqueci minha senha</Link>
          </Box>
          <TextField 
            fullWidth 
            size="small"
            type="password" 
            variant="outlined" 
            placeholder="••••••••" 
            value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControlLabel 
            control={<Checkbox defaultChecked size="small" sx={{ color: '#0056b3', '&.Mui-checked': { color: '#0056b3' } }} />} 
            label={<Typography variant="body2">Manter conectado neste computador</Typography>} 
            sx={{ mb: 4 }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            disableElevation
            sx={{ py: 1.5, bgcolor: '#0056b3', textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
          >
            Entrar →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}