import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';
import { AuxProgGuard } from './aux-prog.guard';
import { AdminProcedimientosComponent } from './components/admin-procedimientos/admin-procedimientos.component';
import { AuxiliarUsuarioConfiguracionComponent } from './components/auxiliar-usuario-configuracion/auxiliar-usuario-configuracion.component';



const routes: Routes = [
  //Rutas de logueo
  { path: '', component: LoginComponent },
  //Rutas de programacion
  { path: 'programacion', component: AuxiliarHomeComponent, canActivate:[LoginGuard,AuxProgGuard] },
  { path: 'programacion/crear', component: AuxiliarHomeComponent, canActivate:[LoginGuard,AuxProgGuard]},
  { path: 'programacion/editar', component: AuxiliarHomeComponent, canActivate:[LoginGuard,AuxProgGuard]},
  //Rutas de configuracion Auxiliar
  { path: 'auxiliar/configuracion', component:AuxiliarUsuarioConfiguracionComponent, canActivate:[LoginGuard,AuxProgGuard]},
  //Rutas de administrador
  { path: 'admin', component: AdminComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: 'admin/usuario', component: AdminComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: 'admin/procedimiento/crear', component: AdminComponent, canActivate:[LoginGuard, AdminGuard]},
  { path: 'admin/procedimiento/editar', component: AdminComponent, canActivate:[LoginGuard, AdminGuard]},
  { path: 'admin/procedimiento', component: AdminProcedimientosComponent, canActivate:[LoginGuard,AdminGuard]},
  //Ruta de error 404
  { path: '**' , component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }