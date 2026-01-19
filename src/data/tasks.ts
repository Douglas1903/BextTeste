import { Task } from '../types/task'

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Implementar API de Login',
    description: 'Criar endpoints de autenticação',
    priority: 'Alta',
    date: '20/04/2024',
    category: 'CLIENT',
    status: 'todo'
  },
  {
    id: 2,
    title: 'Estruturar Banco de Dados',
    description: 'Definir tabelas e relacionamentos',
    priority: 'Média',
    date: '20/04/2024',
    category: 'CLIENT',
    status: 'todo'
  },
  {
    id: 3,
    title: 'Criar tela de Cadastro',
    description: 'Formulário com validação e feedback',
    priority: 'Média',
    date: '21/04/2024',
    category: 'FRONT',
    status: 'todo'
  },
  {
    id: 4,
    title: 'Adicionar máscara de inputs',
    description: 'CPF, telefone e moeda',
    priority: 'Baixa',
    date: '21/04/2024',
    category: 'FRONT',
    status: 'todo'
  },
  {
    id: 5,
    title: 'Configurar variáveis de ambiente',
    description: 'Separar DEV/PROD e revisar secrets',
    priority: 'Alta',
    date: '21/04/2024',
    category: 'DEVOPS',
    status: 'todo'
  },
  {
    id: 6,
    title: 'Criar endpoint de refresh token',
    description: 'Renovar sessão com segurança',
    priority: 'Alta',
    date: '22/04/2024',
    category: 'BACK',
    status: 'todo'
  },
  {
    id: 7,
    title: 'Padronizar responses da API',
    description: 'Criar DTOs e mensagens de erro',
    priority: 'Média',
    date: '22/04/2024',
    category: 'BACK',
    status: 'todo'
  },
  {
    id: 8,
    title: 'Implementar logs estruturados',
    description: 'Logs por request e correlação de erros',
    priority: 'Média',
    date: '23/04/2024',
    category: 'BACK',
    status: 'todo'
  },
  {
    id: 9,
    title: 'Criar testes unitários de Auth',
    description: 'Cobrir casos de sucesso e falhas',
    priority: 'Alta',
    date: '23/04/2024',
    category: 'QA',
    status: 'todo'
  },
  {
    id: 10,
    title: 'Definir layout do Kanban',
    description: 'Ajustar espaçamentos e responsivo',
    priority: 'Baixa',
    date: '23/04/2024',
    category: 'FRONT',
    status: 'todo'
  },
  {
    id: 11,
    title: 'Criar página de perfil',
    description: 'Editar nome, foto e preferências',
    priority: 'Baixa',
    date: '24/04/2024',
    category: 'FRONT',
    status: 'todo'
  },
  {
    id: 12,
    title: 'Integrar upload de imagem',
    description: 'Preview + validação de formato/tamanho',
    priority: 'Média',
    date: '24/04/2024',
    category: 'CLIENT',
    status: 'todo'
  },
  {
    id: 13,
    title: 'Estudar Arquitetura Hexagonal',
    description: 'Revisar padrões de projeto',
    priority: 'Média',
    date: '22/04/2024',
    category: 'LEAD',
    status: 'doing'
  },
  {
    id: 14,
    title: 'Implementar CRUD de Tarefas',
    description: 'Criar, editar, listar e remover tarefas',
    priority: 'Alta',
    date: '22/04/2024',
    category: 'BACK',
    status: 'doing'
  },
  {
    id: 15,
    title: 'Criar modal de Nova Tarefa',
    description: 'Campos: título, descrição, status, prioridade',
    priority: 'Média',
    date: '23/04/2024',
    category: 'FRONT',
    status: 'doing'
  },
  {
    id: 16,
    title: 'Aprimorar UX do Header',
    description: 'Busca, botões e espaçamento alinhados',
    priority: 'Baixa',
    date: '23/04/2024',
    category: 'FRONT',
    status: 'doing'
  },
  {
    id: 17,
    title: 'Configurar CORS e Rate Limit',
    description: 'Evitar abuso e garantir segurança',
    priority: 'Alta',
    date: '24/04/2024',
    category: 'SECURITY',
    status: 'doing'
  },
  {
    id: 18,
    title: 'Criar documentação do projeto',
    description: 'README com setup, scripts e decisões',
    priority: 'Média',
    date: '24/04/2024',
    category: 'LEAD',
    status: 'doing'
  },
  {
    id: 19,
    title: 'Refatorar componentes repetidos',
    description: 'Extrair Card e Coluna do Kanban',
    priority: 'Baixa',
    date: '25/04/2024',
    category: 'FRONT',
    status: 'doing'
  },
  {
    id: 20,
    title: 'Implementar filtros por categoria',
    description: 'Filtrar CLIENT/LEAD/FRONT/BACK etc.',
    priority: 'Média',
    date: '25/04/2024',
    category: 'CLIENT',
    status: 'doing'
  },
  {
    id: 21,
    title: 'Comprar presentes',
    description: 'Aniversário',
    priority: 'Baixa',
    date: '25/04/2024',
    category: 'LEAD',
    status: 'done'
  },
  {
    id: 22,
    title: 'Criar estrutura do projeto',
    description: 'Vue + rotas + organização de pastas',
    priority: 'Média',
    date: '18/04/2024',
    category: 'FRONT',
    status: 'done'
  },
  {
    id: 23,
    title: 'Configurar ESLint e Prettier',
    description: 'Padronização de estilo e lint no commit',
    priority: 'Baixa',
    date: '18/04/2024',
    category: 'DEVOPS',
    status: 'done'
  },
  {
    id: 24,
    title: 'Criar componentes base do UI',
    description: 'Botões, inputs, tags e ícones',
    priority: 'Média',
    date: '19/04/2024',
    category: 'FRONT',
    status: 'done'
  },
  {
    id: 25,
    title: 'Criar layout do Dashboard',
    description: 'Sidebar + header + área principal',
    priority: 'Alta',
    date: '19/04/2024',
    category: 'FRONT',
    status: 'done'
  },
  {
    id: 26,
    title: 'Configurar conexão com API',
    description: 'Cliente HTTP com interceptors',
    priority: 'Média',
    date: '20/04/2024',
    category: 'CLIENT',
    status: 'done'
  }
]