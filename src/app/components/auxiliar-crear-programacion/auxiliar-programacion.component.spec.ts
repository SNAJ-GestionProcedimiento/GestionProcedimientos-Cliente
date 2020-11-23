
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarCrearProgramacionComponent } from './auxiliar-crear-programacion.component';

describe('AuxiliarCrearProgramacionComponent', () => {
  let component: AuxiliarCrearProgramacionComponent;
  let fixture: ComponentFixture<AuxiliarCrearProgramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarCrearProgramacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarCrearProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
