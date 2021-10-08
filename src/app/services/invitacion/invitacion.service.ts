import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Invitacion } from './invitacion.model';

@Injectable({ providedIn: 'root'})
export class InvitacionService {
    private resourceUrl = ApiService.API_URL + '/invitacions';

    constructor(protected http: HttpClient) { }

    find(id: number): Observable<HttpResponse<Invitacion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    findLastInvitationByIdGuess(idInvitado : number): Observable<HttpResponse<Invitacion>> {
        return this.http.get<Invitacion>(`${this.resourceUrl}?invitadoId.equals=${idInvitado}&page=0&sort=id,desc`, { observe: 'response'});
    }

}
