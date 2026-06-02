import { AppointmentRepository } from "../repositories/AppointmentRepository";

const repository = new AppointmentRepository();

/** serviço responsável pelas regras de negócios dos agendamento */
export class SchedulingService {
    /** iremos buscar horários disponíveis de um fisioterapeuta por data */
    async getAvailableSlots(fisioterapeutaId: string, data:string){
        return await repository.findAvailableSlots(fisioterapeutaId, data);
    }

    /** cria um novo agendamento aplicado as regras de negócios */
    async scheduleAppointment(appointment: {
        paciente_id: string
        fisioterapeuta_id: string
        servico_id: string
        data_hora: string
        tipo: string
        primeira_consulta: boolean
    }){
        return await repository.createAppointment(appointment)
    }

     /** busca o historico de consulta do paciente */
    async getPatientHistory(pacienteId: string){
        return await repository.findAppointmentsByPatient(pacienteId)
    }

    /** cancela uma consulta respeitando a regra de 24h de antecedência */
    async getCancelAppointment(consultaId: string, dataConsulta: string){
        const agora = new Date()
        const consulta = new Date(dataConsulta)
        const diferencaHoras = (consulta.getTime() - agora.getTime()) / (1000 * 60 *60) /** calcula a diferença em horas entre agora e a data da consulta -- milisegundos para horas (1000ms * 60s * 60min)*/

        if(diferencaHoras < 24){
            throw new Error('Cancelamento deve ser feito com mínimo de 24h de antecedência! ')
        }

        return await repository.cancelAppointment(consultaId)
    }
}