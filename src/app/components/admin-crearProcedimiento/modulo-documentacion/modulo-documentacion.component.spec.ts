import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloDocumentacionComponent } from './modulo-documentacion.component';

describe('ModuloDocumentacionComponent', () => {
  let component: ModuloDocumentacionComponent;
  let fixture: ComponentFixture<ModuloDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
