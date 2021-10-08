import { TestBed } from '@angular/core/testing';

import { MiembrosServicesService } from './miembros-services.service';

describe('MiembrosServicesService', () => {
  let service: MiembrosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiembrosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
