import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarEditarProgramacionComponent } from './auxiliar-editar-programacion.component';

describe('AuxiliarEditarProgramacionComponent', () => {
  let component: AuxiliarEditarProgramacionComponent;
  let fixture: ComponentFixture<AuxiliarEditarProgramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarEditarProgramacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarEditarProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
