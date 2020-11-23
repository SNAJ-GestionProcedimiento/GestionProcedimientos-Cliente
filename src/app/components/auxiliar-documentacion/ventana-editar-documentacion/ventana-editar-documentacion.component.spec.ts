import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEditarDocumentacionComponent } from './ventana-editar-documentacion.component';

describe('VentanaEditarDocumentacionComponent', () => {
  let component: VentanaEditarDocumentacionComponent;
  let fixture: ComponentFixture<VentanaEditarDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaEditarDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaEditarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
