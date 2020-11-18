import { Component, OnInit } from '@angular/core';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';

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
    private usuarioGrupoService:UsuarioGrupoService
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
    //let res:any = await this.usuarioTokenService.getUser(userGroup.username).toPromise();
    //console.log(res);
  }

}
