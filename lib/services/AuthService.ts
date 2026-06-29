import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/** extrai e valida o usuário autenticaado a partir do jwt da sessão */
export async function getAuthenticatedUser(){
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                
                get(name: string){
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: object){
                    cookieStore.set({name, value, ...options})
                },

                remove(name: string, options: object){
                    cookieStore.set({name, value: '', ...options})
                }
                
            }
        }
    )

    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data.user){
        return null
    }


    return data.user

}