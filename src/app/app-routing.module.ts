import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';
import { AdminProcedimientosComponent } from './components/admin-procedimientos/admin-procedimientos.component';
import { ModuloPrincipalCrearProcedimientoComponent } from './components/admin-crearProcedimiento/modulo-principal-crear-procedimiento/modulo-principal-crear-procedimiento.component';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios.component';



const routes: Routes = [
  //Rutas de logueo
  { path: '', component: LoginComponent },
  //Rutas de programacion
  { path: 'programacion', component: AuxiliarHomeComponent, canActivate:[LoginGuard] },
  { path: 'programacion/crear', component: AuxiliarHomeComponent, canActivate:[LoginGuard]},
  { path: 'programacion/editar', component: AuxiliarHomeComponent, canActivate:[LoginGuard]},
  //Rutas de administrador
  { path: 'admin', component: AdminComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: 'admin/procedimiento', component: AdminProcedimientosComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: 'admin/procedimiento/crear', component: ModuloPrincipalCrearProcedimientoComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate:[LoginGuard,AdminGuard]},
  //Ruta de error 404
  { path: '**' , component: AuxiliarHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }