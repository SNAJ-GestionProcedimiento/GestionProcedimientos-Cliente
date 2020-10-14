import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarDocumentacionComponent } from './auxiliar-documentacion.component';

describe('AuxiliarDocumentacionComponent', () => {
  let component: AuxiliarDocumentacionComponent;
  let fixture: ComponentFixture<AuxiliarDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
