import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { group } from 'console';
import { Observable } from 'rxjs';

import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public static grupo:Number;
  public admin:boolean;
  constructor(private usuarioGrupoService:UsuarioGrupoService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(AdminGuard.grupo!=null){
      if(AdminGuard.grupo == 1){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
  
}
