import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAuxiliarMaterialComponent } from './ventana-auxiliar-material.component';

describe('VentanaAuxiliarMaterialComponent', () => {
  let component: VentanaAuxiliarMaterialComponent;
  let fixture: ComponentFixture<VentanaAuxiliarMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaAuxiliarMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaAuxiliarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
