import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Recebido:', body) // Para debug

    const nome = body?.nome || 'Usuário'
    const email = body?.email || 'usuario@teste.com'
    const senha = body?.senha || '12345678'

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

    // Tenta criar o usuário
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: { nome: nome },
      },
    })

    if (error) {
      console.log('Erro do Supabase:', error.message)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message: 'Usuário criado com sucesso!'
    }, { status: 201 })

  } catch (error: any) {
    console.log('Erro geral:', error.message)
    return NextResponse.json(
      { error: 'Erro interno: ' + error.message },
      { status: 500 }
    )
  }
}