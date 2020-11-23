import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloInstrumentoComponent } from './modulo-instrumento.component';

describe('ModuloInstrumentoComponent', () => {
  let component: ModuloInstrumentoComponent;
  let fixture: ComponentFixture<ModuloInstrumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloInstrumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloInstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
