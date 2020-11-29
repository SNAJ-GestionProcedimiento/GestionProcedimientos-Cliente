import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloPrincipalCrearProcedimientoComponent } from './modulo-principal-crear-procedimiento.component';

describe('ModuloPrincipalCrearProcedimientoComponent', () => {
  let component: ModuloPrincipalCrearProcedimientoComponent;
  let fixture: ComponentFixture<ModuloPrincipalCrearProcedimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloPrincipalCrearProcedimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloPrincipalCrearProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
