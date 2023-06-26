import { Moment } from 'moment';
import { User } from 'src/app/services/user/user.model';
import { EventoExpress } from '../eventoExpress/evento-express.model';

export interface EntradaExpress {
  id?: number;
  registroFecha?: Moment;
  salida?: boolean;
  tiempoMaximo?: boolean;
  nombreInvitado?: string;
  emailInvitado?: string;
  user?: User;
  eventoExpress?: EventoExpress;
}

export class EntradaExpress implements EntradaExpress {
  constructor(
    public id?: number,
    public registroFecha?: Moment,
    public salida?: boolean,
    public tiempoMaximo?: boolean,
    public nombreInvitado?: string,
    public emailInvitado?: string,
    public user?: User,
    public eventoExpress?: EventoExpress
  ) {
    this.salida = this.salida || false;
    this.tiempoMaximo = this.tiempoMaximo || false;
  }
}
