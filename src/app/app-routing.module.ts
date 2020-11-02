import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';

const routes: Routes = [
  //Rutas de logueo
  //Rutas de programacion
  { path: 'programacion/home', component: AuxiliarHomeComponent },
  { path: 'programacion/crear', component: AuxiliarHomeComponent},
  { path: 'programacion/editar', component: AuxiliarHomeComponent},
  //Rutas de administrador
  { path: '**' , component: AuxiliarHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }