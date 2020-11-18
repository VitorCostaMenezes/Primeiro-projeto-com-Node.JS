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
    // e definindo a tipagem como um array de Appointment
    private appointments: Appointment[];

    // inicializando o tipo a variavel como um array vazio
    constructor() {
        this.appointments = [];
    }

    // retorna o valor de appointments
    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        // verificando agendamentos na mesma data
        // realiza uma busca em apointments e retorna o item em que
        // a data seja igual a data que esta vindo no date
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );
        // verifica se a sentença abaixo atende à condição, uma especie de if
        // se findAppointment existir retorna ele mesmo
        // se não retorna um null
        return findAppointment || null;
    }

    // provider: string, date: Date
    // recebe dois parâmetros
    // desestruturando e definindo a tipagem CreateApponintmentDTO
    // é necessário sempre informar o tipo de retorno
    // nesse caso o retorno é do tipo Appointment
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        // aramazenando o valor de um new Appointment que receberá os parâmaetros acima como valor
        // ao passra o o valor de provider e date via parâmetro, ele vai na classe Apointmen
        // monta a estrutura com base nas regras definidas na classe e retorna um objeto
        // que é armazenado na variavel appointment
        const appointment = new Appointment({ provider, date });

        // dando um push em appointments com o valor de appointment
        this.appointments.push(appointment);

        // retornando o valor de appointment
        return appointment;
    }
}

export default AppointmentsRepository;

// esse arquivo é responsavel por tudo que vai mecher nos dados de agendamentos de alguma forma
// Qualquer função que for ler, alterar, buscar, criar deletar, deve ficar dentro do repository
// o repositorio é o detentor das operações que serão feitas nos dados da aplicação
// sempre que for armazenar qualquer tipo de dado, os repositorios serão
// responsaveis por fazer esse tipo de operação
