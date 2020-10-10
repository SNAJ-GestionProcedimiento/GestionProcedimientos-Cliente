import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarHomeComponent } from './auxiliar-home.component';

describe('AuxiliarHomeComponent', () => {
  let component: AuxiliarHomeComponent;
  let fixture: ComponentFixture<AuxiliarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
