import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloMaterialComponent } from './modulo-material.component';

describe('ModuloMaterialComponent', () => {
  let component: ModuloMaterialComponent;
  let fixture: ComponentFixture<ModuloMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
