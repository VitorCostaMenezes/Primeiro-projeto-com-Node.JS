import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// o metodo use foi utilizado para receber qualquer metodo (get, post, put, delete)
// que chege nesta rota
// e repassa o que vem após o appointments  par dentro do appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
