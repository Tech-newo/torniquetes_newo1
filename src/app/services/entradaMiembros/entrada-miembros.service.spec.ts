import { TestBed } from '@angular/core/testing';

import { EntradaMiembrosService } from './entrada-miembros.service';

describe('EntradaMiembrosService', () => {
  let service: EntradaMiembrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaMiembrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
