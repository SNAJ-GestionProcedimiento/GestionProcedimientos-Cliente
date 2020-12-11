import { Component, OnInit } from '@angular/core';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';
import { Router } from '@angular/router';

import { LogoutService } from 'src/_services/logout.service';
import { AuthHelper } from 'src/_helpers/auth.helper';

@Component({
  selector: 'app-auxiliar-navbar',
  templateUrl: './auxiliar-navbar.component.html',
  styleUrls: ['./auxiliar-navbar.component.css']
})
export class AuxiliarNavbarComponent implements OnInit {

  numeroNotificaciones: number;
  public nombreUsuario:string='';

  constructor(
    private numNotificacion: NumeroNotificacionesService,
    private usuarioGrupoService:UsuarioGrupoService,
    private router:Router,
    private logoutService:LogoutService 
  ) { }

  ngOnInit(): void {
    this.numNotificacion.customNumeroNotificaciones.subscribe(msg => this.numeroNotificaciones = msg);
    this.actualizarNombre();
  }

  clickNotificacion() {
    this.numNotificacion.changeBandera(this.numeroNotificaciones);
  }

  public async actualizarNombre(){
    this.nombreUsuario = localStorage.getItem('username');
  }
  public cerrarSesion(){
    AuthHelper.logout();
    this.logoutService.logout(localStorage.getItem('token'));
    this.router.navigateByUrl("");
  }

}
