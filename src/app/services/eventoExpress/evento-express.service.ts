import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ApiService } from 'src/app/services/api/api.service';
import { IEventoExpress } from './evento-express.model';
import { createRequestOption } from 'src/app/shared';

type EntityResponseType = HttpResponse<IEventoExpress>;
type EntityArrayResponseType = HttpResponse<IEventoExpress[]>;

@Injectable({ providedIn: 'root' })
export class EventoExpressService {
  public resourceUrl = ApiService.API_URL + '/evento-expresses';

  constructor(protected http: HttpClient) {}

  create(eventoExpress: IEventoExpress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventoExpress);
    return this.http
      .post<IEventoExpress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(eventoExpress: IEventoExpress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventoExpress);
    return this.http
      .put<IEventoExpress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEventoExpress>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEventoExpress[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(eventoExpress: IEventoExpress): IEventoExpress {
    const copy: IEventoExpress = Object.assign({}, eventoExpress, {
      fechaInicioEvento:
        eventoExpress.fechaInicioEvento && eventoExpress.fechaInicioEvento.isValid() ? eventoExpress.fechaInicioEvento.toJSON() : undefined,
      fechaFinEvento:
        eventoExpress.fechaFinEvento && eventoExpress.fechaFinEvento.isValid() ? eventoExpress.fechaFinEvento.toJSON() : undefined,
      fechaPagado: eventoExpress.fechaPagado && eventoExpress.fechaPagado.isValid() ? eventoExpress.fechaPagado.toJSON() : undefined,
      fechaFacturado:
        eventoExpress.fechaFacturado && eventoExpress.fechaFacturado.isValid() ? eventoExpress.fechaFacturado.toJSON() : undefined,
      fechaRegistro:
        eventoExpress.fechaRegistro && eventoExpress.fechaRegistro.isValid() ? eventoExpress.fechaRegistro.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicioEvento = res.body.fechaInicioEvento ? moment(res.body.fechaInicioEvento) : undefined;
      res.body.fechaFinEvento = res.body.fechaFinEvento ? moment(res.body.fechaFinEvento) : undefined;
      res.body.fechaPagado = res.body.fechaPagado ? moment(res.body.fechaPagado) : undefined;
      res.body.fechaFacturado = res.body.fechaFacturado ? moment(res.body.fechaFacturado) : undefined;
      res.body.fechaRegistro = res.body.fechaRegistro ? moment(res.body.fechaRegistro) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((eventoExpress: IEventoExpress) => {
        eventoExpress.fechaInicioEvento = eventoExpress.fechaInicioEvento ? moment(eventoExpress.fechaInicioEvento) : undefined;
        eventoExpress.fechaFinEvento = eventoExpress.fechaFinEvento ? moment(eventoExpress.fechaFinEvento) : undefined;
        eventoExpress.fechaPagado = eventoExpress.fechaPagado ? moment(eventoExpress.fechaPagado) : undefined;
        eventoExpress.fechaFacturado = eventoExpress.fechaFacturado ? moment(eventoExpress.fechaFacturado) : undefined;
        eventoExpress.fechaRegistro = eventoExpress.fechaRegistro ? moment(eventoExpress.fechaRegistro) : undefined;
      });
    }
    return res;
  }
}
