import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProcedimientosComponent } from './admin-procedimientos.component';

describe('AdminProcedimientosComponent', () => {
  let component: AdminProcedimientosComponent;
  let fixture: ComponentFixture<AdminProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
