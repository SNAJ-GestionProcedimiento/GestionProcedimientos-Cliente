import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auxiliar-home',
  templateUrl: './auxiliar-home.component.html',
  styleUrls: ['./auxiliar-home.component.css']
})
export class AuxiliarHomeComponent implements OnInit {
  /**
   * Opciones disponibles para el usuario.
   */
  public OPTIONS = {
    VER_AGENDA : 0,
    CREAR_AGENDA : 1,
    EDITAR_AGENDA : 2
  };
  /**
   * Opción elegida por el usuario.
   */
  public selectedOption;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    switch (url){
      case '/programacion':
        this.selectedOption = this.OPTIONS.VER_AGENDA;
        break;
      case '/programacion/crear':
        this.selectedOption = this.OPTIONS.CREAR_AGENDA;
        break;
      case '/programacion/editar':
        this.selectedOption = this.OPTIONS.EDITAR_AGENDA;
        break;
    }
  }
  gestionOnclick(){
    this.router.navigateByUrl('programacion');
  }
}
