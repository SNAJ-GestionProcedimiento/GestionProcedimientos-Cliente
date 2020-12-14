import { Component, OnInit } from '@angular/core';
import { UsuarioTokenService } from 'src/_services/usuarios/usuario-token.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';
import { Router } from '@angular/router';

import { LogoutService } from 'src/_services/logout.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  public nombreUsuario:string='';

  constructor(
    private usuarioTokenService:UsuarioTokenService,
    private usuarioGrupoService:UsuarioGrupoService,
    private router:Router,
    private logoutService:LogoutService
  ) { }

  ngOnInit(): void {
    this.actualizarNombre();
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
