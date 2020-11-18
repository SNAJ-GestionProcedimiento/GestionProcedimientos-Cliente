import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioGrupoService:UsuarioGrupoService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
    return this.EsAdmin();
  }

  public async EsAdmin(){
    let token = localStorage.getItem('token');
    let res:any = await this.usuarioGrupoService.getGroup(token).toPromise();
    if(res.group_id == 1){
      return false;
    }else{
      return true;
    }
  }
  
}
