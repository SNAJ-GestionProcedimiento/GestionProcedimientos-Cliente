import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcudienteComponent } from './acudiente.component';

describe('AcudienteComponent', () => {
  let component: AcudienteComponent;
  let fixture: ComponentFixture<AcudienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcudienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
