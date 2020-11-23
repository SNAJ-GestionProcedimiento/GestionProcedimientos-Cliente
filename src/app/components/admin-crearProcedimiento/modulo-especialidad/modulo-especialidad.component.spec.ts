import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloEspecialidadComponent } from './modulo-especialidad.component';

describe('ModuloEspecialidadComponent', () => {
  let component: ModuloEspecialidadComponent;
  let fixture: ComponentFixture<ModuloEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
