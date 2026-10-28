import React from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';

export default function MeuPerfil() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Meu perfil</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Seus dados de acesso ao service desk de TI.
      </Typography>

      {/* Cartão de Dados Pessoais */}
      <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body2" sx={{ width: 150, color: 'text.secondary' }}>Nome</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Ana Souza</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ width: 150, color: 'text.secondary' }}>E-mail corporativo</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium', flex: 1 }}>ana.souza@nexo.com.br</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">Gerenciado pela TI</Typography>
          </Box>
        </Box>
      </Card>

      {/* Cartão de Senha */}
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#f1f5f9', borderRadius: '50%', display: 'flex' }}>
              <KeyIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Senha</Typography>
              <Typography variant="caption" color="text.secondary">Alterada há 42 dias</Typography>
            </Box>
          </Box>
          <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2, borderColor: '#e0e0e0', color: 'inherit' }}>
            Redefinir senha
          </Button>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            ✉ Enviaremos um link de redefinição para ana.souza@nexo.com.br.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}