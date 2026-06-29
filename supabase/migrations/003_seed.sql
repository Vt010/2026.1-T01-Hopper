-- ============================================================
-- UnBemEstar — Migration 003: Dados de teste (seed)
-- Popula o banco para demonstração
-- ============================================================

-- ── 8 SERVIÇOS ───────────────────────────────────────────────
insert into public.servicos (nome, descricao, indicacoes, icone) values
  ('RPG',
   'Reeducação Postural Global — método que trabalha o corpo como um todo.',
   'Lordose, cifose, escoliose, dores crônicas na coluna.',
   '🧘'),
  ('Pilates Clínico',
   'Exercícios de fortalecimento e alongamento com foco terapêutico.',
   'Reabilitação pós-cirúrgica, dores musculares, gestantes.',
   '🤸'),
  ('Eletroterapia',
   'Uso de correntes elétricas para alívio de dor e reabilitação muscular.',
   'Lesões musculares, tendinites, dores articulares agudas.',
   '⚡'),
  ('Massoterapia',
   'Técnicas de massagem terapêutica para alívio de tensão e dor.',
   'Contraturas musculares, estresse, dores cervicais.',
   '💆'),
  ('Acupuntura',
   'Técnica milenar de inserção de agulhas em pontos específicos do corpo.',
   'Dores crônicas, enxaqueca, ansiedade, insônia.',
   '🪡'),
  ('Hidroterapia',
   'Fisioterapia realizada dentro da água com exercícios adaptados.',
   'Artrite, reabilitação ortopédica, fibromialgia.',
   '💧'),
  ('Terapia Manual',
   'Técnicas manuais de mobilização articular e tecidos moles.',
   'Dores articulares, limitações de movimento, pós-fratura.',
   '🙌'),
  ('Cinesioterapia',
   'Tratamento baseado em exercícios terapêuticos ativos e passivos.',
   'Reabilitação geral, fortalecimento muscular, prevenção de lesões.',
   '🏃')
on conflict do nothing;

-- ── 3 FISIOTERAPEUTAS ────────────────────────────────────────
-- (sem user_id pois são dados de demonstração — não têm login ainda)
insert into public.fisioterapeutas (id, nome, crefito, especialidades, bio) values
  ('11111111-1111-1111-1111-111111111111',
   'Dra. Ana Lima',
   'CREFITO-1/12345-F',
   array['RPG', 'Pilates Clínico', 'Terapia Manual'],
   'Especialista em reabilitação postural com 8 anos de experiência.'),
  ('22222222-2222-2222-2222-222222222222',
   'Dr. Carlos Mendes',
   'CREFITO-1/67890-F',
   array['Eletroterapia', 'Hidroterapia', 'Cinesioterapia'],
   'Fisioterapeuta esportivo com foco em reabilitação pós-cirúrgica.'),
  ('33333333-3333-3333-3333-333333333333',
   'Dra. Fernanda Costa',
   'CREFITO-1/11223-F',
   array['Acupuntura', 'Massoterapia', 'RPG'],
   'Especialista em dor crônica e técnicas integrativas de saúde.')
on conflict do nothing;

-- ── HORÁRIOS DOS PRÓXIMOS 14 DIAS ────────────────────────────
-- Gera horários para cada fisioterapeuta: seg a sex, 08h às 17h
do $$
declare
  fis_id uuid;
  fis_ids uuid[] := array[
    '11111111-1111-1111-1111-111111111111'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid
  ];
  dia date;
  hora_slot time;
  horarios time[] := array[
    '08:00'::time, '09:00'::time, '10:00'::time,
    '11:00'::time, '14:00'::time, '15:00'::time,
    '16:00'::time, '17:00'::time
  ];
begin
  foreach fis_id in array fis_ids loop
    for i in 0..13 loop
      dia := current_date + i;
      -- Pula sábado (6) e domingo (0)
      if extract(dow from dia) not in (0, 6) then
        foreach hora_slot in array horarios loop
          insert into public.horarios_disponiveis
            (fisioterapeuta_id, data, hora, disponivel)
          values
            (fis_id, dia, hora_slot, true)
          on conflict (fisioterapeuta_id, data, hora) do nothing;
        end loop;
      end if;
    end loop;
  end loop;
end $$;

