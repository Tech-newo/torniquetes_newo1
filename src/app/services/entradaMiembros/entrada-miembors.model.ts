import { BaseEntity } from 'src/model/base-entity';
import { User } from '../user/user.model';

export class EntradaMiembros implements BaseEntity {
    constructor(
        public id?: number,
        public registroFecha?: any,
        public salida?: boolean,
        public tiempoMaximo?: boolean,
        public user?: User,
        public sede?: any,
    ) {
        this.salida = false;
        this.tiempoMaximo = false;
    }
}
