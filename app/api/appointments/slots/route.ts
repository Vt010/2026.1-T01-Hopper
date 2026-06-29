import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/** rota que retorna os horarios disponiveis de um fisioterapeuta em uma data especifica  */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fisioterapeutaId = searchParams.get('fisioterapeuta_id')
  const data = searchParams.get('data')

  if (!fisioterapeutaId || !data) {
    return NextResponse.json(
      { erro: 'Fisioterapeuta_id e data são obrigatórios!' },
      { status: 400 }
    )
  }

  /** busca todos os horarios cadastrados do fisioterapeuta na data */
  const { data: horarios, error } = await supabase
    .from('horarios_disponiveis')
    .select('*')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('data', data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  /** busca reservas temporárias ativas (últimos 5 minutos, status pendente) */
  const cincoMinutosAtras = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: reservasAtivas } = await supabase
    .from('consultas')
    .select('data_hora')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('status', 'pendente')
    .gte('created_at', cincoMinutosAtras)

  /** busca consultas já confirmadas no mesmo dia */
  const { data: consultasConfirmadas } = await supabase
    .from('consultas')
    .select('data_hora')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('status', 'confirmada')

  const horariosOcupados = new Set([
    ...(reservasAtivas?.map((r: { data_hora: string }) => r.data_hora) ?? []),
    ...(consultasConfirmadas?.map((c: { data_hora: string }) => c.data_hora) ?? []),
  ])

  const resultado = (horarios ?? []).map((h: { hora_inicio: string }) => ({
    hora: h.hora_inicio,
    disponivel: !horariosOcupados.has(`${data}T${h.hora_inicio}`),
  }))

  return NextResponse.json(resultado)
}