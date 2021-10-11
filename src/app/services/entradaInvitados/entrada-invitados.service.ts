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

    findLastRegistryByGuestId(id:number): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.get(`${this.resourceUrl}?invitadoId.equals=${id}&page=0&size=1&sort=id,desc`, { observe: 'response'});
    }

}
