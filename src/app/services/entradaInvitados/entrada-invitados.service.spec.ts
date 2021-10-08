import { TestBed } from '@angular/core/testing';

import { EntradaInvitadosService } from './entrada-invitados.service';

describe('EntradaInvitadosService', () => {
  let service: EntradaInvitadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaInvitadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
