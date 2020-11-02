import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAuxiliarDocumentacionComponent } from './ventana-auxiliar-documentacion.component';

describe('VentanaAuxiliarDocumentacionComponent', () => {
  let component: VentanaAuxiliarDocumentacionComponent;
  let fixture: ComponentFixture<VentanaAuxiliarDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaAuxiliarDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaAuxiliarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
