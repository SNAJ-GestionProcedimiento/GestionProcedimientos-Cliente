import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraFechaComponent } from './hora-fecha.component';

describe('HoraFechaComponent', () => {
  let component: HoraFechaComponent;
  let fixture: ComponentFixture<HoraFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
