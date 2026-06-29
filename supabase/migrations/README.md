# Supabase Migrations — UnBemEstar

## Como rodar

1. Acesse [supabase.com](https://supabase.com) → entre no projeto
2. Menu lateral → **SQL Editor**
3. Rode os arquivos **em ordem**:

| Arquivo | O que faz |
|---|---|
| `001_schema.sql` | Cria todas as tabelas e o trigger de criação de perfil |
| `002_rls.sql` | Configura o RLS (cada usuário só vê os próprios dados) |
| `003_seed.sql` | Popula com 3 fisioterapeutas, 8 serviços e horários para 14 dias |

> ⚠️ Rodar fora de ordem vai dar erro de dependência.

## Estrutura das tabelas

```
profiles            → usuários cadastrados (pacientes, admins, secretárias)
fisioterapeutas     → profissionais da clínica
servicos            → tipos de tratamento oferecidos
horarios_disponiveis → grade de horários de cada fisioterapeuta
consultas           → agendamentos confirmados
reservas_temporarias → bloqueio de 5 min enquanto o paciente finaliza o agendamento (RF16)
```

## Usuário de teste

Após rodar as migrations, criar o usuário de teste no painel:
- **Authentication → Users → Add user → Create new user**
- Email: `admin@unbemestar.com`
- Senha: `Teste@2026`
