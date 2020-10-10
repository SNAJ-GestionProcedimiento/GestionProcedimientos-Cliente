import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';

const routes: Routes = [
  { path: 'rutax', component: AuxiliarHomeComponent },
  { path: '**' , component: AuxiliarHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }