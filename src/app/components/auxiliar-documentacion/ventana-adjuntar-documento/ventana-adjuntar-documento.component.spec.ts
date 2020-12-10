import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAdjuntarDocumentoComponent } from './ventana-adjuntar-documento.component';

describe('VentanaAdjuntarDocumentoComponent', () => {
  let component: VentanaAdjuntarDocumentoComponent;
  let fixture: ComponentFixture<VentanaAdjuntarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaAdjuntarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaAdjuntarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
