# Bext – Teste Técnico (Vue 3)

Este projeto foi desenvolvido como parte de um **teste técnico** utilizando **Vue 3 + Vite + TypeScript**.  
A proposta é um **dashboard de gerenciamento de tarefas** no formato Kanban, com foco em organização, clareza de código e boa experiência de uso.

---

## 🧩 Funcionalidades

- Tela de **Login** (autenticação simulada)
- Dashboard em formato **Kanban**
- Criação, edição e remoção de **categorias**
- Criação, edição e remoção de **tarefas**
- Edição inline do nome das categorias
- Filtros por:
  - Texto
  - Status
  - Prioridade
  - Intervalo de datas
- Empty states para cenários sem dados
- Layout responsivo (desktop e mobile)

---

## 🚀 Tecnologias utilizadas

- **Vue 3** (Composition API)
- **Vite**
- **TypeScript**
- **Vue Router**
- **Pinia** (gerenciamento de estado)
- **CSS puro** (sem frameworks externos)
- Mock de serviços para autenticação e dados

---

## 📁 Estrutura do projeto (resumo)

src/
├─ pages/
│ ├─ Dashboard.vue
│ └─ auth/
│ └─ LoginPage.vue
├─ components/
│ ├─ dashboard/
│ └─ base/
├─ composables/
├─ services/
├─ stores/
├─ layouts/
├─ types/
├─ styles/
├─ App.vue
└─ main.js


---

## ⚙️ Como executar o projeto localmente

### 1. Clonar o repositório

git clone <URL_DO_REPOSITORIO>

cd bext-teste

npm install

npm run dev

http://localhost:5173

## 🔐 Login

A autenticação é **simulada** para fins de teste técnico.  
Não é necessário cadastro prévio.

---

## 📱 Responsividade

- **Desktop**: layout em colunas (Kanban horizontal)
- **Mobile / Tablet**: colunas empilhadas verticalmente para melhor legibilidade e usabilidade

Essa abordagem foi adotada para evitar problemas comuns de UX envolvendo **scroll horizontal** e **elementos sticky** em telas menores.

---

## 🧠 Decisões técnicas

- Uso de **composables** para separar regras de negócio e facilitar manutenção
- Tipagem explícita com **TypeScript** para maior segurança e legibilidade
- Layout construído com **CSS puro**, evitando dependência de bibliotecas externas
- Estrutura de pastas organizada pensando em **escalabilidade**

---

## 💬 Feedback sobre a experiência no teste

A execução do teste foi uma experiência positiva e desafiadora.  
O maior foco esteve em equilibrar organização de código, tipagem adequada com TypeScript e uma interface clara para o usuário final.

Alguns pontos exigiram mais atenção, especialmente:

- A sincronização entre categorias e tarefas
- A adaptação do layout para dispositivos móveis
- A tipagem correta de componentes e eventos no Vue 3

No geral, o teste permitiu explorar boas práticas de arquitetura frontend e demonstrar preocupação tanto com código quanto com experiência do usuário.

---

## 📌 Considerações finais

Este projeto foi desenvolvido com foco em clareza, organização e boas práticas, priorizando legibilidade e facilidade de manutenção.

Obrigado pela oportunidade!
