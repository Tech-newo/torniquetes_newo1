import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { EntradaInvitados } from './entrada-invitados.model';

@Injectable({ providedIn: 'root'})
export class EntradaInvitadosService {
    private resourceUrl = ApiService.API_URL + '/entrada-invitados';

    constructor(protected http: HttpClient) { }

    create(entradaInvitados: EntradaInvitados): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.post<EntradaInvitados>(this.resourceUrl, entradaInvitados, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    findByFechaRegistro(id:number,fechaRegistroMayor:string,fechaRegistroMenor:string): Observable<HttpResponse<EntradaInvitados[]>> {
        return this.http.get<EntradaInvitados[]>(`${this.resourceUrl}?invitadoId.equals=${id}&sort=id,desc&registroFecha.greaterThanOrEqual=${fechaRegistroMenor}T05:00:00Z&registroFecha.lessThan=${fechaRegistroMayor}T04:59:59Z`, { observe: 'response'});
    }

}
