// RF03 - Calendário Interativo (Buscar horários disponíveis)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const dateSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (YYYY-MM-DD)'),
  profissionalId: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = searchParams.get('data')
    const profissionalId = searchParams.get('profissionalId')
    
    // Validar parâmetros
    const validated = dateSchema.parse({ data, profissionalId })
    
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    // Buscar horários já ocupados na data
    let query = supabase
      .from('consultas')
      .select('horario_inicio')
      .eq('data', validated.data)
      .eq('status', 'confirmada')
    
    if (validated.profissionalId) {
      query = query.eq('profissional_id', validated.profissionalId)
    }
    
    const { data: ocupados, error } = await query
    
    if (error) {
      console.error('Erro ao buscar horários ocupados:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar horários' },
        { status: 500 }
      )
    }
    
    const horariosOcupados = ocupados?.map(o => o.horario_inicio) || []
    
    // Gerar horários disponíveis (8h às 18h, de 30 em 30 min)
    const todosHorarios = gerarHorarios()
    const horariosDisponiveis = todosHorarios.filter(
      horario => !horariosOcupados.includes(horario)
    )
    
    return NextResponse.json({
      success: true,
      data: validated.data,
      horariosDisponiveis,
      totalDisponiveis: horariosDisponiveis.length
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue: any) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message
      }))
      return NextResponse.json(
        { error: 'Parâmetros inválidos', details: formattedErrors },
        { status: 400 }
      )
    }
    
    console.error('Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

function gerarHorarios(): string[] {
  const horarios = []
  for (let hora = 8; hora <= 18; hora++) {
    horarios.push(`${hora.toString().padStart(2, '0')}:00`)
    if (hora < 18) {
      horarios.push(`${hora.toString().padStart(2, '0')}:30`)
    }
  }
  return horarios
}