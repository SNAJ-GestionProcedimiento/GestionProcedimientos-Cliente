import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarAgendaComponent } from './auxiliar-agenda.component';

describe('AuxiliarAgendaComponent', () => {
  let component: AuxiliarAgendaComponent;
  let fixture: ComponentFixture<AuxiliarAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
