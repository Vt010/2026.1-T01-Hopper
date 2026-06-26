-- ============================================================
-- UnBemEstar — Migration 002: RLS (Row Level Security)
-- Garante que cada usuário só vê os próprios dados
-- ============================================================

-- Ativa RLS em todas as tabelas
alter table public.profiles            enable row level security;
alter table public.fisioterapeutas     enable row level security;
alter table public.servicos            enable row level security;
alter table public.horarios_disponiveis enable row level security;
alter table public.consultas           enable row level security;
alter table public.reservas_temporarias enable row level security;

-- ── PROFILES ─────────────────────────────────────────────────
-- Usuário vê e edita só o próprio perfil
create policy "Usuário vê próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuário edita próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Admin vê todos os perfis
create policy "Admin vê todos os perfis"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── FISIOTERAPEUTAS ──────────────────────────────────────────
-- Qualquer usuário autenticado pode ver (para exibir na tela de agendamento)
create policy "Todos veem fisioterapeutas"
  on public.fisioterapeutas for select
  using (auth.role() = 'authenticated');

-- Só admin pode criar/editar
create policy "Admin gerencia fisioterapeutas"
  on public.fisioterapeutas for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── SERVIÇOS ─────────────────────────────────────────────────
-- Qualquer usuário autenticado pode ver
create policy "Todos veem serviços"
  on public.servicos for select
  using (auth.role() = 'authenticated');

-- Só admin pode criar/editar
create policy "Admin gerencia serviços"
  on public.servicos for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── HORÁRIOS DISPONÍVEIS ─────────────────────────────────────
-- Qualquer usuário autenticado pode ver (para escolher horário)
create policy "Todos veem horários"
  on public.horarios_disponiveis for select
  using (auth.role() = 'authenticated');

-- Admin e secretária podem gerenciar horários
create policy "Admin e secretária gerenciam horários"
  on public.horarios_disponiveis for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'secretaria')
    )
  );

-- ── CONSULTAS ────────────────────────────────────────────────
-- Paciente vê só as próprias consultas
create policy "Paciente vê próprias consultas"
  on public.consultas for select
  using (paciente_id = auth.uid());

-- Paciente pode criar consulta para si mesmo
create policy "Paciente cria consulta"
  on public.consultas for insert
  with check (paciente_id = auth.uid());

-- Paciente pode cancelar própria consulta
create policy "Paciente cancela própria consulta"
  on public.consultas for update
  using (paciente_id = auth.uid());

-- Fisioterapeuta vê consultas onde está envolvido
create policy "Fisioterapeuta vê próprias consultas"
  on public.consultas for select
  using (
    exists (
      select 1 from public.fisioterapeutas
      where id = consultas.fisioterapeuta_id
      and user_id = auth.uid()
    )
  );

-- Admin e secretária veem tudo
create policy "Admin vê todas as consultas"
  on public.consultas for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'secretaria')
    )
  );

-- ── RESERVAS TEMPORÁRIAS ─────────────────────────────────────
-- Paciente vê próprias reservas
create policy "Paciente vê próprias reservas"
  on public.reservas_temporarias for select
  using (paciente_id = auth.uid());

-- Paciente pode criar reserva
create policy "Paciente cria reserva"
  on public.reservas_temporarias for insert
  with check (paciente_id = auth.uid());

-- Paciente pode atualizar própria reserva
create policy "Paciente atualiza própria reserva"
  on public.reservas_temporarias for update
  using (paciente_id = auth.uid());

