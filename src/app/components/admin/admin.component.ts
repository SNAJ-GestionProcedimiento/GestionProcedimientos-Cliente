import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /**
 * Opciones disponibles para el usuario.
 */
  public OPTIONS = {
    VER_PROCEDIMIENTO: 0,
    CREAR_PROCEDIMIENTO: 1,
    VER_USUARIO: 2
  };
  /**
   * Opción elegida por el usuario.
   */
  public selectedOption;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    switch (url){
      case '/admin/procedimiento':
        this.selectedOption = this.OPTIONS.VER_PROCEDIMIENTO;
        break;
      case '/admin/procedimiento/crear':
        this.selectedOption = this.OPTIONS.CREAR_PROCEDIMIENTO;
        break;
      case '/admin/usuarios':
        this.selectedOption = this.OPTIONS.VER_USUARIO;
        break;
    }
  }

  gestionProcedimientoOnclick(){
    this.router.navigateByUrl('admin/procedimiento');
  }
  gestionUsuariosOnclick(){
    this.router.navigateByUrl('admin/usuarios');
  }

}
