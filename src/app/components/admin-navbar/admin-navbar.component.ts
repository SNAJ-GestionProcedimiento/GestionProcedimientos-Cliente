import { Component, OnInit } from '@angular/core';
import { UsuarioTokenService } from 'src/_services/usuarios/usuario-token.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  public nombreUsuario:string='';

  constructor(
    private usuarioTokenService:UsuarioTokenService,
    private usuarioGrupoService:UsuarioGrupoService
  ) { }

  ngOnInit(): void {
    this.actualizarNombre();
  }
  public async actualizarNombre(){
    let token = localStorage.getItem('token');
    let userGroup:any = await this.usuarioGrupoService.getGroup(token).toPromise();
    console.log(userGroup);
    this.nombreUsuario = userGroup.username;
    //let res:any = await this.usuarioTokenService.getUser(userGroup.username).toPromise();
    //console.log(res);
  }

}
