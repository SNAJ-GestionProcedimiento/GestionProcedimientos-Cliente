import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientoModalComponent } from './procedimiento-modal.component';

describe('ProcedimientoModalComponent', () => {
  let component: ProcedimientoModalComponent;
  let fixture: ComponentFixture<ProcedimientoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimientoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
