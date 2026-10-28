import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './paginas/Login';
import LayoutBase from './componentes/Layout/LayoutBase';
import MeuPerfil from './paginas/MeuPerfil';
import AtendimentoCliente from './paginas/AtendimentoCliente';
import ConsoleAtendente from './paginas/ConsoleAtendente';
import ConversaAtendente from './paginas/ConversaAtendente'; // <-- Nova importação

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/perfil" element={<LayoutBase titulo="Meu perfil"><MeuPerfil /></LayoutBase>} />
        <Route path="/atendimento" element={<LayoutBase titulo="Novo chamado de TI"><AtendimentoCliente /></LayoutBase>} />
        <Route path="/console" element={<LayoutBase titulo="Fila de Atendimento (Gestão)"><ConsoleAtendente /></LayoutBase>} />
        
        {/* Rota do novo painel de 3 colunas */}
        <Route path="/console/chat" element={
          <LayoutBase titulo="Atendimento em Andamento">
            <ConversaAtendente />
          </LayoutBase>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;