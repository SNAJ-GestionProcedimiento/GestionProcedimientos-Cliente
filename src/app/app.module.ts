import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';
import { AuxiliarNavbarComponent } from './components/auxiliar-navbar/auxiliar-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PacienteService } from './../_services/paciente.service';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AuxiliarAgendaComponent } from './components/auxiliar-agenda/auxiliar-agenda.component';
import { AuxiliarProgramacionComponent } from './components/auxiliar-programacion/auxiliar-programacion.component';

@NgModule({
  declarations: [
    AppComponent,
    AuxiliarHomeComponent,
    AuxiliarNavbarComponent,
    PacienteComponent,
    AuxiliarAgendaComponent,
    AuxiliarProgramacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    PacienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
