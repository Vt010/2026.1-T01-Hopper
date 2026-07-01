-- ============================================================
-- 004_grants.sql
-- Concede permissões básicas de acesso às tabelas para os
-- roles do Supabase. Necessário pois o RLS (002_rls.sql) por
-- si só não libera acesso — o GRANT é uma camada separada e
-- obrigatória além das policies.
-- ============================================================

-- Leitura pública de horários disponíveis (pacientes não logados também podem ver)
GRANT SELECT ON horarios_disponiveis TO anon, authenticated;

-- Leitura de consultas e reservas temporárias pelo cliente administrativo
-- (service_role), usado em rotas de back-end que precisam verificar
-- disponibilidade de horários sem expor dados de outros pacientes via RLS.
GRANT SELECT ON consultas TO service_role;
GRANT SELECT ON reservas_temporarias TO service_role;

-- Leitura pública de serviços
GRANT SELECT ON servicos TO anon, authenticated;