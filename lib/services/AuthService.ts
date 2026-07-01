import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/** cria o cliente Supabase autenticado a partir dos cookies da sessão */
async function createAuthenticatedClient() {
  const cookieStore = await cookies()

  return createServerClient(
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
}

/** extrai e valida o usuário autenticado a partir do jwt da sessão */
export async function getAuthenticatedUser() {
  const supabase = await createAuthenticatedClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return null
  }

  return data.user
}

/** retorna o cliente Supabase autenticado, respeitando RLS do usuário logado */
export async function getAuthenticatedClient() {
  return await createAuthenticatedClient()
}