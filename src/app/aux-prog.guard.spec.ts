import { TestBed } from '@angular/core/testing';

import { AuxProgGuard } from './aux-prog.guard';

describe('AuxProgGuard', () => {
  let guard: AuxProgGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuxProgGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
