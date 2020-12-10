import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInfoComponent } from './usuarios-info.component';

describe('UsuariosInfoComponent', () => {
  let component: UsuariosInfoComponent;
  let fixture: ComponentFixture<UsuariosInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
