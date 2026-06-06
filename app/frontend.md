# 🎨 Minhas Contribuições no Front-end

> Documentação das alterações que fiz no front-end do projeto UnBilidade

**Autor:** Brenda  
**Data:** Junho/2026  
**Branch:** feature/frontend-pages

---

## 📌 Resumo do que foi feito

Desenvolvi 3 páginas principais para o front-end da aplicação:

| Página | Rota | Status | Descrição |
|--------|------|--------|-----------|
| Página Inicial | `/` | ✅ Concluída | Home completa com serviços, depoimentos e FAQ |
| Calendário | `/schedulee` | ✅ Concluída | Sistema de agendamento interativo |
| Dashboard | `/dashboard` | ✅ Concluída | Área do paciente com histórico e tratamentos |

---

## 🏠 Página Inicial (`app/page.tsx`)

### O que tem:
- Hero section com chamada principal
- 6 cards de serviços (Fisioterapia Ortopédica, Neurológica, RPG, Esportiva, Pediátrica, Pilates)
- Seção "Sobre a clínica"
- Cards de depoimentos com avaliação por estrelas
- FAQ com accordion (perguntas que abrem e fecham)
- Modal de login/register (popup)
- Footer com links

### Design:
- Cores: verde água (`#2ab5a0`), azul bebê (`#e8f4f2`), branco
- Totalmente responsiva (funciona no celular)
- Menu com versão mobile (hambúrguer)
- Animações hover nos cards e botões

---

## 📅 Página de Agendamento (`app/schedulee/page.tsx`)

### O que tem:
- Calendário interativo (navega entre meses)
- Seleção de data clicando no dia
- Lista de horários disponíveis (9 horários)
- Seleção do tipo de serviço
- Botão de confirmação com alerta

### Funcionalidades:
```javascript
// Como funciona:
1. Usuário clica em um dia no calendário
2. Escolhe um horário (08h às 17h)
3. Seleciona o tipo de serviço
4. Clica em confirmar
5. Aparece um resumo do agendamento
📊 Dashboard (app/dashboard/page.tsx)
O que tem:
Sidebar (menu lateral)
📊 Visão Geral

📅 Minhas Consultas

💪 Tratamentos

👤 Meu Perfil

💰 Pagamentos

🚪 Sair

Páginas dentro do dashboard:
Visão Geral:

Cards estatísticos (consultas realizadas, próximas consultas, tratamentos ativos, total investido)

Próxima consulta (destaque)

Tratamentos ativos com barra de progresso

Recomendações personalizadas

Histórico de consultas

Minhas Consultas:

Tabela com histórico completo

Status (Concluída/Cancelada)

Tratamentos:

Acompanhamento de progresso

Sessões realizadas vs total

Próxima sessão agendada

Meu Perfil:

Dados do paciente (nome, e-mail, telefone, data de nascimento)

Botão editar perfil

Pagamentos:

Histórico financeiro

Valores e formas de pagamento

Status de cada pagamento

🔧 Como testar localmente
bash
# 1. Entrar na pasta do projeto
cd 2026.1-T01-Hopper

# 2. Instalar dependências
npm install

# 3. Rodar o servidor
npm run dev

# 4. Acessar no navegador
http://localhost:3000
Rotas para testar:
Home: http://localhost:3000

Agendamento: http://localhost:3000/schedulee

Dashboard: http://localhost:3000/dashboard

Login: http://localhost:3000/login

📁 Arquivos que eu criei/alterei
text
app/
├── page.tsx              # CRIADO (página inicial completa)
├── schedulee/
│   └── page.tsx          # CRIADO (calendário de agendamento)
├── dashboard/
│   └── page.tsx          # CRIADO (dashboard do paciente)
├── login/
│   └── page.tsx          # JÁ EXISTIA
└── globals.css           # ATUALIZADO (estilos globais)
🎨 Estilos e Design
Cores que usei:
Cor	Código	Onde
Verde água	#2ab5a0	Botões, links, destaque
Verde escuro	#1a5c5c	Hovers, gradientes
Azul bebê	#e8f4f2	Fundo de seções
Branco	#ffffff	Cards, fundos
Componentes que criei:
Stars() - Exibe estrelas de avaliação

FaqItem() - Accordion do FAQ

Navbar() - Menu responsivo

AuthModal() - Popup de login/register

StatCard() - Cards estatísticos do dashboard

ActiveTreatments() - Barra de progresso

AppointmentHistory() - Tabela de consultas

🐛 Problemas que resolvi
Erro do globals.css → Ajustei o caminho do import para "../globals.css"

Rota schedule vs schedulee → Mantive como schedulee para compatibilidade

Responsividade mobile → Adicionei media queries e menu hambúrguer

📦 Dependências utilizadas
json
{
  "next": "16.2.6",
  "react": "19",
  "react-dom": "19"
}
✅ Status
Tarefa	Status
Página inicial	✅ Completa
Página de agendamento	✅ Completa
Dashboard	✅ Completa
Design responsivo	✅ Completo
Animações e hover	✅ Completo
Modal de login	✅ Completo
🚀 Próximos passos (sugestões)
Conectar com backend real

Salvar agendamentos no banco de dados

Autenticação de usuário

Envio de e-mail de confirmação

Painel do administrador

