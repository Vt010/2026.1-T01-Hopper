import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/** rota que retorna os horarios disponiveis de um fisioterapeuta em uma data especifica */
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
    .select('hora, disponivel')
    .eq('fisioterapeuta_id', fisioterapeutaId)
    .eq('data', data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const resultado = (horarios ?? []).map((h: { hora: string; disponivel: boolean }) => ({
    hora: h.hora,
    disponivel: h.disponivel,
  }))

  return NextResponse.json(resultado)
}