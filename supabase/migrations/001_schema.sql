-- ============================================================
-- UnBemEstar — Migration 001: Schema completo
-- Rodar no Supabase: SQL Editor → colar e executar
-- ============================================================

-- ── 1. PROFILES (estende auth.users do Supabase) ────────────
create table if not exists public.profiles (
  id              uuid        references auth.users(id) on delete cascade primary key,
  nome            text        not null,
  cpf             text        unique,
  telefone        text,
  data_nascimento date,
  role            text        not null default 'paciente'
                              check (role in ('paciente', 'fisioterapeuta', 'secretaria', 'admin')),
  convenio        text,
  created_at      timestamptz default now()
);

-- Cria automaticamente um profile quando um usuário se cadastra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', new.email),
    'paciente'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. FISIOTERAPEUTAS ───────────────────────────────────────
create table if not exists public.fisioterapeutas (
  id             uuid    default gen_random_uuid() primary key,
  user_id        uuid    references public.profiles(id) on delete set null,
  nome           text    not null,
  crefito        text    unique not null,
  especialidades text[]  default '{}',
  foto_url       text,
  bio            text,
  created_at     timestamptz default now()
);

-- ── 3. SERVIÇOS ──────────────────────────────────────────────
create table if not exists public.servicos (
  id         uuid default gen_random_uuid() primary key,
  nome       text not null,
  descricao  text,
  indicacoes text,
  icone      text,
  created_at timestamptz default now()
);

-- ── 4. HORÁRIOS DISPONÍVEIS ──────────────────────────────────
create table if not exists public.horarios_disponiveis (
  id                 uuid    default gen_random_uuid() primary key,
  fisioterapeuta_id  uuid    references public.fisioterapeutas(id) on delete cascade,
  data               date    not null,
  hora               time    not null,
  disponivel         boolean default true,
  created_at         timestamptz default now(),
  unique (fisioterapeuta_id, data, hora)
);

-- ── 5. CONSULTAS ─────────────────────────────────────────────
create table if not exists public.consultas (
  id                 uuid    default gen_random_uuid() primary key,
  paciente_id        uuid    references public.profiles(id) on delete cascade,
  fisioterapeuta_id  uuid    references public.fisioterapeutas(id),
  servico_id         uuid    references public.servicos(id),
  data_hora          timestamptz not null,
  tipo               text    not null check (tipo in ('presencial', 'online')),
  status             text    not null default 'agendada'
                             check (status in ('agendada', 'cancelada', 'realizada', 'reservada')),
  primeira_consulta  boolean default false,
  created_at         timestamptz default now()
);

-- ── 6. RESERVAS TEMPORÁRIAS (RF16 — bloqueio de 5 min) ──────
create table if not exists public.reservas_temporarias (
  id                uuid    default gen_random_uuid() primary key,
  fisioterapeuta_id uuid    references public.fisioterapeutas(id),
  paciente_id       uuid    references public.profiles(id),
  data_hora         timestamptz not null,
  status            text    default 'ativa'
                            check (status in ('ativa', 'expirada', 'confirmada')),
  created_at        timestamptz default now()
);

