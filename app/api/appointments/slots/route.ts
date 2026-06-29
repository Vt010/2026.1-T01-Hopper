import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { supabaseAdmin } from '@/lib/supabaseAdminClient'
import { getAuthenticatedUser } from '@/lib/services/AuthService'

/** rota que retorna os horarios disponiveis de um fisioterapeuta em uma data especifica */
export async function GET(request: Request) {
  const user = await getAuthenticatedUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

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
    .select('hora, disponivel')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('data', data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  /** busca reservas temporárias ativas (criadas há menos de 5 minutos, status pendente) */
  const cincoMinutosAtras = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: reservasAtivas } = await supabaseAdmin
    .from('reservas_temporarias')
    .select('hora')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('data', data)
    .eq('status', 'pendente')
    .gte('created_at', cincoMinutosAtras)

  /** busca consultas já confirmadas no mesmo fisioterapeuta + data + hora */
   const { data: consultasConfirmadas } = await supabaseAdmin
    .from('consultas')
    .select('data_hora')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('status', 'agendada')



  const horasReservadas = new Set(reservasAtivas?.map((r: { hora: string }) => r.hora) ?? [])
  const horasConfirmadas = new Set(
    consultasConfirmadas
      ?.filter((c: { data_hora: string }) => c.data_hora.startsWith(data))
      .map((c: { data_hora: string }) => c.data_hora.split('T')[1]?.slice(0, 8)) ?? []
  )

  const resultado = (horarios ?? []).map((h: { hora: string; disponivel: boolean }) => ({
    hora: h.hora,
    disponivel: h.disponivel && !horasReservadas.has(h.hora) && !horasConfirmadas.has(h.hora),
  }))

  return NextResponse.json(resultado)
}