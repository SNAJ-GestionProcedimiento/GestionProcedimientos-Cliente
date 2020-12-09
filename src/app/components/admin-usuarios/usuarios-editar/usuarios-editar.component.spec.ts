import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEditarComponent } from './usuarios-editar.component';

describe('UsuariosEditarComponent', () => {
  let component: UsuariosEditarComponent;
  let fixture: ComponentFixture<UsuariosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
