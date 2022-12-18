import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Sedes } from './sedes.model';
import { createRequestOption } from 'src/app/shared';

@Injectable({ providedIn: 'root'})
export class SedesService {
    private resourceUrl = ApiService.API_URL + '/sedes';

    constructor(protected http: HttpClient) { }

    find(id: number): Observable<HttpResponse<Sedes>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    findBySedeId(id:number): Observable<HttpResponse<Sedes[]>> {
        return this.http.get<Sedes[]>(`${this.resourceUrl}?id.equals=${id}&page=0&size=1&sort=id,desc`, { observe: 'response'});
    }

    
    query(req?: any): Observable<HttpResponse<Sedes>> {
        const options = createRequestOption(req);
        return this.http.get<Sedes>(this.resourceUrl, { params: options, observe: 'response' });
      }

}
