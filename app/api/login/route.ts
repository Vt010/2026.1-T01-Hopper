// RF02 - Autenticação de Usuários
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, senha } = loginSchema.parse(body)
    
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
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    
    if (error) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos' },
        { status: 401 }
      )
    }
    
    // Buscar perfil do usuário
    const { data: perfil } = await supabase
      .from('pacientes')
      .select('perfil, nome')
      .eq('id', data.user.id)
      .single()
    
    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        nome: perfil?.nome || data.user.user_metadata.nome,
        perfil: perfil?.perfil || data.user.user_metadata.perfil,
      },
      session: data.session
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue: any) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message
      }))
      return NextResponse.json(
        { error: 'Dados inválidos', details: formattedErrors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}