import { isEqual } from 'date-fns';
// isEqual verifica se duas datas são iguais
import Appointment from '../models/Appointment';

// criando uma tipagem de arquivo
// DTO - Data Transfer Object
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    // criando uma variavel que não é acessivel por fora da classe
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        // verificando agendamentos na mesma data
        // realiza uma busca em apointments e retorna o item em que
        // a data seja igual a data que esta vindo no parse date
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );
        // verifica se a sentença abaixo atende à condição, uma especie de if
        return findAppointment || null;
    }

    // provider: string, date: Date

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;

// esse arquivo é responsavel por tudo que vai mecher nos dados de agendamentosde alguma forma
// Qualquer função que for ler, alterar, buscar, criar deletar, deve ficar dentro do repository
// o repositorio é o detentor das operações que serão feitas nos dados da aplicação
// sempre que for armazenar qualquer tipo de dado, os repositorios serão
// responsaveis por fazer esse tipo de operação
