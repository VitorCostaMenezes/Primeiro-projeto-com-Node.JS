import { startOfHour } from 'date-fns';
// o startOfHours coloca o minuto , segundo e milisegundo como 0, ou seja no começo da hora

// importando o model
import Appointment from '../models/Appointment';
// importando o repositorio
import AppointmentsRepository from '../repositories/AppointmentsRepository';

// criando uma interface
interface Request {
    date: Date;
    provider: string;
}

class CreateAppointmentService {
    // criando uma variavel privada que só pode ser acessada dentro da classe
    // definindo o retorno da variavel como sendo do tipo AppointmentRepository
    private appointmentsRepository: AppointmentsRepository;

    // Criando um contructor/
    // Recebe um parâmetro do tipo Appointmenterepository
    // reecebendo o valor do repositorio appointmens do arquivo AppointmentsRepository.ts
    //  como parâmaetro
    // isso é chamado de Dependency Inversion
    constructor(appointmentsRepository: AppointmentsRepository) {
        // Atribuindo um valor a appointmenteRepoitory
        this.appointmentsRepository = appointmentsRepository;
    }

    // Criando o metodo execute, que recebe dois parâmetros definidos pela tipagem request
    // o execute retorna um Appointment
    public execute({ date, provider }: Request): Appointment {
        // Recebendo o valor de date e executando  a função startHours
        // e aramazenando em appointmentDate
        // o startOfHours coloca o minuto , segundo e milisegundo como 0, ou seja no começo da hora
        const appointmentDate = startOfHour(date);

        // Armazenando na variavel o valor obtido através do metod findByDate
        // o metodo verifica se ja existe um valor armazenado no memso horário
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            // passando o valor de appointmentDate como parâmetro pro metodo findByDate
            appointmentDate,
        );

        // Os services não têm acesso aos response ou requests
        // verifica se o metodo findBydate retornou true
        // se for true exibe um erro
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        // armazena em appointment o valor criado através do meotod create
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
