import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientoComponent } from './procedimiento.component';

describe('ProcedimientoComponent', () => {
  let component: ProcedimientoComponent;
  let fixture: ComponentFixture<ProcedimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
