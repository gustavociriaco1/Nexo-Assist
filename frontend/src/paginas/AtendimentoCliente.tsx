import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';

// Tipagem estrita para as mensagens
interface Mensagem {
  id: number;
  autor: 'usuario' | 'agente';
  texto: string;
  horario: string;
}

export default function AtendimentoCliente() {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: 'agente',
      texto: 'Olá, Ana. Sou o Nexo Assist. Como posso ajudar com o seu equipamento ou acesso hoje?',
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleEnviar = () => {
    if (!mensagem.trim()) return;

    // Adiciona a mensagem do usuário
    const novaMensagem: Mensagem = {
      id: mensagens.length + 1,
      autor: 'usuario',
      texto: mensagem,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setMensagem('');

    // Simula o agente de IA "pensando" (Será substituído pela integração com o backend depois)
    setTimeout(() => {
      setMensagens((prev) => [...prev, {
        id: prev.length + 1,
        autor: 'agente',
        texto: 'Entendi. Estou analisando seu relato e buscando uma solução na base de conhecimento. Aguarde um instante...',
        horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 900, mx: 'auto' }}>
      
      {/* Área do Histórico de Mensagens */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 3, display: 'flex', flexDirection: 'column', gap: 2, pr: 1 }}>
        {mensagens.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', gap: 2, alignSelf: msg.autor === 'usuario' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            
            {msg.autor === 'agente' && (
              <Avatar sx={{ bgcolor: '#0056b3', width: 32, height: 32, fontSize: '0.9rem', fontWeight: 'bold' }}>N</Avatar>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.autor === 'usuario' ? 'flex-end' : 'flex-start' }}>
              <Paper elevation={0} sx={{
                p: 2,
                bgcolor: msg.autor === 'usuario' ? '#0056b3' : '#f1f5f9',
                color: msg.autor === 'usuario' ? '#ffffff' : '#1e293b',
                borderRadius: 2,
                borderTopRightRadius: msg.autor === 'usuario' ? 4 : 16,
                borderTopLeftRadius: msg.autor === 'agente' ? 4 : 16,
              }}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{msg.texto}</Typography>
              </Paper>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, px: 0.5 }}>
                {msg.horario}
              </Typography>
            </Box>

          </Box>
        ))}
      </Box>

      {/* Caixa de Texto para Digitação */}
      <Paper elevation={0} variant="outlined" sx={{ p: 1, display: 'flex', alignItems: 'center', borderRadius: 3, bgcolor: '#ffffff', borderColor: '#e2e8f0' }}>
        <TextField
          fullWidth
          placeholder="Descreva seu problema (ex: Minha VPN não conecta)..."
          variant="standard"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
          sx={{ px: 2 }}
slotProps={{ input: { disableUnderline: true, sx: { fontSize: '0.95rem' } } }}        />
        <IconButton 
          color="primary" 
          onClick={handleEnviar} 
          disabled={!mensagem.trim()}
          sx={{ bgcolor: mensagem.trim() ? '#f0f7ff' : 'transparent' }}
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Paper>

    </Box>
  );
}