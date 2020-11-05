import { v4 as uuid } from 'uuid'; // necessário instalar a biblioteca

class Appointment {
    id: string;

    provider: string;

    date: Date;

    // paraâmetros recebidos na instancia da classe
    // constructor(provider: string, date: Date) {

    // recebe os prâmetros do Appontment com exceção do id
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
