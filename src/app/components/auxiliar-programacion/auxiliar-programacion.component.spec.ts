
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarProgramacionComponent } from './auxiliar-programacion.component';

describe('AuxiliarProgramacionComponent', () => {
  let component: AuxiliarProgramacionComponent;
  let fixture: ComponentFixture<AuxiliarProgramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarProgramacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
