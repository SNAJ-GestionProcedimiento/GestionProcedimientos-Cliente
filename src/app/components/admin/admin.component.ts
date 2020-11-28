import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   * Opciones disponibles para el administrador.
   */
  public OPTIONS = {
    VER_USUARIO : 0,
    CREAR_USUARIO : 1,
    EDITAR_USUARIO : 2,
    VER_PROCEDIMIENTO : 3,
    CREAR_PROCEDIMIENTO : 4,
    EDITAR_PROCEDIMIENTO : 5,
  };
  /**
   * Opción elegida por el usuario.
   */
  public selectedOption;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    switch (url){
      case '/admin':
        this.selectedOption = this.OPTIONS.VER_USUARIO;
        break;
      case '/admin/usuario':
        this.selectedOption = this.OPTIONS.VER_USUARIO;
        break;
      case '/admin/procedimiento':
          this.selectedOption = this.OPTIONS.VER_PROCEDIMIENTO;
        break;
      case '/admin/procedimiento/crear':
          this.selectedOption = this.OPTIONS.CREAR_PROCEDIMIENTO;
        break;
      case '/admin/procedimiento/editar':
          this.selectedOption = this.OPTIONS.EDITAR_PROCEDIMIENTO;
        break;
    }
  }

}
