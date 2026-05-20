# Hopper - UnBilidade 
## VISÃO DO PRODUTO E DO PROJETO 
**Versão 0.9.5** 

### Integrantes do Grupo 

| Matrícula | Nome | Função (responsabilidade) | Pontos de participação na elaboração |
|---|---|---|---|
| 241025720 | Vitor Eduardo Araújo | Líder, Documentação e Scrum Master | 10  |
| 242028815 | Breno Elias de Carvalho Correia | Arquitetura e DevOps | 10  |
| 241038791 | Flavia de Melo Rebelato | Product Owner | 10  |
| 241012098 | Brenda Maria Cavalcante Chaves | Desenvolvedor Front-End | 10  |
| 251016045 | Thiago da Silva Borges | Desenvolvedor Back-End | 10  |
| 241025784 | João Paulo da Silva Pereira | Documentação e Requisitos | 10  |
| 241025819 | Pablo Antonio Martins de Sousa | Arquitetura e DevOps | 10  |
| 241041204 | PEDRO VICTOR TEIXEIRA SILVA | Desenvolvedor Back-End | 10  |
| 231011023 | Alexandre Vilar Valadares Fonseca | Desenvolvedor Front-End | 10  |
| 222006866 | João Vitor Tavares de Sá Lima | Arquitetura e DevOps | 10  |

### Histórico de Revisões 

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 23/04/26 | 0.1 | Primeira análise do documento e aquisição dos primeiros requisistos | Vitor Araújo, Flávia Rebelato e João Paulo  |
| 25/04/26 | 0.3 | Objetivos do produto, solução proposta e definição de tecnologias a serem ultilizadas | Araújo Vitor  |
| 30/04/26 | 0.6 | Backlog, criação dos perfis, planejamento, métricas, roteiro dos testes de software e referências | Vitor Araújo, João Paulo e Flávia Rebelato  |
| 04/05/26 | 0.9 | Inclusão de novo membro e finalização do documento2 | Vitor Araújo, João Paulo e Flávia Rebelato  |
| 05/05/26 | 0.9.5 | Métrica e medições, Teste de Software e Referências | João Paulo, Breno Elias  |

---

## 1. Visão Geral do Produto 

### 1.1 Contexto de Negócio 
O cenário operacional das clínicas de fisioterapia caracteriza-se por um fluxo constante de pacientes que demandam tratamentos recorrentes e sessões de longo prazo.  Essa natureza do serviço exige uma gestão de agenda extremamente precisa para garantir a continuidade terapêutica.  Entretanto, o modelo de atendimento atual é marcado pela descentralização, onde a marcação de consultas ocorre majoritariamente de forma manual através de redes sociais e aplicativos de mensagens instantâneas.  Esse ambiente de gestão, desprovido de ferramentas dedicadas, resulta em processos dependentes da memória humana ou de anotações físicas e digitais não integradas, dificultando o controle gerencial sobre a ocupação dos profissionais e a real disponibilidade da clínica. 

### 1.2 Problema e Análise de Causa (Ishikawa) 
A carência de automação e de um controle centralizado acarreta gargalos operacionais e prejuízos financeiros diretos.  A falta de critérios sistêmicos para a gerência de urgências e a inexistência de notificações automáticas impedem que a clínica responda com agilidade às flutuações da demanda.  Esse cenário torna o fluxo de trabalho suscetível a erros humanos, comprometendo a segurança dos dados e a qualidade do serviço. 

*A Figura 1 do Documento (Ishikawa) demonstra os principais problemas identificados agrupados em MÉTODOS, MÃO DE OBRA, TECNOLOGIA e MEDIÇÃO.* , 23, 30, 31, 38

O problema central não é apenas a falta de uma agenda, mas a fragmentação das causas.  A utilização de métodos informais (Métodos) aliada à falta de ferramentas específicas (Tecnologia) gera um ciclo de falhas humanas (Pessoas) e falta de dados para decisão (Medição), resultando inevitavelmente no overbooking e na evasão de horários. , 43

### 1.3 Solução Proposta e Justificativa 
A solução proposta consiste no desenvolvimento de uma plataforma web de gestão e automação de agendamento, que aborde justamente a solução dos problemas descritos.  O software atuará como um sistema centralizado de controle operacional, eliminando a dependência de processos manuais e informais, auxiliando a equipe operacional da clínica em seu dia a dia.  Ao garantir a segurança e a conformidade dos dados clínicos em um ambiente dedicado, o software visa converter processos manuais fragmentados em um fluxo de trabalho seguro e eficiente, proporcionando sustentabilidade financeira à clínica e uma experiência de atendimento superior tanto para os profissionais quanto para os pacientes. 

### 1.4 Declaração de Posição do Produto 
O produto que estamos propondo, é um sistema web especializado em gestão ativa de agenda.  Diferente de uma agenda digital passiva, o software atua como um motor de busca de eficiência, integrando a interface do paciente com a visão administrativa do gestor para garantir que a capacidade operacional da clínica seja sempre maximizada.  Enquanto concorrentes exigem que a secretária identifique um horário vago e entre em contato manual com o próximo paciente, o Hopper automatiza esse "casamento" entre a vaga disponível e a lista de espera, reduzindo drasticamente o tempo de resposta e o erro humano. 

**Usuários-alvo e Clientes:** 
* Gestores e Fisioterapeutas que buscam previsibilidade financeira e organização. O produto é importante para eles pois reduz o prejuízo causado por janelas vazias e libera a equipe de tarefas repetitivas de chat. 
* Para os pacientes, que buscam autonomia e clareza. São pessoas que preferem resolver o agendamento de forma assíncrona, sem a necessidade de ligações ou espera em filas de WhatsApp, valorizando a segurança de seus dados. 

**Por que os clientes deveriam utilizar este produto?** A principal motivação é a proteção da lucratividade.  Uma clínica de fisioterapia vende "tempo de atendimento". Cada hora vaga é um produto que perece.  O nosso sistema é desenhado para garantir que, caso ocorra um cancelamento, o sistema trabalhe para preencher aquela vaga em minutos através de algoritmos de notificação inteligente, algo que as ferramentas genéricas de redes sociais ou agendas estáticas não oferecem. 

| Tópico | Descrição |
|---|---|
| **Para:** | Gestores de clínicas de fisioterapia e seus pacientes  |
| **Necessidade:** | Organizar, automatizar, centralizar, integrar e facilitar OS agendamentos de uma clínica de fisioterapia em um sistema único. Sofrem com ociosidade da agenda, cancelamentos e ineficiência no atendimento via redes sociais.  |
| **O (nome do produto):** | UnBilidade  |
| **Que:** | Automatiza o ciclo de agendamentos e a ocupação imediata de lacunas deixadas por desistências.  |
| **Ao contrário:** | Softwares ERP genéricos ou robustos demasiadamente, como o ZenFisio, que focam numa gestão administrativa.  |
| **Nosso produto:** | Prioriza a recuperação de receita e experiência de agendamento pelo próprio usuário.  |

### 1.5 Objetivos do Produto 
O projeto tem o objetivo de aumentar a eficiência nos agendamentos de clínicas de fisioterapia por meio de uma plataforma web limpa e objetiva, com esquema de cores acessíveis para todas as idades, com interfaces tanto para paciente, tanto para secretário/médico, promovendo um menor número de desmarcações nas consultas por mudanças de horários e centralizando a informação em um sistema único. 

### 1.6 Tecnologias a serem utilizadas 
* **Front-end:** React.js com o framework Next.js (TypeScript) , 64
* **Back-end:** Next.js API Routes (TypeScript), Validação com lib Zod, Vercel Cron, Resend (e-mails) , 66, 67, 68, 69
* **Testes:** Vitest + Supertest , 71
* **Banco de dados:** Supabase (PostgreSQL gerenciado) , 73
* **Hospedagem e Deploy:** Vercel , 76
* **Ambiente de desenvolvimento:** VSCode (Visual Studio Code) , 78
* **Ferramentas adicionais:** GitHub (versionamento), GitHub Pages (documentação), Jira (backlog), WhatsApp, Microsoft Teams, Discord. , 81, 82, 83

---

## 2. Visão Geral do Projeto 

### 2.1 Ciclo de Vida do Projeto de Desenvolvimento de Software 
A figura abaixo apresenta o ciclo de vida usando o framework Scrum adotado no desenvolvimento do Unbilidade.  Para o desenvolvimento do projeto UnBilidade, será adotada a metodologia ágil adaptada, utilizando uma abordagem híbrida que combina os frameworks Scrum e XP (Extreme Programming). 3 A adoção desse framework se justifica pela natureza e proposição do projeto que necessita de entrega contínua de valor ao cliente final. 4

A aplicação do Scrum possibilita a organização do trabalho em sprints curtos, com entregas incrementais, o que facilita a adaptação contínua às necessidades dos usuários. 5 Já o XP será adotado com ênfase em práticas de engenharia de software que elevam a qualidade do código e fortalecem a colaboração da equipe, incluindo pair programming, refatoração contínua, feedback rápido e integração contínua. 6

### 2.2 Organização do Projeto 7
O projeto UnBilidade foi organizado a partir de uma distribuição clara de papéis e responsabilidades, sem vínculos hierárquicos entre os integrantes. 8 Todos os membros são vistos como igualmente fundamentais para o êxito da iniciativa, contribuindo de acordo com suas competências técnicas, experiência e disponibilidade. 9 A equipe está distribuída em papéis claros de forma que cada membro tenha uma função específica, mas não se limitando a ela. 0

| Papel | Atribuições | Responsável | Participantes |
|---|---|---|---|
| Desenvolvedor Front-End | Idealizar design do produto, codificar a interface, codificar testes unitários, realizar refatoração, gerar análise de usuários, construir plano de implementação, documentar | Vitor Araújo | Brenda Chaves, Alexandre Vilar 1 |
| Desenvolvedor Back-End | Modelar e codificar banco de dados, codificar testes unitários, realizar refatoração, documentar | Vitor Araújo | Pedro Silva, Thiago Borges 1 |
| Desenvolvedor DevOps | Integrar back-end e front-end, codificar testes unitários, realizar refatoração, documentar, distribuir produto, manter infraestrutura através de monitoramento | Vitor Araújo | João Vitor, Pablo Antônio, Breno Elias 1 |
| Dono do Produto | Atualizar o escopo do produto, organizar o escopo das sprints, validar as entregas | Vitor Araújo | Flávia Rebelato 1 |
| Analista de Qualidade | Garantir a qualidade do produto, garantir o cumprimento do conceito de pronto, realizar inspeções de código | Flávia Rebelato, Vitor Araújo | Flávia Rebelato, Vitor Araújo 1 |
| Cliente | Validar os requisitos do sistema, fornecer feedback sobre as funcionalidades, avaliar se 0 produto atende às necessidades esperadas e participar das homologações e testes de aceitação. | Flávia Rebelato |  1 |

### 2.3 Planejamento das Fases e/ou Iterações do Projeto 5
O desenvolvimento do UnBilidade será estruturado em sprints com entregas graduais e incrementais ao longo do período estipulado com entrega continua de valor, seguindo a metodologia Scrum+XP. 6 O planejamento será atualizado conforme necessidade do grupo durante o desenvolvimento. 7

| Sprint | Produto (Entrega) | Data Início | Entregável(eis) | Data Fim | Responsáveis | % conclusão |
|---|---|---|---|---|---|---|
| Sprint 1 | Definição do Produto e Visão de Projeto | 23/04/26 | Documento de Visão De Projeto e Produto | 02/05/26 | Vitor Araújo, Flávia Rebelato, João Paulo | 100% 8 |
| Sprint 2 | MVP e Arquitetura | 02/05/26 | Documento de Arquitetura v1.0; definição do ambiente de desenvolvimento; repositório configurado no GitHub | 16/05/26 | Pablo Antônio, João Vitor, Vitor Araújo | 30% 8 |
| Sprint 3 | Funcionalidades A, B, C, D | 16/05/26 | RF01, RF02, RF03 (Cadastro, Autenticação e Calendário) | 23/05/26 | Brenda, Alexandre, Pedro, Thiago | 8 |
| Sprint 4 | Funcionalidades E, F e G | 23/05/26 | RF04 a RF07 (Agendamento, Lembretes e Cancelamento); Inspeções | 30/05/26 | Brenda, Alexandre, Pedro, Thiago | 8 |
| Sprint 5 | Funcionalidades H, I e J | 30/05/26 | RF08 a RF16 (Upload, Histórico, Evolução, Admin); Reparos | 20/06/26 | Time completo | 8 |

### 2.4 Matriz de Comunicação 1
A comunicação do grupo Hopper está organizada de forma com que o grupo tenha um bom desempenho, com acompanhamento de riscos, acompanhamento das atividades, validação das entregas e alinhamento entre os membros da equipe. 2 As formas de comunicação ficaram da seguinte forma:
A equipe realizará uma reunião semanal, com a presença mandatória de todos os membros, incluindo o Scrum Master, PO e os outros membros. 4 Para uma comunicação mais direta e em tempo real usaremos as ferramentas disponíveis como o WhatsApp, Microsoft Teams e Discord. 5

| Descrição | Área/ Envolvidos | Periodicidade | Produtos Gerados |
|---|---|---|---|
| Reunião geral de acompanhamento | Equipe Completa | Semanal | Ata de reunião Atualização de status 8 |
| Comunicação com o monitor | Scrum Master, PO | Conforme necessidade | Relatório de status do projeto e esclarecimento de impedimentos 8 |
| Alinhamento sobre critérios de aceite | PO, Scrum Master, desenvolvedores | Ao final de cada sprint | Critérios definidos e documentados 8 |
| Atualizações internas rápidas | Toda a equipe | Contínua (WhatsApp) | Notificações, lembretes, decisões rápidas 8 |

### 2.5 Gerenciamento de Riscos 9
O gerenciamento de riscos do projeto Unbilidade tem como objetivo identificar antecipadamente situações que possam comprometer o andamento do desenvolvimento, a qualidade das entregas ou a experiência dos usuários finais pacientes e profissionais da clínica. 0 A equipe adotou uma abordagem preventiva, mapeando os principais riscos e definindo estratégias de mitigação (para evitar que ocorram) e de contingência (para o caso de se concretizarem). 1 A lista de riscos será revisada a cada sprint, sendo atualizada conforme novos riscos forem identificados ou o contexto do projeto evoluir. 2

### 2.6 Critérios de Replanejamento 3
O replanejamento no projeto Unbilidade será realizado sempre que houver fatores que comprometam o andamento da sprint, a qualidade das entregas ou a aderência aos objetivos definidos no backlog. 4 A equipe utilizará como base o acompanhamento semanal, as revisões de sprint e a análise contínua dos riscos mapeados na seção 2.5 para identificar a necessidade de ajustes. 5

A seguir, são definidos os principais critérios que podem justificar um replanejamento:
* Desistência, afastamento ou baixo engajamento de membros da equipe, impactando diretamente a capacidade de execução das tarefas planejadas para a sprint. 7
* Atrasos críticos na entrega de funcionalidades prioritárias, especialmente aquelas das quais outras partes do sistema dependem, como autenticação, calendário de agendamento e integração com o Supabase. 8
* Mudanças significativas no escopo propostas pelo Product Owner que afetem entregas em andamento ou já definidas para a sprint atual. 9
* Problemas técnicos ou de integração entre Next.js e Supabase que impeçam o avanço do desenvolvimento conforme previsto na arquitetura do sistema. 0
* Validações negativas durante testes, indicando que funcionalidades entregues não atendem aos critérios de aceite definidos junto ao Product Owner. 1
* Resultado insatisfatório nas inspeções de código realizadas pelo monitor, exigindo refatoração significativa que comprometa o cronograma das sprints seguintes. 2

#### 2.6.1 Avaliando grau de riscos 5
O grau de risco atribuído — baixo, médio ou alto — é definido por análise qualitativa, considerando a combinação entre a probabilidade de ocorrência e o impacto potencial caso o risco se concretize. 5 A avaliação é realizada por consenso entre os membros da equipe ao início de cada sprint, levando em conta o histórico de entregas, a complexidade das funcionalidades planejadas e a disponibilidade dos integrantes. 6

| Risco | Grau | Mitigação (Plano A) | Contingência (Plano B) |
|---|---|---|---|
| Desistência ou afastamento de membro da equipe | Alto | Distribuição equilibrada de responsabilidades desde o início; nenhum módulo crítico com responsável único 1 | Redistribuir tarefas entre os membros ativos; acionar o Scrum Master para replanejamento imediato da sprint 1 |
| Atraso na entrega do documento de visão comprometendo o kick off | Alto | Divisão clara das seções entre os responsáveis desde a Sprint 1; revisões incrementais antes do prazo 2, 153 | Priorizar as seções obrigatórias para entrega mínima no prazo e complementar na Sprint 2 3 |
| Falta de comunicação entre front-end, back end e DevOp | Médio | Daily assíncrona via canal do grupo; reunião semanal com ata registrada; Scrum Master como facilitador 4 | Intervenção direta do Scrum Master para realinhar as equipes e revisar o plano da sprint em andamento 4 |
| Atraso na entrega do back-end | Alto | Divisão clara por partes, versionamento incremental 4 | Reduzir escopo ou mover funcionalidades para sprint futura 4 |
| Alteração tardia de requisitos pelo Product Owner | Alto | Backlog refinado e priorizado antes de cada sprint com validação da PO; mudanças somente entre sprints 5 | Repriorizar o backlog junto à PO, negociando o que entra e sai do escopo da sprint corrente 5 |

---

## 3. Processo de Desenvolvimento de Software 5
O processo de desenvolvimento do projeto Hopper será guiado por uma abordagem ágil, fundamentada nos princípios do Scrum e nas práticas do Extreme Programming (XP). 5 A equipe adota a metodologia ScrumXP, combinação das práticas de gerenciamento do Scrum com as práticas técnicas do XP. 6 Essa escolha se justifica pelo contexto do projeto: equipe pequena, escopo dinâmico, prazo semestral definido e necessidade de entregas incrementais de valor a cada ciclo. 7

### 3.1 Scrum Adaptado 9
O framework Scrum foi escolhido como base para a organização das atividades, com ajustes conforme a dinâmica da equipe. 9 Os papéis clássicos estão representados, mas exercidos de forma colaborativa. 0 O processo se organiza em três macrofases encadeadas: pré-sprint, sprint e pós sprint. 1 

Na fase de pré-sprint, a equipe realiza o planejamento da iteração a partir do Product Backlog priorizado pela PO. 2 Durante a sprint, o desenvolvimento segue as práticas do XP. 6 O Daily Scrum é realizado de forma assíncrona pelo canal da equipe. 7 Na fase de pós-sprint, a equipe realiza a Sprint Review com demonstração do incremento entregue para validação da PO, seguida da Retrospectiva. 9

### 3.2 Práticas de XP Incorporadas 1
Foram incorporadas práticas do Extreme Programming (XP) para garantir qualidade técnica e eficiência no desenvolvimento:
* **Desenvolvimento incremental:** cada funcionalidade será implementada em partes pequenas e entregues gradualmente. 1
* **Programação em pares:** tarefas de maior complexidade técnica serão desenvolvidas em dupla. 2
* **Refatoração contínua:** o código será melhorado conforme surgirem oportunidades. 3
* **Integração contínua:** o repositório no GitHub será atualizado frequentemente. 4
* **Feedback estruturado:** a cada entrega de funcionalidade, o time realiza validações internas. 5
* **Participação coletiva na documentação:** os membros colaboram com a construção e atualização dos artefatos. 6

---

## 4. Declaração de Escopo do Projeto 0

O backlog do produto é uma lista de requisitos e funcionalidades que serão trabalhados pelo time. 0 Os requisitos e funcionalidades deverão ser entregues e validados de forma incremental. 1 Tendo em vista que o projeto Hopper tem como contexto uma clínica fictícia, o Product Owner e o Scrum Master desempenham juntos o papel de representantes do cliente. 2 

### 4.1 Perfis 4
Os perfis de acesso do Hopper foram definidos a partir de alinhamento entre os membros do grupo. 4 O sistema conta com quatro perfis principais:
* **Pacientes:** Paciente com alguma necessidade de fisioterapia, que queira marcar uma consulta. Pode marcar, consultar prontuário, editar informações, cancelar, remarcar. 1
* **Secretária:** Responsável por deixar o retorno de pacientes marcado. Pode marcar, excluir, remarcar e consultar lista do dia. 2
* **Médico/Fisioterapeuta:** Informação de especialidade, breve biografia. Pode editar informações, consultar pacientes, remarcar. 2
* **Administrador:** Responsável por manter perfis, criar usuários, monitorar uso e gerenciar configurações. 1

### 4.2 Cenários 3
Os cenários funcionais definidos cobrem desde a configuração inicial até as operações do dia a dia. 3

| Numeração | Nome do cenário | Sprints (Descrição) |
|---|---|---|
| 1 | Autenticação e Cadastro | Gestão de acesso para pacientes, fisioterapeutas e secretária, incluindo o formulário de novos pacientes. 0 |
| 2 | Fluxo de Agendamento | Visualização de calendário, escolha de tipo de atendimento, profissional e reserva temporária de 5 minutos. 1 |
| 3 | Comunicação e Alertas | Sistema automatizado de envio de e-mails para confirmação imediata e lembretes de 24 horas. 2 |
| 4 | Gestão de Consultas | Controle de cancelamentos (mínimo 24h), remarcações e prevenção de choque de horários. 3 |
| 5 | Registro Clínico | Funcionalidade de upload de laudos (PDF/JPG) e registro de evolução diária pelo fisioterapeuta. 4 |
| 6 | Administração e Suporte | Painel da secretária para gerir intervalos/folgas e seção de Perguntas Frequentes (FAQ). 5 |

### 4.3 Tabela de Backlog do produto 6

| ID | Sprint | Nome do Requisito | Tipo | Priorização | Descrição Suscinta | User Stories Associadas |
|---|---|---|---|---|---|---|
| RNF01 | 2 | Segurança de Dados | Não Funcional | Must | Garantir segurança e conformidade dos dados clínicos. | - 6 |
| RNF02 | 2 | Usabilidade | Não Funcional | Must | Interface limpa, objetiva e com cores acessíveis. | - 7 |
| RNF03 | 2 | Disponibilidade | Não Funcional | Should | Disponível via navegador web (Chrome, Firefox, Edge, Safari). | - 8 |
| RNF04 | 2 | Desempenho | Não Funcional | Should | Tempo de resposta de operações chave < 3 segundos. | - 9 |
| RNF05 | 2 | Deploy Contínuo | Não Funcional | Must | Integração pipeline de deploy contínuo Vercel e GitHub Actions. | - 0 |
| RF01 | 3 | Cadastro de Paciente | Funcional | Must | Permitir cadastro com dados obrigatórios e opcionais. | US01 1, 232 |
| RF02 | 3 | Autenticação de Usuários | Funcional | Must | Autenticar por e-mail e senha, com sessão segura. | US02 3, 234 |
| RF03 | 3 | Calendário Interativo | Funcional | Must | Exibir calendário com horários por serviço/profissional. | US03 5, 236 |
| RF04 | 4 | Agendamento de Consultas | Funcional | Must | Agendamento de consultas presenciais/domiciliares em até 5 etapas. | US04 7, 238 |
| RF05 | 4 | Fluxo de Primeira Consulta | Funcional | Must | Diferenciar agendamento para primeira consulta com dados extras. | US05 9, 240 |
| RF06 | 4 | Cancelamento e Remarcação | Funcional | Must | Permitir cancelamento/remarcação com >24h de antecedência. | US06 1, 242 |
| RF07 | 4 | Lembrete Automático por E-mail | Funcional | Must | Enviar lembrete 24h antes da consulta. | US07 3, 244, 245 |
| RF08 | 5 | Upload de Documentos | Funcional | Should | Permitir upload de laudos (PDF, JPG, PNG) até 10MB. | US08 7, 248 |
| RF09 | 5 | Histórico de Consultas | Funcional | Must | Exibir histórico de consultas na área do paciente. | US09 9, 250 |
| RF10 | 5 | Relatório de Evolução | Funcional | Should | Fisioterapeuta registra evolução clínica após sessão. | US10 1, 252 |
| RF11 | 5 | Exibição de Serviços | Funcional | Must | Exibir serviços prestados (nome, descrição, indicações). | US11 3, 254 |
| RF12 | 5 | Exibição do Corpo Clínico | Funcional | Should | Exibir profissionais (foto, CREFITO, especialidades). | US12 5, 256 |
| RF13 | 5 | Gestão de Horários (Admin) | Funcional | Must | Secretária/Admin cadastra e edita horários de profissionais. | US13 7, 258 |
| RF14 | 5 | Preferência de Profissional | Funcional | Should | Paciente indica preferência ou atribuição automática. | US14 9, 260 |
| RF15 | 5 | Aviso de Encaminhamento | Funcional | Should | Aviso sobre encaminhamento para convênios. | US15 1, 262 |
| RF16 | 5 | Reserva Temporária | Funcional | Must | Reservar horário selecionado por até 5 min durante agendamento. | US16 3, 264, 265 |
| RF17 | 5 | FAQ de Dúvidas Frequentes | Funcional | Could | Exibir FAQ. | US17 6, 267 |

---

## 5. Métricas e Medições 8
As métricas e medições do projeto UnBilidade seguirão o método GQM (Goal Question-Metric). 8 Essa abordagem torna a visualização dos objetivos e o atingimento das métricas explícitos e rastreáveis. 9

* **Objetivo (Goal):** Identificar proativamente situações que indicam a necessidade de replanejamento durante o desenvolvimento do UnBilidade. 0
* **Perguntas (Questions):** Participação balanceada? (Q1) Qualidade das entregas? (Q2) Distribuição de trabalho? (Q3) Entregas correspondem ao backlog? (Q4) 1, 272, 273, 274
* **Métricas:** M1 (Presença, cumprimento de tarefas); M2 (Aceitação de testes, débito técnico); M3 (Distribuição de commits, tipo de atividade); M4 (Velocidade, Histórias não concluídas). 6-283
* **Coleta de Dados:** Ocorrerá através do GitHub, Jira, Vitest/Supertest e Atas de Reunião, sob responsabilidade do Scrum Master. 4-288

---

## 6. Testes de Software 3
O plano de testes do projeto UnBilidade é fundamental para garantir a confiabilidade, segurança e a excepcional experiência de usuário prometida. 3

### 6.1 Estratégia de Testes 5
A estratégia adotada combina pirâmide de testes clássica com a realidade de um projeto full-stack em Next.js. 5 O foco será em testes automatizados para acelerar o feedback e garantir a robustez do sistema. 6
* Automação Prioritária (agendamento, cancelamento). 7
* Ambiente Isolado (banco Supabase de homologação). 8
* Dados Controlados. 9
* Cobertura Mínima de 80%. 0
* Feedback Rápido (Pull Requests). 1

### 6.2 Níveis e Tipos de Teste 2

| Nível | Descrição | Ferramenta | Exemplo no UnBilidade |
|---|---|---|---|
| Unitário | Validam funções e métodos isolados. | Vitest | Verificar se a regra de "cancelamento com 24h" retorna true/false. 2, 303 |
| Integração | Validam a interação entre módulos (API Routes, Supabase). | Supertest + Vitest | Testar se rota valida horário ocupado. 4, 305 |
| Sistema (E2E) | Simulam o fluxo completo do usuário no navegador. | Playwright ou Cypress | "Paciente" loga, agenda, recebe email. 6, 307 |
| Segurança | Validam controle de acesso e proteção (LGPD). | Manuais + Supertest | Garantir que paciente não acesse histórico de outro. 8, 309 |

### 6.3 Roteiro de Testes (Exemplo para a Sprint 3) 0

**Roteiro de Testes para Funcionalidades Core** 1

| Código | Nome do Teste | Tipo | Nível | RF Associado |
|---|---|---|---|---|
| TU-01 | Validação de e-mail e CPF | Negativo | Unitário | RF01, RF02 2 |
| TU-02 | Cálculo de horário de lembrete | Funcional | Unitário | RF07 2 |
| TI-01 | Cadastro de paciente com dados válidos | Funcional | Integração | RF01 2 |
| TI-02 | Cadastro com e-mail duplicado | Negativo | Integração | RF01 3 |
| TI-03 | Login com credenciais corretas | Funcional | Integração | RF02 3 |
| TI-04 | Reserva de horário por 5 minutos | Funcional | Integração | RF16 3 |
| TA-01 | Fluxo de agendamento de primeira consulta | Funcional | Sistema (E2E) | RF04, RF05 3 |
| TA-02 | Cancelamento com antecedência < 24h | Negativo | Sistema (E2E) | RF06 4 |

**Critérios de Aceitação dos Testes**

| Código | Funcionalidade Associada | Critério de Aceitação (Condição de Sucesso) |
|---|---|---|
| TU-01 | Validação de Cadastro | O sistema deve rejeitar CPF inválido e e-mail sem formato correto, exibindo mensagem de erro amigável. 4, 315 |
| TU-02 | Lembrete Automático | A função que calcula a data/hora do envio deve retornar "24h antes" para agendamentos futuros, e "enviar agora" para < 24h. 5 |
| TI-01 | Cadastro de Paciente | O sistema deve retornar status 201 (Criado) e o novo paciente deve persistir no Supabase. 6 |
| TI-02 | Prevenção de Duplicidade | O sistema deve retornar status 409 (Conflito) com a mensagem "E-mail já cadastrado". 7 |
| TI-03 | Autenticação | O sistema deve retornar status 200 e um token de sessão (JWT ou similar) válido. 8 |
| TI-04 | Reserva de Horário | Após a requisição, o horário deve ficar como "reservado" no banco de dados por 5 minutos. 9 |
| TA-01 | Agendamento Completo | Ao final do fluxo de 5 etapas, a consulta deve ser criada, e-mail de confirmação enviado, horário vai para "confirmado". 0 |
| TA-02 | Cancelamento Restrito | O sistema deve impedir o cancelamento, retornar erro visível e manter a consulta ativa. 1 |

---

## 7. Referências Bibliográficas 2
* BECK, Kent. Extreme Programming Explained: Embrace Change. 2. ed. Boston: Addison Wesley, 2004. 2
* BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). 3
* COHN, Mike. User Stories Applied: For Agile Software Development. Boston: Addison-Wesley, 2004. 4, 325
* CONSELHO FEDERAL DE FISIOTERAPIA E TERAPIA OCUPACIONAL (COFFITO). Resolução nº 424. 5, 326
* FOWLER, Martin. Refactoring: Improving the Design of Existing Code. 2. ed. Boston: Addison Wesley, 2018. 7, 328
* GRUMAN, Galen. A Guide to Agile Development. InfoWorld, São Francisco, 2009. 8, 329
* KITCHENHAM, Barbara; PFLEEGER, Shari Lawrence. Principles of Survey Research: Part 1. 9, 330
* NIELSEN, Jakob; LORANGER, Hoa. Prioritizing Web Usability. Berkeley: New Riders, 2006. 1, 332
* O'BRIEN, James A.; MARAKAS, George M. Administração de Sistemas de Informação. 2, 333
* PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software: Uma Abordagem Profissional. 3, 334
* REZENDE, Denis Alcides. Planejamento de Sistemas de Informação e Informática. 4, 335
* SCHWABER, Ken; SUTHERLAND, Jeff. The Scrum Guide. 5, 336
* SOMMERVILLE, Ian. Engenharia de Software. 10. ed. 6, 337
* WAZLAWICK, Raul Sidnei. Engenharia de Software: Conceitos e Práticas. Rio de Janeiro: Elsevier, 2013. 7