import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEditarMaterialesComponent } from './ventana-editar-materiales.component';

describe('VentanaEditarMaterialesComponent', () => {
  let component: VentanaEditarMaterialesComponent;
  let fixture: ComponentFixture<VentanaEditarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaEditarMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaEditarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
