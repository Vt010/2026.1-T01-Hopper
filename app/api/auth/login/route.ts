import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/** schema de validação dos dados de login*/
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
})

/** rota para a autenticação de usuários*/
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, senha } = loginSchema.parse(body)

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: object) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: object) {
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

    /** busca perfil do usuário na tabela profiles */
    const { data: perfil } = await supabase
      .from('profiles')
      .select('role, nome')
      .eq('id', data.user.id)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        nome: perfil?.nome || data.user.user_metadata.nome,
        role: perfil?.role || data.user.user_metadata.role,
      },
      session: data.session
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
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