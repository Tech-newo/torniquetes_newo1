import { Moment } from 'moment';
import { User } from 'src/app/services/user/user.model';
import { Sedes } from '../sedes/sedes.model';
import { Empresa } from '../empresa/empresa.model';

export interface IEventoExpress {
  id?: number;
  fechaInicioEvento?: Moment;
  fechaFinEvento?: Moment;
  estadoReserva?: string;
  titulo?: string;
  descripcion?: number;
  numeroInvitados?: number;
  precio?: number;
  bloqueada?: boolean;
  vencido?: boolean;
  pagado?: boolean;
  fechaPagado?: Moment;
  facturado?: boolean;
  fechaFacturado?: Moment;
  fechaRegistro?: Moment;
  user?: User;
  sedes?: Sedes;
  empresa?: Empresa;
}

export class EventoExpress implements IEventoExpress {
  constructor(
    public id?: number,
    public fechaInicioEvento?: Moment,
    public fechaFinEvento?: Moment,
    public estadoReserva?: string,
    public titulo?: string,
    public descripcion?: number,
    public numeroInvitados?: number,
    public precio?: number,
    public bloqueada?: boolean,
    public vencido?: boolean,
    public pagado?: boolean,
    public fechaPagado?: Moment,
    public facturado?: boolean,
    public fechaFacturado?: Moment,
    public fechaRegistro?: Moment,
    public user?: User,
    public sedes?: Sedes,
    public empresa?: Empresa
  ) {
    this.bloqueada = this.bloqueada || false;
    this.vencido = this.vencido || false;
    this.pagado = this.pagado || false;
    this.facturado = this.facturado || false;
  }
}
