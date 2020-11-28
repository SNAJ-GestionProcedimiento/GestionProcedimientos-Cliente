import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router:Router,
    private snackBar: MatSnackBar
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let grupo = localStorage.getItem('group');
    if(grupo!=null){
      if(grupo == "Admin"){
        return true;
      }else{
        this.openSnackBar('Debe iniciar sesion como:','Administrador');
        this.router.navigateByUrl('');
        return false;
      }
    }
    this.openSnackBar('Debe iniciar sesion como:','Administrador');
    this.router.navigateByUrl('');
    return false;
  }
  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  
}
