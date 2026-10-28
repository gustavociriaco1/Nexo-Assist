import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './paginas/Login';
import LayoutBase from './componentes/Layout/LayoutBase';
import MeuPerfil from './paginas/MeuPerfil';
import AtendimentoCliente from './paginas/AtendimentoCliente';
import ConsoleAtendente from './paginas/ConsoleAtendente'; // <-- Importar o console

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/perfil" element={
          <LayoutBase titulo="Meu perfil">
            <MeuPerfil />
          </LayoutBase>
        } />
        
        <Route path="/atendimento" element={
          <LayoutBase titulo="Novo chamado de TI">
            <AtendimentoCliente />
          </LayoutBase>
        } />

        {/* Nova rota do Console */}
        <Route path="/console" element={
          <LayoutBase titulo="Console do Atendente">
            <ConsoleAtendente />
          </LayoutBase>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;