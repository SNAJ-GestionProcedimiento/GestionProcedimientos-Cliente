import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProcedimientoComponent } from './modulo-procedimiento.component';

describe('ModuloProcedimientoComponent', () => {
  let component: ModuloProcedimientoComponent;
  let fixture: ComponentFixture<ModuloProcedimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloProcedimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
