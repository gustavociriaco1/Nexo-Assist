Nexo Assist - Service Desk com IA 

O Nexo Assist é um protótipo de Service Desk de TI focado em automatizar o atendimento inicial aos colaboradores através de Inteligência Artificial, com suporte contínuo a transbordo para analistas humanos.

Arquitetura e Requisitos Técnicos

O projeto foi construído num monorepo (frontend e backend juntos) respeitando as melhores práticas de separação de responsabilidades:

Linguagem: TypeScript com tipagem estrita ativada em ambos os ambientes para garantir a integridade dos dados.

Frontend: React (Vite) + Material UI, garantindo fidelidade ao protótipo, responsividade e gestão adequada de estados de carregamento. O rastreamento de sessão do utilizador é mantido via localStorage para sobrevivência ao recarregamento da página.

Backend: Node.js com Express. O serviço de chamados e persistência de dados é completamente isolado da lógica do agente.

Banco de Dados: SQLite. O histórico de conversas, os chamados criados e o estado de cada atendimento sobrevivem a reinícios da aplicação e dos servidores.

Agente IA: Mastra framework.

Escolha do Modelo (LLM) e Tomada de Decisão

Foi escolhido o modelo Google Gemini (gemini-1.5-flash-latest).

Justificativa da Escolha: Gratuito.

Como o Agente Decide: O agente recebe o histórico estruturado do banco de dados aliado a um System Prompt rigoroso. Ele conduz o diagnóstico fazendo perguntas baseadas no relato do colaborador. Caso o agente detete que o problema foge do seu nível de permissão (problemas críticos) ou caso o utilizador peça para falar com um humano, a IA altera o status do chamado e pausa as suas próprias respostas, transferindo a conversa para o console do analista.

Trade-offs e O que faria com mais tempo (Evoluções)

Para garantir a entrega de um MVP estável, funcional e focado no fluxo contínuo de mensagens e transbordo IA/Humano, algumas decisões de design foram tomadas:

Trade-off atual (Abertura de Chamados): Os chamados são abertos diretamente no banco de dados na primeira interação, simplificando a etapa de "rascunho e aprovação" do Anexo A. Algumas colunas de categorização estrita (Prioridade, Categoria e Prazos) não foram persistidas no schema inicial para focar na fiabilidade da troca de mensagens.

O que melhoraria com mais tempo:

Structured Outputs (JSON): Evoluiria o prompt do Gemini para forçar a IA a devolver um objeto JSON validado, preenchendo automaticamente a Prioridade (Crítica, Alta, Média) e SLAs com base no impacto do problema relatado.

Confirmação de Rascunho: Criaria um componente intermediário no React onde a IA apresenta os dados do chamado ao utilizador antes de realizar o INSERT definitivo no banco de dados.

WebSockets (Socket.io): Substituiria a atualização do chat (atualmente feita via fetch/polling) por conexões em tempo real, permitindo ver quando o analista está a digitar.

 Como Executar o Projeto Localmente

Certifique-se de ter o Node.js (v18+) instalado.

1. Configuração do Backend

Abra um terminal na raiz do projeto e acesse a pasta do backend:

cd backend
npm install


Configure as variáveis de ambiente baseando-se no arquivo de exemplo (crie o ficheiro .env e insira a sua chave do Gemini):

cp .env.example .env


Reconstrua e popule o banco de dados inicial (Seed):

npx tsx src/db/seed.ts


Inicie o servidor local:

npm run dev


(O backend rodará na porta 3000)

2. Configuração do Frontend

Abra um novo terminal e acesse a pasta do frontend:

cd frontend
npm install --legacy-peer-deps
npm run dev


A aplicação estará a correr em http://localhost:5173.

🔑 Credenciais de Teste

Para testar a visão do funcionário e assumir conversas no console do analista, utilize as seguintes credenciais injetadas no banco de dados:

Email: ana.souza@nexo.com.br

Senha: 1234567