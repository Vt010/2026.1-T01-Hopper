import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/** rota pública que retorna todos os serviços da clínica */
export const revalidate = 3600


export async function GET(){
    const { data: servicos, error} = await supabase
    .from('servicos')
    .select('id, nome, descricao, indicacoes, icone')
    .order('nome', { ascending: true })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


    return NextResponse.json(servicos ?? [])    
    
}