import { BaseEntity } from 'src/model/base-entity';

export class EntradaInvitados implements BaseEntity {
    constructor(
        public id?: number,
        public registroFecha?: any,
        public salida?: boolean,
        public tiempoMaximo?: boolean,
        public sede?: any,
        public invitado?: any,
    ) {
        this.salida = false;
        this.tiempoMaximo = false;
    }
}
