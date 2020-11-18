import { v4 as uuid } from 'uuid'; // necessário instalar a biblioteca

class Appointment {
    id: string;

    provider: string;

    date: Date;

    // o constructor serve para receber os parâmetros quando for chamadoe  aplicar um regra
    // ex: new appointment(parametro1, parametro2)
    // paraâmetros recebidos na instancia da classe
    // constructor(provider: string, date: Date) {

    // recebe os prâmetros do Appontment com exceção do id
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

// retorna o objeto definido acima
export default Appointment;
