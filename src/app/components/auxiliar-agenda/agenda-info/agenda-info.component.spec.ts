import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaInfoComponent } from './agenda-info.component';

describe('AgendaInfoComponent', () => {
  let component: AgendaInfoComponent;
  let fixture: ComponentFixture<AgendaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
