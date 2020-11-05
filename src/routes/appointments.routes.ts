import { Router } from 'express';
// parseIso converte uma string para um formato date
// o startOfHours coloca o minuto , segundo e milisegundo como 0, ou seja no começo da hora
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router(); // definindo a variavel como uma rota

// adicionando tipagem na variavel apponitment
// interface Appointment {
//     id: string;
//     provider: string;
//     date: Date;
// }

// determiando que a variavel apointments é um array do tipo Appointments
// const appointments: Appointment[] = [];

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

// Como o /appointments ja esta definido no arquivo index.ts basta usar o / aqui
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    // Recebe do date do body uma string tranforma em formato date
    // depois zera os minutos, segundos, milsgundos
    // e aramazena no variavel parse date
    const parsedDate = startOfHour(parseISO(date));

    // // verificando agendamentos na mesma data
    // // realiza uma busca em apointments e retorna o item em que
    // // a data seja igual a data que esta vindo no parse date
    // const findAppointmentInSameDate = appointments.find(appointment =>
    //     isEqual(parsedDate, appointment.date),
    // );

    // utilizando o metodo criado na classe AppointmentsRepository
    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    // verificando se o findAppointmentInSameDate foi encontrado
    // se foi ele retorna um erro
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    // // definindo um modelo
    // const appointment = {
    //     id: uuid(), // retorna um id unico
    //     provider,
    //     date: parsedDate, // recebe o parseDate, que em resumo é o date tratado
    // };

    // // dando um push no array com conteudo acima
    // appointments.push(appointment);

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });

    // retornando uma resposta
    return response.json(appointment);
});

export default appointmentsRouter;
