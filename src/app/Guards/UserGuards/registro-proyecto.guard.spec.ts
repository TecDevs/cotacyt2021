import { TestBed } from '@angular/core/testing';

import { RegistroProyectoGuard } from './registro-proyecto.guard';

describe('RegistroProyectoGuard', () => {
  let guard: RegistroProyectoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistroProyectoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
