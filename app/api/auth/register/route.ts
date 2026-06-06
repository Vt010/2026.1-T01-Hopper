import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/** schema de validação dos dados de cadastro */
const registerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  telefone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido'),
  dataNascimento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida')
    .nullable(),
  endereco: z.string().nullable().optional(),
  convenio: z.string().nullable().optional(),
})

/** rota para o cadastro de novos pacientes */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, cpf, email, senha, telefone, dataNascimento, endereco, convenio } =
      registerSchema.parse(body)

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

    const role = 'paciente'

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome, role },
      },
    })

    /** e-mail já cadastrado: erro explícito ou usuário sem novas identidades */
    const emailJaCadastrado =
      error?.code === 'user_already_exists' ||
      error?.message.toLowerCase().includes('already registered') ||
      (data.user?.identities?.length ?? 0) === 0

    if (emailJaCadastrado) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 })
    }

    if (error || !data.user) {
      return NextResponse.json(
        { error: 'Não foi possível concluir o cadastro' },
        { status: 400 }
      )
    }

    /** cria o perfil do usuário na tabela profiles */
    const { error: perfilError } = await supabase.from('profiles').insert({
      id: data.user.id,
      nome,
      cpf,
      telefone,
      data_nascimento: dataNascimento,
      endereco: endereco ?? null,
      convenio: convenio ?? null,
      role,
    })

    if (perfilError) {
      return NextResponse.json(
        { error: 'Usuário criado, mas houve falha ao criar o perfil' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          nome,
          role,
        },
        session: data.session,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
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
