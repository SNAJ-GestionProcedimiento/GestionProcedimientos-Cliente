import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarMaterialesComponent } from './auxiliar-materiales.component';

describe('AuxiliarMaterialesComponent', () => {
  let component: AuxiliarMaterialesComponent;
  let fixture: ComponentFixture<AuxiliarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
