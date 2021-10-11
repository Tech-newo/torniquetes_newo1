import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Miembros } from './miembros.model';

@Injectable({ providedIn: 'root' })
export class MiembrosService {
  private resourceUrl = ApiService.API_URL + '/miembros';

  constructor(protected http: HttpClient) { }

  findById(memberId: number): Observable<HttpResponse<Miembros>> {
    return this.http.get(`${this.resourceUrl}?id.equals=${memberId}&page=0&size=1&sort=id,desc`, { observe: 'response' });
  }

  findByUserId(userId: number): Observable<HttpResponse<Miembros>> {
    return this.http.get(`${this.resourceUrl}?userId.equals=${userId}&page=0&size=1&sort=id,desc`, { observe: 'response' });
  }

}
