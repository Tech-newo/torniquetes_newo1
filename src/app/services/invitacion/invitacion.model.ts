import { BaseEntity } from 'src/model/base-entity';
import { Invitados } from '../invitados/invitados.model';

export class Invitacion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaInicio?: any,
        public fechaFin?: any,
        public sede?: any,
        public invitado?: Invitados,
    ) {
    }
}
