import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api/api.service';
import { EntradaExpress } from './entrada-express.model';
import { createRequestOption } from 'src/app/shared';


type EntityResponseType = HttpResponse<EntradaExpress>;
type EntityArrayResponseType = HttpResponse<EntradaExpress[]>;

@Injectable({ providedIn: 'root' })
export class EntradaExpressService {
  private resourceUrl = ApiService.API_URL + '/entrada-expresses';

  constructor(protected http: HttpClient) {}

  create(entradaExpress: EntradaExpress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entradaExpress);
    return this.http
      .post<EntradaExpress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(entradaExpress: EntradaExpress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entradaExpress);
    return this.http
      .put<EntradaExpress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<EntradaExpress>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<EntradaExpress[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(entradaExpress: EntradaExpress): EntradaExpress {
    const copy: EntradaExpress = Object.assign({}, entradaExpress, {
      registroFecha:
        entradaExpress.registroFecha && entradaExpress.registroFecha.isValid() ? entradaExpress.registroFecha.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.registroFecha = res.body.registroFecha ? moment(res.body.registroFecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((entradaExpress: EntradaExpress) => {
        entradaExpress.registroFecha = entradaExpress.registroFecha ? moment(entradaExpress.registroFecha) : undefined;
      });
    }
    return res;
  }
}
