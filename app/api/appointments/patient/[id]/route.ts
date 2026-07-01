import { NextResponse } from 'next/server'
import { AppointmentRepository } from '@/lib/repositories/AppointmentRepository'
import { getAuthenticatedUser, getAuthenticatedClient } from '@/lib/services/AuthService'

interface RouteParams {
  params: Promise<{ id: string }>
}

/** rota que retorna o historico de consultas de um paciente especifico */
export async function GET(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { id } = await params

  /** garante que o paciente só acesse seu próprio histórico */
  if (user.id !== id) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }

  try {
    const supabaseClient = await getAuthenticatedClient()
    const repository = new AppointmentRepository(supabaseClient)

    const consultas = await repository.findAppointmentsByPatient(id)

    const vinteQuatroHoras = 24 * 60 * 60 * 1000

    const resultado = (consultas ?? []).map((c: { data_hora: string }) => ({
      ...c,
      pode_cancelar: new Date(c.data_hora).getTime() > Date.now() + vinteQuatroHoras,
    }))

    return NextResponse.json(resultado)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}