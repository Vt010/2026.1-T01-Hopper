**Hopper - UnBemEstar** 

**VISÃO DO PRODUTO E DO PROJETO** 

Versão 1.0 

Tabela - Integrantes do Grupo: 



|**Matrícula** |**Nome** |**Função (responsabilidade)** |**Pontos de participação na elaboração** |
| - | - | :- | :- |
|241025720 |Vitor Eduardo Araújo |Líder, Documentação e Scrum Master |10 |
|242028815 |Breno Elias de Carvalho Correia |Arquitetura e DevOps |10 |
|241038791 |Flavia de Melo Rebelato |Product Owner |10 |
|241012098 |Brenda Maria Cavalcante Chaves |Desenvolvedor Front-End |10 |
|251016045 |Thiago da Silva Borges |Desenvolvedor Back-End |10 |
|241025784 |João Paulo da Silva Pereira |Documentação e Requisitos |10 |
|241025819 |Pablo Antonio Martins de Sousa |Arquitetura e DevOps |10 |
|241041204 |PEDRO VICTOR TEIXEIRA SILVA |Desenvolvedor Back-End |10 |
|231011023 |Alexandre Vilar Valadares Fonsêca |Desenvolvedor Front-End |10 |
|222006866 |João Vitor Tavares de Sá Lima |Arquitetura e DevOps |10 |

**Histórico de Revisões** 



|**Data** |**Versão** |**Descrição** |**Autor** |
| - | - | - | - |
|23/04/26 |0\.1 |Primeira análise do documento e aquisição dos primeiros requisistos |Vitor Araújo, Flávia Rebelato e João Paulo |
|` `25/04/26 |0\.3 |Objetivos do produto, solução proposta e definição de tecnologias a serem ultilizadas |Vitor Araújo |
|30/04/26 |0\.6 |Backlog, criação dos perfis, planejamento, métricas, roteiro dos testes de software e referências |Vitor Araújo, João Paulo e Flávia Rebelato |
|04/05/26 |0\.9 |Inclusão de novo membro e finalização do documento2 |Vitor Araújo, João Paulo e Flávia Rebelato |
|05/05/26 |0\.9.5 |Métrica e medições, Teste de Software e Referências |João Paulo, Breno Elias |
|16/05/26 |1\.0 |Correções feitas com base nos apontamentos do professor na apresentação do Documento de Visão |Flávia Rebelato |

[***1  Visão Geral do Produto ................................................................................................................. 4*** ](#_page3_x69.00_y107.80)

1. [**Contexto de Negócio .................................................................................................... 4** ](#_page3_x69.00_y145.80)
1. [**Problema e Análise de Causa (Ishikawa)................................................................... 4** ](#_page3_x69.00_y316.80)
1. [**Solução Proposta e Justificativa ................................................................................. 5** ](#_page4_x69.00_y113.80)
1. [**Declaração de Posição do Produto ............................................................................. 5** ](#_page4_x69.00_y295.80)
1. [**Objetivos do Produto ................................................................................................... 6** ](#_page5_x69.00_y305.80)
1. [**Tecnologias a serem utilizadas.................................................................................... 6** ](#_page5_x69.00_y420.80)

[***2  Visão Geral do Projeto .................................................................................................................. 7*** ](#_page6_x95.00_y354.80)

1. [**Ciclo de Vida do Projeto de Desenvolvimento de Software ..................................... 7** ](#_page6_x69.00_y393.80)
1. [**Organização do Projeto ............................................................................................... 8** ](#_page7_x69.00_y232.80)
1. [**Planejamento das Fases e/ou Iterações do Projeto ................................................... 9** ](#_page8_x69.00_y142.80)
1. [**Matriz de Comunicação ............................................................................................ 10** ](#_page9_x69.00_y113.80)
1. [**Gerenciamento de Riscos .......................................................................................... 10** ](#_page9_x69.00_y524.80)
6. [**Critérios de Replanejamento .................................................................................... 10** ](#_page9_x69.00_y674.80)

[2.6.1  Avaliando grau de riscos ...................................................................................... 11 ](#_page10_x69.00_y461.80)

[***3  Processo de Desenvolvimento de Software ............................................................................. 12*** ](#_page11_x69.00_y622.80)

1. [**Scrum Adaptado ........................................................................................................ 13** ](#_page12_x101.00_y113.80)
1. [**Práticas de XP Incorporadas .................................................................................... 13** ](#_page12_x69.00_y683.80)

[***4  Declaração de Escopo do Projeto .............................................................................................. 14*** ](#_page13_x69.00_y530.80)

1. [**Perfis............................................................................................................................ 16** ](#_page15_x69.00_y486.80)
1. [**Cenários ...................................................................................................................... 17** ](#_page16_x69.00_y739.80)
1. [**Tabela de Backlog do produto .................................................................................. 19** ](#_page18_x69.00_y157.80)

[***5  Métricas e Medições .................................................................................................................... 22*** ](#_page21_x94.00_y405.80)

1. [**Objetivo (Goal) ........................................................................................................... 22** ](#_page21_x69.00_y502.80)
1. [**Perguntas (Questions) ................................................................................................ 22** ](#_page21_x69.00_y585.80)
1. [**Métricas (Metrics) ...................................................................................................... 23** ](#_page22_x69.00_y136.80)
4. [**Coleta de Dados e Ações de Replanejamento .......................................................... 23** ](#_page22_x69.00_y580.80)

[***6  Testes de Software ...................................................................................................................... 24*** ](#_page23_x69.00_y197.80)

1. [**Estratégia de Testes ................................................................................................... 24** ](#_page23_x69.00_y294.80)
1. [**Níveis e Tipos de Teste ............................................................................................... 24** ](#_page23_x101.00_y536.80)
1. [**Roteiro de Testes (Exemplo para a Sprint 3) .......................................................... 25** ](#_page24_x69.00_y498.80)

[***7  Referências Bibliográficas .......................................................................................................... 30*** ](#_page29_x69.00_y72.92)

3 

Visão do Produto e Projeto

<a name="_page3_x69.00_y107.80"></a>**1  Visão Geral do Produto** 

1. **Contexto<a name="_page3_x69.00_y145.80"></a> de Negócio** 

O cenário operacional das clínicas de fisioterapia caracteriza-se por um fluxo constante de  pacientes  que  demandam  tratamentos  recorrentes  e  sessões  de  longo  prazo.  Essa natureza  do  serviço exige  uma  gestão  de  agenda  extremamente  precisa  para  garantir a continuidade  terapêutica.  Entretanto,  o  modelo  de  atendimento  atual  é  marcado  pela descentralização, onde a marcação de consultas ocorre majoritariamente de forma manual através de redes sociais e aplicativos de mensagens instantâneas. Esse ambiente de gestão, desprovido  de  ferramentas  dedicadas,  resulta  em  processos  dependentes  da  memória humana ou de anotações físicas e digitais não integradas, dificultando o controle gerencial sobre a ocupação dos profissionais e a real disponibilidade da clínica. 

2. **Problema<a name="_page3_x69.00_y316.80"></a> e Análise de Causa (Ishikawa)** 

A  carência  de  automação  e  de  um  controle  centralizado  acarreta  gargalos operacionais e prejuízos financeiros diretos. A falta de critérios sistêmicos para a gerência de urgências e a inexistência de notificações automáticas impedem que a clínica responda com agilidade às flutuações da demanda. Esse cenário torna o fluxo de trabalho suscetível a erros humanos, comprometendo a segurança dos dados e a qualidade do serviço. 

**Figura 1 – Ishikawa – Principais problemas identificados** 

![Diagrama de Ishikawa](assets/assets_visao/Ishikawa.jpeg)

Fonte: Elaborado por Flávia Rebelato (2026) 

O problema central não é apenas a falta de uma agenda, mas a fragmentação das causas. A utilização de métodos informais (Métodos) aliada à falta de ferramentas específicas (Tecnologia)  gera  um  ciclo  de  falhas  humanas  (Pessoas)  e  falta  de  dados  para  decisão (Medição), resultando inevitavelmente no *overbooking* e na evasão de horários. 

3. **Solução<a name="_page4_x69.00_y113.80"></a> Proposta e Justificativa** 

A solução proposta consiste no desenvolvimento de uma plataforma web de gestão e automação de agendamento, que aborde justamente a solução dos problemas descritos. O software  atuará  como  um  sistema  centralizado  de  controle  operacional,  eliminando  a dependência de processos manuais e informais, auxiliando a equipe operacional da clínica em seu dia a dia. 

Ao  garantir  a  segurança  e  a  conformidade  dos  dados  clínicos  em  um  ambiente dedicado,  o  software  visa  converter  processos  manuais  fragmentados  em  um  fluxo  de trabalho  seguro  e  eficiente,  proporcionando  sustentabilidade  financeira  à  clínica  e  uma experiência de atendimento superior tanto para os profissionais quanto para os pacientes. 

4. **Declaração<a name="_page4_x69.00_y295.80"></a> de Posição do Produto** 
- O produto que estamos propondo, é um sistema web especializado em gestão ativa de agenda. Diferente de uma agenda digital passiva, o software atua como um motor de busca de eficiência, integrando a interface do paciente com a visão administrativa do  gestor  para  garantir  que  a  capacidade  operacional  da  clínica  seja  sempre maximizada. Enquanto concorrentes exigem que a secretária identifique um horário vago e entre em contato manual com o próximo paciente, o Hopper automatiza esse "casamento" entre a vaga disponível e a lista de espera, reduzindo drasticamente o tempo de resposta e o erro humano. 
- **Usuários-alvo e Clientes:** 

  Gestores e Fisioterapeutas que buscam previsibilidade financeira e organização. O produto é importante para eles pois reduz o prejuízo causado por janelas vazias e libera  a  equipe  de  tarefas  repetitivas  de  chat.  Para  os  pacientes,  que  buscam autonomia e clareza. São pessoas que preferem resolver o agendamento de forma assíncrona,  sem  a  necessidade  de  ligações  ou  espera  em  filas  de  WhatsApp, valorizando a segurança de seus dados. 

  **Por  que  os  clientes  deveriam  utilizar  este  produto?**  A  principal  motivação  é  a **proteção  da  lucratividade**.  Uma  clínica  de  fisioterapia  vende  "tempo  de atendimento".  Cada  hora  vaga  é  um  produto  que  perece.  O  nosso  sistema  é desenhado para garantir que, caso ocorra um cancelamento, o sistema trabalhe para preencher aquela vaga em minutos através de algoritmos de notificação inteligente, algo  que  as  ferramentas  genéricas  de  redes  sociais  ou  agendas  estáticas  não oferecem. 



|Para:   |Gestores de clínicas de fisioterapia e seus pacientes |
| - | - |
|Necessidade:   |Organizar,  automatizar,  centralizar,  integrar  e  facilitar  os agendamentos de uma clínica de fisioterapia em um sistema único. Sofrem com ociosidade da agenda, cancelamentos e ineficiência no atendimento via redes sociais. |
|O (nome do produto):   |UnBemEstar |
|Que:   |Automatiza  o  ciclo  de  agendamentos  e  a  ocupação  imediata  de lacunas deixadas por desistências. |
|Ao contrário:   |Softwares  ERP  genéricos  ou  robustos  demasiadamente,  como  o ZenFisio, que focam numa gestão administrativa. |
|Nosso produto:   |Prioriza a recuperação de receita e experiência de agendamento pelo próprio usuário. |

5. **Objetivos<a name="_page5_x69.00_y305.80"></a> do Produto**

O projeto tem o objetivo de aumentar a eficiência nos agendamentos de clínicas de fisioterapia por meio de uma plataforma web limpa e objetiva, com esquema de cores acessíveis para todas as idades, com interfaces tanto para paciente, tanto para secretário/médico, promovendo um menor número de desmarcações nas consultas por mudanças de horários e centralizando a informação em um sistema único. 

6. **Tecnologias<a name="_page5_x69.00_y420.80"></a> a serem utilizadas**

**Front-end:** 

- React.js com o framework Next.js (TypeScript) 

**Back-end:** 

- Next.js API Routes (TypeScript) 
- Validação com lib Zod 
- Vercel Cron  
- Resend (e-mails) 

**Testes:** 

- Vitest + Supertest 

**Banco de dados:** 

- Supabase (PostgreSQL gerenciado) 

**Hospedagem e Deploy:** 

- Vercel 

**Ambiente de desenvolvimento:** 

- VSCode (Visual Studio Code) 

**Ferramentas adicionais:** 

- GitHub — versionamento e repositório central 
- GitHub Pages — hospedagem da documentação técnica 
- Jira — gerenciamento do backlog e sprints 
- WhatsApp — comunicação rápida e informal 
- Microsoft Teams — reuniões formais e entregas da disciplina 
- Discord — comunicação técnica durante o desenvolvimento 

**2   <a name="_page6_x95.00_y354.80"></a> Visão Geral do Projeto** 

1. **Ciclo<a name="_page6_x69.00_y393.80"></a> de Vida do Projeto de Desenvolvimento de Software** 

A  figura  abaixo  apresenta  o  ciclo  de  vida  usando  o  framework  Scrum  adotado  no desenvolvimento do UnBemestar.

Figura 2 – Framework do ciclo de vida scrum 

![Ciclo Scrum](assets/assets_visao/Scrum.jpeg)

Fonte: Wrike.com, adaptado (2026) 

Para  o  desenvolvimento  do  projeto  UnBemEstar,  será  adotada  a  metodologia  ágil adaptada,  utilizando  uma  abordagem  híbrida  que  combina  os  frameworks  Scrum  e  XP (Extreme Programming). A adoção desse framework se justifica pela natureza e proposição do projeto que necessita de entrega contínua de valor ao cliente final. 

A aplicação do Scrum possibilita a organização do trabalho em sprints curtos, com entregas incrementais, o que facilita a adaptação contínua às necessidades dos usuários. Já o XP será adotado com ênfase em práticas de engenharia de software que elevam a qualidade do código e fortalecem a colaboração da equipe, incluindo pair programming, refatoração contínua, feedback rápido e integração contínua. 

2. **Organização<a name="_page7_x69.00_y232.80"></a> do Projeto** 

O projeto UnBemEstar foi organizado a partir de uma distribuição clara de papéis e responsabilidades, sem vínculos hierárquicos entre os integrantes. Todos os membros são vistos como igualmente fundamentais para o êxito da iniciativa, contribuindo de acordo com suas competências técnicas, experiência e disponibilidade. 

A equipe está distribuída em papéis claros de forma que cada membro tenha uma função específica, mas não se limitando a ela. 

Abaixo temos a tabela coma divisão de responsabilidades de cada membro da equipe: 

|Papel |Atribuições |Responsável |Participantes |
| - | - | - | - |
|Desenvolvedor Front-End |Idealizar  design  do  produto,  codificar  a interface,  validar  funcionalidades  pelos critérios  de  aceite  definidos  pelo  PO, realizar  refatoração,  gerar  análise  de usuários,  construir  plano  de implementação, documentar |Vitor Araújo |Brenda Chaves, Alexandre Vilar |
|Desenvolvedor Back-End |Modelar  e  codificar  banco  de  dados, validar funcionalidades pelos critérios de aceite  definidos  pelo  PO,  realizar refatoração, documentar |Vitor Araújo  |Pedro Silva, Thiago Borges |
|Desenvolvedor DevOps |Integrar  back-end  e  front-end,  validar funcionalidades pelos critérios de aceite definidos  pelo  PO,  realizar  refatoração, documentar,  distribuir  produto,  manter infraestrutura através de monitoramento |Vitor Araújo |João Vitor, Pablo Antônio, Breno Elias |
|Dono  do Produto |<p>Atualizar o escopo do produto, organizar </p><p>o escopo das sprints, validar as entregas </p>|Vitor Araújo |Flávia Rebelato |
|Analista  de Qualidade* |<p>Garantir a qualidade do produto, garantir </p><p>o  cumprimento  do  conceito  de  pronto, realizar inspeções de código </p>|Flávia Rebelato, Vitor Araújo |Flávia  Rebelato, Vitor Araújo |
|Cliente |Validar os requisitos do sistema, fornecer feedback  sobre  as  funcionalidades, avaliar  se  o  produto  atende  às necessidades esperadas e participar das |Flávia Rebelato |- |



|Papel |Atribuições |Responsável |Participantes |
| - | - | - | - |
||homologações e testes de aceitação*.* |||
Fonte: Vitor Araújo (2026) 

3. **Planejamento<a name="_page8_x69.00_y142.80"></a> das Fases e/ou Iterações do Projeto** 

O desenvolvimento do UnBemEstar será estruturado em sprints com entregas graduais e incrementais ao longo do período estipulado com entrega continua de valor, seguindo a metodologia Scrum+XP. 

O  planejamento  será  atualizado  conforme  necessidade  do  grupo  durante  o desenvolvimento. 



|` `***Sprint*** |***Produto (Entrega)*** |***Data Início*** |***Data Fim*** |***Entregável(eis)*** |***Responsáveis*** |***% conclusão*** |
| - | :- | - | - | - | - | :- |
|Sprint 1 |Definição  do Produto e Visão de Projeto |23/04/26 |02/05/26 |**Documento  de Visão De Projeto e Produto** |Vitor Araújo,  Flávia Rebelato, João Paulo |100% |
|Sprint 2 |MVP  e Arquitetura |02/05/26  |16/05/26 |Documento  de Arquitetura  v1.0; definição  do ambiente  de desenvolvimento; repositório configurado  no GitHub |Pablo Antônio, João  Vitor, Vitor Araújo |30% |
|Sprint 3 |Funcionalidades A, B, C, D |16/05/26 |23/05/26 |RF01, RF02, RF03 (Cadastro, Autenticação  e Calendário) |Brenda, Alexandre, Pedro, Thiago ||
|Sprint 4 |Funcionalidades E, F e G |23/05/26 |30/05/26 |RF04  a  RF07 (Agendamento, Lembretes  e Cancelamento);  |Brenda, Alexandre, Pedro, Thiago ||
|Sprint 5 |Funcionalidades H, I e J |30/05/26 |20/06/26 |RF09  a  RF16 (Upload, Histórico, Serviços, Admin e Encerramento);  |Time completo ||
Fonte: Vitor Araújo 

4. **Matriz<a name="_page9_x69.00_y113.80"></a> de Comunicação** 

A comunicação do grupo Hopper está organizada de forma com que o grupo tenha um bom desempenho, com acompanhamento de riscos, acompanhamento das atividades, validação das entregas e alinhamento entre os membros da equipe. 

As formas de comunicação ficaram da seguinte forma:  

A equipe realizará uma reunião semanal, com a presença mandatória de todos os membros, incluindo o Scrum Master, PO e os outros membros. Para uma comunicação mais direta e em tempo real usaremos as ferramentas disponíveis como o WhatsApp, Microsoft Teams e Discord. Dessa forma a equipe conseguirá se autogerenciar e acompanhar a evolução de cada membro. 

Abaixo segue a tabela da Matriz de Comunicação: 

|**Descrição ![](Aspose.Words.8a9697ee-6302-43a6-bea8-de70c6565082.003.png)**|**Área/ Envolvidos** |**Periodicidade** |**Produtos Gerados ![](Aspose.Words.8a9697ee-6302-43a6-bea8-de70c6565082.004.png)**|
| - | :- | - | - |
|Reunião geral de acompanhamento |Equipe Completa |Semanal |Ata de reunião Atualização de status |
|Comunicação com o monitor |Scrum Master, PO |Conforme necessidade |Relatório  de  status  do projeto  e  esclarecimento de impedimentos |
|Alinhamento sobre critérios de aceite |PO, Scrum Master, desenvolvedores |Ao final de cada sprint |Critérios  definidos  e documentados |
|Atualizações internas rápidas |Toda a equipe |Contínua (WhatsApp) |Notificações,  lembretes, decisões rápidas |

5. **Gerenciamento<a name="_page9_x69.00_y524.80"></a> de Riscos** 

O  gerenciamento  de  riscos  do  projeto  UnBemestar  tem  como  objetivo  identificar antecipadamente situações que possam comprometer o andamento do desenvolvimento, a qualidade das entregas ou a experiência dos usuários finais — pacientes e profissionais da clínica.  A  equipe  adotou  uma  abordagem  preventiva,  mapeando  os  principais  riscos  e definindo estratégias de mitigação (para evitar que ocorram) e de contingência (para o caso de se concretizarem). A lista de riscos será revisada a cada sprint, sendo atualizada conforme novos riscos forem identificados ou o contexto do projeto evoluir. 

6. **Critérios<a name="_page9_x69.00_y674.80"></a> de Replanejamento** 

O replanejamento no projeto UnBemestar será realizado sempre que houver fatores que comprometam o andamento da sprint, a qualidade das entregas ou a aderência aos objetivos definidos no backlog. A equipe utilizará como base o acompanhamento semanal, as revisões de sprint e a análise contínua dos riscos mapeados na seção 2.5 para identificar a necessidade de ajustes. 

A seguir, são definidos os principais critérios que podem justificar um replanejamento: 

- Desistência, afastamento ou baixo engajamento de membros da equipe, impactando diretamente a capacidade de execução das tarefas planejadas para a sprint. 
- Atrasos críticos na entrega de funcionalidades prioritárias, especialmente aquelas das quais  outras  partes  do  sistema  dependem,  como  autenticação,  calendário  de agendamento e integração com o Supabase. 
- Mudanças  significativas  no  escopo  propostas  pelo  Product  Owner  que  afetem entregas em andamento ou já definidas para a sprint atual. 
- Problemas técnicos ou de integração entre Next.js e Supabase que impeçam o avanço do desenvolvimento conforme previsto na arquitetura do sistema. 
- Validações negativas durante testes, indicando que funcionalidades entregues não atendem aos critérios de aceite definidos junto ao Product Owner. 
- Resultado insatisfatório nas inspeções de código realizadas pelo monitor, exigindo refatoração significativa que comprometa o cronograma das sprints seguintes. 

Nesses casos, o Scrum Master convocará uma reunião extraordinária com o Product Owner e os membros técnicos envolvidos para reavaliar o backlog, reorganizar as sprints e documentar  as  decisões  tomadas.  O  objetivo  do  replanejamento  é  manter  o  foco  nas entregas de valor ao cliente, garantindo flexibilidade sem comprometer a organização e a previsibilidade do projeto. 

<a name="_page10_x69.00_y461.80"></a>**2.6.1  Avaliando grau de riscos** 

O grau de risco atribuído — baixo, médio ou alto — é definido por análise qualitativa, considerando a combinação entre a probabilidade de ocorrência e o impacto potencial caso 

- risco se concretize. A avaliação é realizada por consenso entre os membros da equipe ao início  de  cada  sprint,  levando  em  conta  o  histórico  de  entregas,  a  complexidade  das funcionalidades planejadas e a disponibilidade dos integrantes. 

  Embora não envolva valores numéricos, essa abordagem permite priorizar os riscos com maior potencial de comprometer o andamento ou a qualidade das entregas. Riscos classificados  como  de  “alto  grau”  exigem  medidas  preventivas  imediatas  ou  planos  de contingência  bem  definidos;  já  os  riscos  de  “médio  grau”  devem  ser  monitorados  com atenção, enquanto os de “baixo grau” são acompanhados de forma secundária. 

A seguir apresenta-se a tabela com os riscos identificados e as estratégias associadas: 



|**Risco ![](Aspose.Words.8a9697ee-6302-43a6-bea8-de70c6565082.005.png)**|**Grau ![](Aspose.Words.8a9697ee-6302-43a6-bea8-de70c6565082.006.png)**|**Mitigação  (Plano A)** |**Contingência (Plano B)** |
| - | - | :- | :- |



|Desistência  ou afastamento  de membro da equipe |Alto |Distribuição equilibrada  de responsabilidades desde  o  início; nenhum  módulo crítico  com responsável único |Redistribuir  tarefas entre  os  membros ativos;  acionar  o Scrum  Master  para replanejamento imediato da sprint |
| - | - | :- | :- |
|Atraso na entrega do documento  de  visão comprometendo  o kick off |Alto |Divisão clara das seções entre os responsáveis desde a Sprint 1; revisões incrementais antes do prazo |Priorizar  as  seções obrigatórias  para entrega  mínima  no prazo  e complementar  na Sprint 2 |
|Falta de comunicação entre front-end, back- end e DevOp |Médio |Daily  assíncrona via  canal  do grupo;  reunião semanal  com  ata registrada;  Scrum Master  como facilitador |Intervenção direta do Scrum Master para realinhar as equipes e revisar o plano da sprint em andamento |
|Atraso na entrega do back-end |Alto |Divisão  clara  por partes, versionamento incremental |Reduzir  escopo  ou mover funcionalidades para sprint futura |
|Alteração  tardia  de requisitos  pelo Product Owner |Alto |Backlog  refinado e priorizado antes de  cada  sprint com validação da PO;  mudanças somente  entre sprints |Repriorizar  o backlog  junto  à  PO, negociando  o  que entra e sai do escopo da sprint corrente |

Planejado por: Vitor Araújo (2026) 

<a name="_page11_x69.00_y622.80"></a>**3  Processo de Desenvolvimento de Software** 

O processo de desenvolvimento do projeto Hopper será guiado por uma abordagem ágil, fundamentada nos princípios do Scrum e nas práticas do Extreme Programming (XP). A equipe adota a metodologia **ScrumXP**, combinação das práticas de gerenciamento do Scrum com as práticas técnicas do XP. Essa escolha se justifica pelo contexto do projeto: equipe pequena, escopo dinâmico, prazo semestral definido e necessidade de entregas incrementais de valor a cada ciclo. Conforme descrito na seção 2.1, o ciclo de vida adotado é iterativo e incremental, com sprints semanais que produzem incrementos funcionais validados pelo Product Owner ao final de cada iteração. 

1. **Scrum<a name="_page12_x101.00_y113.80"></a> Adaptado** 

O framework Scrum foi escolhido como base para a organização das atividades, com ajustes fundamentados nas diretrizes do Scrum Guide (Schwaber e Sutherland, 2020), que reconhecem que as regras do framework devem ser aplicadas considerando o contexto da equipe e do produto. Conforme Pressman (2016), equipes acadêmicas de pequeno porte se beneficiam  de  adaptações  que  preservam  os  valores  ágeis:  transparência,  inspeção  e adaptação, sem impor cerimônias desnecessárias. Os papéis clássicos estão representados, Scrum  Master  (Vitor  Araújo),  Product  Owner  (Flávia  Rebelato)  e  desenvolvedores,  mas exercidos  de  forma  colaborativa,  permitindo  que  membros  técnicos  contribuam  com documentação  e  organização  do  projeto,  e  que  o  Scrum  Master  atue  diretamente  no desenvolvimento quando necessário. 

O processo se organiza em três macrofases encadeadas:  **pré-sprint**, **sprint** e **pós- sprint**. 

Na fase de **pré-sprint**, a equipe realiza o planejamento da iteração a partir do Product Backlog priorizado pela PO. As histórias de usuário são selecionadas, estimadas e distribuídas entre os membros conforme os papéis definidos na seção 2.2. O Scrum Master conduz a cerimônia de Sprint Planning, garantindo que o objetivo da sprint esteja claro para todos antes do início do desenvolvimento. O acompanhamento do progresso é feito via Jira, com o backlog organizado por sprints e histórias de usuário vinculadas aos requisitos definidos na seção 4.4 deste documento. 

Durante a **sprint**, o desenvolvimento segue as práticas do XP: o código é revisado em pares  (pair  programming),  integrado  continuamente  ao  repositório  central  via  GitHub  e refatorado sempre que necessário para manutenção da qualidade ao repositório central via GitHub e refatorado sempre que necessário para manutenção da qualidade. O Daily Scrum é realizado  de  forma  assíncrona  pelo  canal  da  equipe,  com  registro  das  atividades  em andamento, impedimentos e próximos passos. O repositório segue política de branches por funcionalidade, com merge autorizado somente após revisão de código via pull request, garantindo que a branch principal esteja sempre em estado funcional e pronta para deploy na Vercel. 

Na  fase  de  **pós-sprint**,  a  equipe  realiza  a  Sprint  Review  com  demonstração  do incremento entregue para validação da PO, seguida da Retrospectiva para identificação de melhorias no processo. O backlog é atualizado, as métricas de velocidade são registradas e, caso necessário, o planejamento das sprints seguintes é reajustado conforme os critérios de replanejamento descritos na seção 2.6. 

2. **Práticas<a name="_page12_x69.00_y683.80"></a> de XP Incorporadas**

Foram incorporadas práticas do Extreme Programming (XP) para garantir qualidade técnica e eficiência no desenvolvimento: 

- **Desenvolvimento incremental:** cada funcionalidade será implementada em partes pequenas  e  entregues  gradualmente  ao  longo  das  sprints,  permitindo  validação contínua pelo Product Owner ao final de cada ciclo. 
- **Programação em pares:** tarefas de maior complexidade técnica, especialmente as relacionadas à integração entre Next.js e Supabase, serão desenvolvidas em dupla, promovendo revisão em tempo real e redução de erros. 
- **Refatoração contínua:** o código será melhorado conforme surgirem oportunidades de simplificação  ou  reorganização  interna,  sem  alterar  seu  comportamento  externo, visando legibilidade e manutenção. 
- **Integração contínua:** o repositório no GitHub será atualizado frequentemente, com merges realizados somente após revisão de código, garantindo que a branch principal esteja sempre em estado funcional. 
- **Feedback estruturado:** a cada entrega de funcionalidade, o time realiza validações internas  com  o  Product  Owner  e  o  responsável  por  qualidade,  considerando funcionamento correto conforme o requisito, facilidade de uso pelo usuário final e cumprimento dos critérios de aceite definidos no roteiro de testes. 
- **Participação  coletiva  na  documentação:**  os  membros  de  front-end,  back-end  e DevOps  colaboram  com  a  construção  e  atualização  dos  artefatos  do  projeto  — Documento  de  Visão,  backlog,  roteiro  de  testes  e  documento  de  arquitetura  — promovendo conhecimento compartilhado e reduzindo dependências individuais. 

As tecnologias que suportam o processo são: **Next.js** para o desenvolvimento front- end e das rotas de back-end, **Supabase** como plataforma de banco de dados, autenticação e armazenamento,  e  **Vercel**  para  o  deploy  contínuo  da  aplicação.  O  versionamento  é gerenciado via **GitHub**, com repositório único e histórico de commits rastreável por sprint. 

Essa estratégia permite entregas frequentes e adaptáveis, mantendo o foco na qualidade do código, na rastreabilidade dos requisitos e na aderência aos objetivos definidos pelo Product Owner ao longo do semestre. 

<a name="_page13_x69.00_y530.80"></a>**4  Declaração de Escopo do Projeto** 

Backlog do produto 

O  backlog  do  produto  é  uma  lista  de  requisitos  e  funcionalidades  que  serão trabalhados pelo time de desenvolvimento front-end e back-end, juntamente com o Product Owner  e  o  Scrum  Master.  Os  requisitos e funcionalidades  deverão, por  meio  de  sprints semanais, ser entregues e validados de forma incremental, sendo reordenados e atualizados conforme necessidade identificada ao longo do desenvolvimento. 

Tendo em vista que o projeto Hopper tem como contexto uma clínica de fisioterapia fictícia criada para fins acadêmicos, o Product Owner (Flávia Rebelato) e o Scrum Master (Vitor Araújo) desempenham juntos o papel de representantes do cliente, gerenciando o backlog  com  base  nas  necessidades  reais  do  domínio  de  saúde  e  agendamento  clínico, referenciadas na literatura especializada e nas boas práticas de sistemas de gestão para clínicas de fisioterapia disponíveis nas referências bibliográficas deste documento. 

Os  requisitos  encontram-se  listados  na  tabela  de  backlog  do  produto,  subitem  4.4, organizados de acordo com sua ordem de importância, tipo, priorização (Must, Should ou Could),  descrição  resumida  e  as  histórias  de  usuário  que  servirão  de  base  para  o desenvolvimento das funcionalidades ao longo das sprints. 



|ID |Descrição |Perfil |Prioridade |
| - | - | - | - |
|RF01 |O sistema deve permitir o cadastro de novos  pacientes  com  os  seguintes campos  obrigatórios:  nome  completo, CPF, e-mail, telefone celular e data de nascimento;  e  os  seguintes  campos opcionais:  endereço  completo  e convênio de saúde. |P01 |Must |
|RF02 |O sistema deve autenticar usuários por e-mail e senha, com sessão segura. |P01, P02, P03 |Must |
|RF03 |O  sistema  deve  exibir  calendário interativo  com  dias  e  horários disponíveis por serviço e profissional. |P01 |Must |
|RF04 |O  sistema  deve  permitir  agendamento de consultas presenciais e domiciliares em fluxo de até 5 etapas |P01 |Must |
|RF05 |O  sistema  deve  diferenciar  o  fluxo  de agendamento  para  primeira  consulta, coletando dados adicionais do paciente. |P01 |Must |
|RF06 |O sistema deve permitir cancelamento ou  remarcação  de  consultas  com antecedência mínima de 24 horas. |P01 |Must |
|RF07 |O  sistema  deve  enviar  lembrete automático  por  e-mail  ao  paciente  24 horas  antes  da  consulta.  Caso  o agendamento seja realizado com menos de 24 horas de antecedência, o lembrete deve ser enviado imediatamente após a confirmação do agendamento. |P01 |Must |
|RF09 |O  sistema  deve  exibir  o  histórico  de consultas realizadas e futuras na área do paciente. |P01 |Must |
|RF10 |O  sistema  deve  permitir  que  o fisioterapeuta  indique,  ao  final  do atendimento,  se  o  paciente  possui indicação de retorno (sim/não) e registre a  data  sugerida  para  o  próximo agendamento. |P02 |Should |
|RF11 |O  sistema  deve  exibir  os  serviços prestados  com  nome,  descrição  e indicações. |P01 |Must |



|RF12 |O sistema deve exibir o corpo clínico com foto, CREFITO e especialidades de cada profissional. |P01 |Should |
| - | - | - | - |
|RF13 |O  sistema  deve  permitir  que  a secretária/admin  cadastre,  edite  e remova  horários  de  atendimento  dos profissionais, definindo dias da semana, horários  de  início  e  fim,  e  intervalos entre consultas. |P03 |Must |
|RF14 |O sistema deve permitir que o paciente indique preferência por profissional ou opte por atribuição automática |P01 |Should |
|RF15 |O sistema deve exibir aviso informativo sobre  exigência  de  encaminhamento para pacientes com convênio. |P01 |Should |
|RF16 |<p>O  sistema  deve  reservar temporariamente o horário selecionado pelo paciente por até 5 minutos durante </p><p>o  fluxo  de  agendamento,  tornando-o indisponível para outros usuários. Caso o agendamento não seja concluído nesse período,  o  horário  deve  ser  liberado automaticamente. </p>|P01 |Must |
|RF17 |O sistema deve exibir FAQ com dúvidas frequentes  sobre  agendamento, convênios e atendimento domiciliar. |P01 |Could |

Fonte: Vitor Araújo (2026) 

1. **Perfis<a name="_page15_x69.00_y486.80"></a>** 

Os  perfis  de  acesso  do  Hopper  foram  definidos  a  partir  de  alinhamento  entre  os membros do grupo, tendo como principal objetivo estabelecer as características de acesso dentro do sistema, limitando e assegurando o que cada perfil pode realizar. O sistema conta com quatro perfis principais, cada um com funções e responsabilidades bem definidas, com 

- objetivo  de  garantir  um  funcionamento  eficiente  e  seguro  no  gerenciamento  dos agendamentos da clínica. 

  O **Paciente** é o usuário central do sistema, com acesso a ferramentas que permitem marcar, cancelar e remarcar consultas de forma autônoma, além de consultar seu histórico clínico, visualizar os serviços ofertados e acessar informações dos profissionais disponíveis. A **Secretária** atua como facilitadora da operação da clínica, sendo responsável por gerenciar os retornos  de  pacientes  já  cadastrados  e  acompanhar  a  lista  de  atendimentos  do  dia.  O **Médico/Fisioterapeuta** tem acesso ao seu perfil profissional e à sua agenda de pacientes, podendo  registrar  evoluções  clínicas  e  remarcar  atendimentos  quando  necessário.  O **Administrador**  garante  o  funcionamento  contínuo  da  plataforma,  gerenciando  usuários, configurações do sistema e monitorando o uso geral da aplicação. 

  Essa estrutura permite que cada usuário interaja com o sistema de forma intuitiva e produtiva, promovendo a gestão eficiente dos agendamentos e a segurança no acesso às informações clínicas. A seguir, os perfis são detalhados em suas características e permissões: 

Tabela: Perfis de acesso 



|Nome do perfil |Características do perfil |Permissões de acesso |
| - | - | - |
|Administrador |Responsável por manter os perfis de  acesso  da  aplicação,  criar novos usuários, alterar usuários já existentes,  ou  excluir  usuários (Manter usuários) |Gerenciar  usuários, ajustar  configurações, monitorar  o  uso,  editar informações  não essenciais  para  o funcionamento  do sistema |
|Pacientes |Paciente com alguma necessidade de fisioterapia, que queira marcar uma consulta no próximo horário disponível  para  a  sua necessidade. |Marcar  uma  nova consulta,  consultar  suas informações, editar suas informações,  cancelar uma  consulta,  remarcar uma  consulta,  visualizar histórico  de agendamentos,  ver  lista de  profissionais  e  suas informações, ver serviços ofertados pela clínica |
|Secretária |Responsável por deixar o retorno de pacientes anteriores marcado via sistema |<p>Marcar,  excluir  e remarcar  consultas, consultar  a  lista  de pacientes marcados para </p><p>o dia atual </p>|
|Médico/Fisioterapeuta |Informação  de  especialidade, uma  breve  biografia,  foto  do perfil,  |Editar suas informações, consultar  agenda  de atendimentos  da semana, visualizar dados de contato dos pacientes agendados,  remarcar consulta |

Fonte: Vitor Araújo (2026) 

2. **Cenários<a name="_page16_x69.00_y739.80"></a>** 

Os cenários funcionais definidos para o Hopper cobrem desde a configuração inicial do sistema até as operações do dia a dia da clínica de fisioterapia. Tudo começa com a definição do produto, incluindo o backlog priorizado, a identidade visual da plataforma e o documento de visão geral do projeto. A partir daí, o MVP é planejado e distribuído em sprints semanais para entrega contínua de valor ao cliente. 

Quando  os  usuários  interagem  com  o  sistema,  encontram  funcionalidades  como cadastro, autenticação e uma interface limpa e acessível, projetada para atender pacientes de diferentes faixas etárias e níveis de familiaridade com tecnologia. Operacionalmente, o Hopper  permite  o  agendamento  autônomo  de  consultas  presenciais  e  domiciliares,  o gerenciamento  da  agenda  pelos  profissionais  e  pela  secretária,  o  registro  de  evoluções clínicas e o acompanhamento do histórico de atendimentos pelo próprio paciente. 

Funcionalidades complementares, como o envio automático de lembretes, a exibição do corpo clínico com informações dos profissionais e uma seção de perguntas frequentes, promovem  autonomia,  transparência  e  confiança  no  uso  da  plataforma.  Requisitos  não funcionais  como  conformidade  com  a  LGPD,  autenticação  segura  com  hash  de  senha  e interface responsiva garantem que o sistema seja seguro, confiável e acessível em qualquer dispositivo. A seguir, a tabela resume os principais cenários funcionais mapeados: 

Tabela: Cenários funcionais 



||Sistema: UnBemestar – Cenários funcionais |||
| :- | - | :- | :- |
|Numeração cenário |do |Nome do cenário |Sprints |
|1 ||Autenticação e Cadastro |Gestão  de  acesso  para  pacientes, fisioterapeutas  e  secretária, incluindo  o  formulário  de  novos pacientes. |
|2 ||Fluxo de Agendamento |Visualização  de  calendário,  escolha de tipo de atendimento, profissional e reserva temporária de 5 minutos. |
|3 ||Comunicação e Alertas |Sistema automatizado de envio de e- mails  para  confirmação  imediata  e lembretes de 24 horas. |
|4 ||Gestão de Consultas |Controle de cancelamentos (mínimo 24h),  remarcações  e  prevenção  de choque de horários. |
|5 ||Indicação de Retorno |O  sistema  deve  permitir  que  o fisioterapeuta  indique,  ao  final  do atendimento,  se  o  paciente  possui indicação  de  retorno  (sim/não)  e registre  a  data  sugerida  para  o próximo agendamento. |



|6 |Administração e Suporte |Painel  da  secretária  para  gerir intervalos/folgas  e  seção  de Perguntas Frequentes (FAQ). |
| - | - | - |

3. **Tabela<a name="_page18_x69.00_y157.80"></a> de Backlog do produto** 

Tabela: Backlog do produto 



|**ID** |**Sprint** |**Nome do Requisito** |**Tipo de requisito (Funcional/não funcional)** |**Priorização do produto  Must, Should, Could** |**Descrição Suscinta do requisito** |**User Stories Associadas** |
| - | - | - | :- | :- | :- | :- |
|**Sprint 2 – Requisitos Não Funcionais (Arquitetura e Ambiente)** |||||||
||||||||
|**RNF01** |Sprint 2 |**Segurança de Dados** |Não Funcional |**Must** |O sistema deve garantir a segurança e conformidade dos dados clínicos, com autenticação segura e controle de acesso por perfil. |– |
|**RNF02** |Sprint 2 |**Usabilidade** |Não Funcional |**Must** |A interface deve ser limpa, objetiva e com esquema de cores acessíveis para todas as idades. |– |
|**RNF03** |Sprint 2 |**Disponibilidade** |Não Funcional |**Should** |O sistema deve estar disponível para acesso via navegador web nos principais browsers (Chrome, Firefox, Edge, Safari). |– |
|**RNF04** |Sprint 2 |**Desempenho** |Não Funcional |**Should** |O tempo de resposta das principais operações (agendamento, calendário) deve ser inferior a 3 segundos. |– |
|**RNF05** |Sprint 2 |**Deploy Contínuo (CI/CD)** |Não Funcional |**Must** |O sistema deve ser integrado a pipeline de deploy contínuo via Vercel e GitHub Actions para entrega incremental. |– |
|**Sprint 3 – Cadastro, Autenticação e Calendário (RF01–RF03)** |||||||



|**RF01** |Sprint 3 |**Cadastro de Paciente** |Funcional |**Must** |Sistema deve permitir o cadastro de novos pacientes com campos obrigatórios (nome, CPF, e- mail, telefone, data de nascimento) e opcionais (endereço, convênio). |US01 – Como paciente, quero me cadastrar no sistema para poder agendar consultas. ||
| - | - | :- | - | - | :- | :- | :- |
|**RF02** |Sprint 3 |**Autenticação de Usuários** |Funcional |**Must** |O sistema deve autenticar usuários (paciente, secretária, médico, admin) por e-mail e senha, com sessão segura. |US02 – Como usuário, quero fazer login com e- mail e senha para acessar minhas funcionalidades. ||
|**RF03** |Sprint 3 |**Calendário Interativo** |Funcional |**Must** |O sistema deve exibir calendário interativo com dias e horários disponíveis por serviço e profissional. |US03 – Como paciente, quero visualizar os horários disponíveis por serviço e profissional para escolher o melhor horário. ||
|**Sprint 4 – Agendamento, Lembretes e Cancelamento (RF04–RF07)** ||||||||
|**RF04** |Sprint 4 |**Agendamento de Consultas** |Funcional |**Must** |O sistema deve permitir agendamento de consultas presenciais e domiciliares em fluxo de até 5 etapas. |US04 – Como paciente, quero agendar uma consulta presencial ou domiciliar em um fluxo simples de até 5 etapas. ||
|**RF05** |Sprint 4 |**Fluxo de Primeira Consulta** |Funcional |**Must** |<p>O sistema deve diferenciar </p><p>o fluxo de agendamento para primeira consulta, coletando dados adicionais do paciente. </p>|US05 – Como paciente novo, quero que o sistema colete informações adicionais na minha primeira consulta. ||
|**RF06** |Sprint 4 |**Cancelamento e Remarcação** |Funcional |**Must** |O sistema deve permitir cancelamento ou remarcação de consultas com antecedência mínima de 24 horas. |US06 – Como paciente, quero cancelar ou remarcar minha consulta com pelo menos 24h de antecedência. ||
|**RF07** |Sprint 4 |**Lembrete Automático por E-mail** |Funcional |**Must** |O sistema deve enviar lembrete automático por e-mail ao paciente 24h antes da consulta. Se o agendamento for feito com menos de 24h de |US07 – Como paciente, quero receber lembretes automáticos por e-mail para não ||



||||||antecedência, o lembrete é enviado imediatamente. |esquecer minhas consultas. |
| :- | :- | :- | :- | :- | :- | :- |
|**Sprint 5 – Upload, Histórico, Evolução, Admin e demais (RF09–RF17)** |||||||
||||||||
|**RF09** |Sprint 5 |**Histórico de Consultas** |Funcional |**Must** |O sistema deve exibir o histórico de consultas realizadas e futuras na área do paciente. |US09 – Como paciente, quero visualizar meu histórico de consultas passadas e futuras. |
|**RF10** |Sprint 5 |**Relatório de Evolução** |Funcional |**Should** |O sistema deve permitir que o fisioterapeuta registre, após cada sessão, um relatório de evolução com data, procedimento, observações clínicas e indicação de retorno. |US10 – Como fisioterapeuta, quero indicar a necessidade de retorno do paciente e sugerir a data do próximo agendamento diretamente pelo sistema.|
|**RF11** |Sprint 5 |**Exibição de Serviços** |Funcional |**Must** |O sistema deve exibir os serviços prestados com nome, descrição e indicações. |US11 – Como paciente, quero visualizar os serviços disponíveis na clínica para escolher o mais adequado. |
|**RF12** |Sprint 5 |**Exibição do Corpo Clínico** |Funcional |**Should** |O sistema deve exibir o corpo clínico com foto, CREFITO e especialidades de cada profissional. |US12 – Como paciente, quero conhecer os profissionais da clínica para escolher com quem me consultar. |
|**RF13** |Sprint 5 |**Gestão de Horários (Admin)** |Funcional |**Must** |O sistema deve permitir que a secretária/admin cadastre, edite e remova horários de atendimento dos profissionais, definindo dias, horários de início/fim e intervalos entre consultas. |US13 – Como secretária, quero gerenciar os horários dos profissionais para manter a agenda organizada. |
|**RF14** |Sprint 5 |**Preferência de Profissional** |Funcional |**Should** |O sistema deve permitir que o paciente indique preferência por profissional ou opte por atribuição automática. |US14 – Como paciente, quero escolher meu fisioterapeuta preferido ou deixar o sistema escolher automaticamente. |



|**RF15** |Sprint 5 |**Aviso de Encaminhamento (Convênio)** |Funcional |**Should** |O sistema deve exibir aviso informativo sobre exigência de encaminhamento para pacientes com convênio. |US15 – Como paciente com convênio, quero ser informado sobre a necessidade de encaminhamento antes de agendar. |
| - | - | :- | - | - | :- | :- |
|**RF16** |Sprint 5 |**Reserva Temporária de Horário** |Funcional |**Must** |O sistema deve reservar temporariamente o horário selecionado por até 5 minutos durante o fluxo de agendamento. Caso não seja concluído nesse período, o horário é liberado automaticamente. |US16 – Como paciente, quero que o horário escolhido seja reservado temporariamente enquanto concluo meu agendamento. |
|**RF17** |Sprint 5 |**FAQ de Dúvidas Frequentes** |Funcional |**Could** |O sistema deve exibir FAQ com dúvidas frequentes sobre agendamento, convênios e atendimento domiciliar. |US17 – Como paciente, quero acessar respostas para dúvidas frequentes sobre os serviços da clínica. |

Elaborado por: Flávia Rebelato (2026)

**5  <a name="_page21_x94.00_y405.80"></a>Métricas e Medições** 

As  métricas  e  medições  do  projeto  UnBemEstar  seguirão  o  método  GQM  (Goal- Question-Metric). Essa abordagem torna a visualização dos objetivos e o atingimento das métricas  explícitos  e  rastreáveis,  alinhando-se  à  natureza  ágil  e  orientada  a  dados  do desenvolvimento. 

1. **Objetivo<a name="_page21_x69.00_y502.80"></a> (Goal)** 

Identificar proativamente situações que indicam a necessidade de replanejamento durante  o  desenvolvimento  do  UnBemEstar,  garantindo  a  entrega  contínua  de  valor  e  o cumprimento dos prazos estabelecidos para cada sprint. 

2. **Perguntas<a name="_page21_x69.00_y585.80"></a> (Questions)** 

As  seguintes  perguntas  orientarão  a  definição  e  coleta  das  métricas,  respondendo  às necessidades de governança do projeto: 

- **Q1:** A participação e o engajamento de cada membro na sprint são balanceados e adequados às responsabilidades? 
- **Q2:** A qualidade das entregas, especialmente no que tange a testes e conformidade com os requisitos, está dentro do esperado? 
- **Q3:** A distribuição do trabalho de desenvolvimento (código e documentação) entre a equipe está equilibrada? 
- **Q4:** O que está sendo entregue corresponde ao que foi planejado no backlog da sprint? 
3. **Métricas<a name="_page22_x69.00_y136.80"></a> (Metrics)** 

A  equipe  adotará  critérios  quantitativos  e  qualitativos,  avaliados  na  reunião  de retrospectiva, para identificar desvios que exijam replanejamento, conforme os critérios da seção 2.6. 

- **M1 - Métricas de participação da equipe (Q1)** 
  - **Taxa de presença em reuniões:** Percentual de presença de cada membro nas cerimônias  do  Scrum  (Planejamento,  Review,  Retrospectiva)  e  reuniões semanais. 
  - **Cumprimento de tarefas:** Razão entre tarefas concluídas e tarefas atribuídas a cada membro na sprint. 
- **M2 - Métricas de qualidade das entregas (Q2)** 
  - **Taxa de aceitação dos testes:** Percentual de testes (unitários e de integração) que foram executados com sucesso *versus* o total planejado para a sprint. 
  - **Débito técnico por funcionalidade:** Número de pendências ou "retrabalhos" identificados nas inspeções de código e validações com o Product Owner. 
- **M3 - Métricas de distribuição de trabalho (Q3)** 
  - **Distribuição de commits por membro:** Quantidade média de commits por membno no repositório do GitHub, por sprint. 
  - **Distribuição por tipo de atividade:** Proporção de tarefas de front-end, back- end, DevOps e documentação concluídas por cada membro, visando evitar especialização excessiva. 
- **M4 - Métricas de alinhamento entre planejamento e entrega (Q4)** 
- **Velocidade da equipe (Burnup/Burndown):** Acompanhamento do progresso real em relação ao planejado, usando gráficos de burndown de tarefas no Jira. 
- **Número de histórias não concluídas:** Quantidade de itens do backlog que foram planejados para a sprint, mas não foram finalizados. 
4. **Coleta<a name="_page22_x69.00_y580.80"></a> de Dados e Ações de Replanejamento** 

A coleta de dados será de responsabilidade do **Scrum Master (Vitor Araújo)**, com apoio dos líderes técnicos, ao final de cada sprint. As fontes incluirão: 

- **Versionamento (GitHub):** Para métricas de commits e alterações. 
- **Jira:** Para rastreamento de tarefas, velocidade da equipe e cumprimento de prazos. 
- **Relatórios de Teste (Vitest/Supertest):** Para a taxa de aceitação e cobertura de testes. 
- **Atas de Reunião:** Para a taxa de presença e decisões tomadas. 

A ocorrência de desvios em uma ou mais métricas acionará automaticamente um plano de contingência, que pode incluir: 

- **Reestruturação de tarefas** na sprint corrente. 
- **Ajustes no escopo** da sprint seguinte, priorizando débitos técnicos. 
- **Redistribuição de responsabilidades** entre os membros da equipe. 
- **Convocação de uma reunião extraordinária** para replanejamento, conforme seção 2.6. 

<a name="_page23_x69.00_y197.80"></a>**6  Testes de Software** 

O plano de testes do projeto UnBemEstar é fundamental para garantir a confiabilidade, segurança e a excepcional experiência de usuário prometida. Uma falha no agendamento ou no sistema de notificações, por exemplo, impacta diretamente a lucratividade da clínica e a confiança do paciente. 

1. **Estratégia<a name="_page23_x69.00_y294.80"></a> de Testes** 

A estratégia adotada é baseada em validação funcional progressiva por critérios de aceite, cobrindo os fluxos críticos: cadastro, autenticação, agendamento e cancelamento. 

- **Automação Prioritária:** Testes críticos (agendamento, cancelamento, notificações) serão automatizados. 
- **Ambiente Isolado:** Testes executarão em um banco de dados Supabase de homologação, separado do de produção. 
- **Dados Controlados:** Uso de factories ou seeds para criar pacientes, horários e profissionais fictícios. 
- **Cobertura Mínima:** Buscar atingir 80% de cobertura de código nas lógicas de negócio core (backend e regras de front-end). 
- **Feedback Rápido:** Testes serão executados a cada Pull Request no GitHub, impedindo merges que quebrem a build. 
2. **Níveis<a name="_page23_x101.00_y536.80"></a> e Tipos de Teste** 

|Nível |Descrição |Ferramenta |Exemplo no UnBemEstar |
| - | - | - | - |
|**Unitário** |Validam funções e métodos isolados (ex: validação de CPF, cálculo de horários, formatação de datas). |Vitest |Verificar se a regra de "cancelamento com 24h de antecedência" retorna true ou false corretamente. |



|**Integração** |Validam a interação entre módulos, como API Routes do Next.js, chamadas ao Supabase e regras de negócio. |Supertest + Vitest |Testar se a rota de agendamento (/api/appointments) valida corretamente um horário já ocupado antes de salvar. |
| - | :-: | :-: | :-: |
|**Sistema (E2E)** |Simulam o fluxo completo do usuário no navegador, validando front-end e back-end integrados. |Playwright ou Cypress (a definir) |Um "paciente" faz login, agenda uma consulta domiciliar, recebe o e- mail e a "secretária" vê o evento na agenda. |
|**Segurança** |Validam controle de acesso e proteção de dados sensíveis (LGPD). |Manuais + Supertest |Garantir que um paciente não consiga acessar o histórico de outro paciente via URL. |

Elaborado por: Brenda Maria (2026)

3. **Roteiro<a name="_page24_x69.00_y498.80"></a> de Testes (Exemplo para a Sprint 3)** 

A tabela abaixo apresenta os primeiros testes planejados, alinhados aos requisitos funcionais (RF) que serão entregues nas primeiras sprints. 

**Tabela 1 - Roteiro de Testes para Funcionalidades Core** 



|Código |Nome do Teste |Tipo |Nível |RF Associado |Pré- condição |
| - | :-: | - | - | :- | :- |



|**TU-01** |Validação de e-mail e CPF |Negativo |Unitário |RF01, RF02 |Nenhuma |
| - | - | - | - | - | - |
|**TU-02** |Cálculo de horário de lembrete |Funcional |Unitário |RF07 |Nenhuma |
|**TI-01** |Cadastro de paciente com dados válidos |Funcional |Integração |RF01 |Nenhuma |
|**TI-02** |Cadastro com e-mail duplicado |Negativo |Integração |RF01 |Um paciente já cadastrado |



|**TI-03** |Login com credenciais corretas |Funcional |Integração |RF02 |Um paciente cadastrado |
| - | :-: | - | - | - | :-: |
|**TI-04** |Reserva de horário por 5 minutos |Funcional |Integração |RF16 |Um horário disponível no calendário |
|**TA-01** |Fluxo de agendamento de primeira consulta |Funcional |Sistema (E2E) |RF04, RF05 |Paciente logado |
|**TA-02** |<p>Cancelamento com antecedência </p><p>< 24h </p>|Negativo |Sistema (E2E) |RF06 |Uma consulta agendada para o dia seguinte |

**Tabela 2 - Critérios de Aceitação dos Testes** 



|Código |Funcionalidade Associada |Critério de Aceitação (Condição de Sucesso) |
| - | :-: | :-: |
|**TU-01** |Validação de Cadastro |O sistema deve rejeitar CPF inválido e e- mail sem formato correto, exibindo mensagem de erro amigável. |
|**TU-02** |Lembrete Automático |A função que calcula a data/hora do envio deve retornar "24h antes" para agendamentos futuros, e "enviar agora" para agendamentos com menos de 24h. |
|**TI-01** |Cadastro de Paciente |O sistema deve retornar status 201 (Criado) e o novo paciente deve persistir no Supabase. |
|**TI-02** |Prevenção de Duplicidade |O sistema deve retornar status 409 (Conflito) com a mensagem "E-mail já cadastrado". |
|**TI-03** |Autenticação |O sistema deve retornar status 200 e um token de sessão (JWT ou similar) válido. |
|**TI-04** |Reserva de Horário |Após a requisição, o horário deve ficar como "reservado" no banco de dados por 5 minutos, indisponível para novas reservas. |
|**TA-01** |Agendamento Completo |Ao final do fluxo de 5 etapas, a consulta deve ser criada no banco, um e-mail de confirmação deve ser enviado (mockado no |



|||teste) e o horário deve sair do status "reservado" para "confirmado". |
| :- | :- | :-: |
|**TA-02** |Cancelamento Restrito |O sistema deve impedir o cancelamento, retornar um erro visível ao usuário e manter a consulta ativa no banco de dados. |

<a name="_page29_x69.00_y72.92"></a>**7  Referências Bibliográficas** 

BECK,  Kent.  Extreme  Programming  Explained:  Embrace  Change.  2.  ed.  Boston:  Addison- Wesley, 2004. 

BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD).  Brasília:  Presidência  da  República,  2018.  Disponível  em: https://www.planalto.gov.br/ccivil\_03/\_ato2015-2018/2018/lei/l13709.htm.  Acesso  em:  5 maio 2026. 

COHN, Mike. User Stories Applied: For Agile Software Development. Boston: Addison-Wesley, 2004. 

CONSELHO FEDERAL DE FISIOTERAPIA E TERAPIA OCUPACIONAL (COFFITO). Resolução nº 424, de 8 de julho de 2013. Estabelece o Código de Ética e Deontologia da Fisioterapia. Brasília: COFFITO, 2013. Disponível em: https://www.coffito.gov.br. Acesso em: 5 maio 2026. 

FOWLER, Martin. Refactoring: Improving the Design of Existing Code. 2. ed. Boston: Addison- Wesley, 2018. 

GRUMAN, Galen. A Guide to Agile Development. InfoWorld, São Francisco, 2009. Disponível em: https://www.infoworld.com. Acesso em: 5 maio 2026. 

KITCHENHAM, Barbara; PFLEEGER, Shari Lawrence. Principles of Survey Research: Part 1 — Turning Lemons into Lemonade. ACM SIGSOFT Software Engineering Notes, New York, v. 27, n. 5, p. 16-18, set. 2002. 

NIELSEN, Jakob; LORANGER, Hoa. Prioritizing Web Usability. Berkeley: New Riders, 2006. 

O'BRIEN, James A.; MARAKAS, George M. Administração de Sistemas de Informação. 15. ed. Porto Alegre: AMGH, 2013. 

PRESSMAN,  Roger  S.;  MAXIM,  Bruce  R.  Engenharia  de  Software:  Uma  Abordagem Profissional. 8. ed. Porto Alegre: AMGH, 2016. 

REZENDE, Denis Alcides. Planejamento de Sistemas de Informação e Informática. 4. ed. São Paulo: Atlas, 2011. 

SCHWABER, Ken; SUTHERLAND, Jeff. The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game. Scrum.org, 2020. Disponível em: https://scrumguides.org. Acesso em: 5 maio 2026. 

SOMMERVILLE, Ian. Engenharia de Software. 10. ed. São Paulo: Pearson, 2018. 

WAZLAWICK,  Raul  Sidnei.  Engenharia  de  Software:  Conceitos  e  Práticas.  Rio  de  Janeiro: Elsevier, 2013. 

SCHWABER, K.; SUTHERLAND, J. The Scrum Guide. 2020. Disponível em: scrumguides.org. PRESSMAN, R. S. Engenharia de Software: uma abordagem profissional. 8. ed. Porto Alegre: AMGH, 2016. 
31
