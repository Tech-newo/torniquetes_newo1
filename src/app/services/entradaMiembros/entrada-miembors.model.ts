import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';
import { User } from '../user/user.model';

export class EntradaMiembros implements BaseEntity {
    constructor(
        public id?: number,
        public registroFecha?: any,
        public salida?: boolean,
        public tiempoMaximo?: boolean,
        public user?: User,
        public sede?: Sedes,
    ) {
        this.salida = false;
        this.tiempoMaximo = false;
    }
}
