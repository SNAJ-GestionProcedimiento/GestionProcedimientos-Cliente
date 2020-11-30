import { Component, OnInit } from '@angular/core';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';
import { Router } from '@angular/router';

import { LogoutService } from 'src/_services/logout.service';

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
    let token = localStorage.getItem('token');
    let userGroup:any = await this.usuarioGrupoService.getGroup(token).toPromise();
    this.nombreUsuario = userGroup.username;
  }
  public cerrarSesion(){
    this.logoutService.logout(localStorage.getItem('token'));
    localStorage.removeItem('token');
    this.router.navigateByUrl("");
  }

}
