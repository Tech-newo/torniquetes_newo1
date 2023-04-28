import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Invitacion } from './invitacion.model';
import { createRequestOption } from 'src/app/shared';

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

    findById(id : number): Observable<HttpResponse<Invitacion>> {
        return this.http.get<Invitacion>(`${this.resourceUrl}?id.equals=${id}&page=0&size=1&&sort=id,desc`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Invitacion>> {
        const options = createRequestOption(req);
        return this.http.get<Invitacion>(this.resourceUrl, { params: options, observe: 'response' });
      }
}
