import React from 'react';
import { Box, Typography } from '@mui/material';
import BarraLateral from './BarraLateral';

interface LayoutBaseProps {
  titulo: string;
  children: React.ReactNode;
}

export default function LayoutBase({ titulo, children }: LayoutBaseProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f8fafc' }}>
      <BarraLateral />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Cabeçalho / Breadcrumb */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', bgcolor: '#ffffff' }}>
          <Typography variant="body2" color="text.secondary">
            Service desk de TI &nbsp;{'>'}&nbsp; <span style={{ fontWeight: 'bold', color: '#000' }}>{titulo}</span>
          </Typography>
        </Box>
        {/* Área de Conteúdo */}
        <Box sx={{ flex: 1, p: 6, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}