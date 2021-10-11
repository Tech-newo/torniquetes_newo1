import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Invitados } from './invitados.model';

@Injectable({ providedIn: 'root'})
export class InvitadosService {
    private resourceUrl = ApiService.API_URL + '/invitados';

    constructor(protected http: HttpClient) { }

    create(invitados: Invitados): Observable<HttpResponse<Invitados>> {
        return this.http.post<Invitados>(this.resourceUrl, invitados, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Invitados>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    findByUserId(id:number): Observable<HttpResponse<Invitados[]>> {
        return this.http.get<Invitados[]>(`${this.resourceUrl}?userId.equals=${id}&sort=id,desc`, { observe: 'response'});
    }
    
    findById(id:number): Observable<HttpResponse<Invitados[]>> {
        return this.http.get<Invitados[]>(`${this.resourceUrl}?id.equals=${id}&page=$0&size=1&sort=id,asc`, { observe: 'response'});
    }


}
