import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Usuario } from 'src/_models/modelsLogin/usuario.model';

@Component({
  selector: 'app-usuarios-info',
  templateUrl: './usuarios-info.component.html',
  styleUrls: ['./usuarios-info.component.css']
})
export class UsuariosInfoComponent implements OnInit {

  /**Variable de usuario*/
  public static elemento:Usuario;
  public usuario:Usuario;

  constructor() { }

  ngOnInit(): void {
    if(UsuariosInfoComponent.elemento != null){
      this.usuario = UsuariosInfoComponent.elemento;
    }
  }


}
