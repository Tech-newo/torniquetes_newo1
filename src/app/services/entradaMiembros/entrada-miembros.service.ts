import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { EntradaMiembros } from './entrada-miembors.model';
import { createRequestOption } from 'src/app/shared';

@Injectable({ providedIn: 'root'})
export class EntradaMiembrosService {
    private resourceUrl = ApiService.API_URL + '/entrada-miembros';

    constructor(protected http: HttpClient) { }

    create(entradaMiembros: EntradaMiembros): Observable<HttpResponse<EntradaMiembros>> {
        return this.http.post<EntradaMiembros>(this.resourceUrl, entradaMiembros, { observe: 'response'});
    }

    findLastRegistryByUserId(id:number): Observable<HttpResponse<EntradaMiembros>> {
        return this.http.get(`${this.resourceUrl}?userId.equals=${id}&page=0&size=1&sort=id,desc`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EntradaMiembros>> {
        const options = createRequestOption(req);
        return this.http.get<EntradaMiembros>(this.resourceUrl, { params: options, observe: 'response' });
      }
    
}
