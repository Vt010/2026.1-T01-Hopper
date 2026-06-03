import { supabase } from '../supabaseClient'

export class AppointmentRepository {

    /** busca horários disponíveis de um fisioterapeuta por data */
  async findAvailableSlots(fisioterapeutaId: string, data: string) {
    const { data: slots, error } = await supabase
      .from('horarios_disponiveis')
      .select('*')
      .eq('fisioterapeuta_id', fisioterapeutaId)
      .eq('data', data)

    if (error) throw new Error(error.message)
    return slots
  }

    /** esse irá criar um novo agendamento de consulta no banco de dados */
  async createAppointment(appointment: {
    paciente_id: string
    fisioterapeuta_id: string
    servico_id: string
    data_hora: string
    tipo: string
    primeira_consulta: boolean
  }) {
    const { data, error } = await supabase
      .from('consultas')
      .insert(appointment)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

    /** busca todas as consultas de um paciente */
  async findAppointmentsByPatient(pacienteId: string) {
    const { data, error } = await supabase
      .from('consultas')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data_hora', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }


  /** cancela uma consulta pelo id do paciente */
  async cancelAppointment(consultaId: string) {
    const { data, error } = await supabase
      .from('consultas')
      .update({ status: 'cancelada' })
      .eq('id', consultaId)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }
}