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

import { AuxiliarAgendaComponent } from './components/auxiliar-agenda/auxiliar-agenda.component';
import { AuxiliarProgramacionComponent } from './components/auxiliar-programacion/auxiliar-programacion.component';
import { PacienteService } from './../_services/paciente.service';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AcudienteComponent } from './components/acudiente/acudiente.component';
import { AcudienteService } from '../_services/acudiente.service';
import { ProcedimientoComponent } from './components/procedimiento/procedimiento.component';
import { InstrumentosEquiposService } from '../_services/instrumentos-equipos.service';

import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuxiliarInstrumentosEquiposComponent } from './components/auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { VentanaAuxiliarInstrumentosEquiposComponent } from './components/ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { AuxiliarEspecialistaComponent } from './components/auxiliar-especialista/auxiliar-especialista.component';
import { VentanaAuxiliarEspecialidadComponent } from './components/ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';

@NgModule({
  declarations: [
    AppComponent,
    AuxiliarHomeComponent,
    AuxiliarNavbarComponent,
    PacienteComponent,
    AuxiliarAgendaComponent,
    AuxiliarProgramacionComponent,
    AcudienteComponent,
    ProcedimientoComponent,
    AuxiliarInstrumentosEquiposComponent,
    VentanaAuxiliarInstrumentosEquiposComponent,
    AuxiliarEspecialistaComponent,
    VentanaAuxiliarEspecialidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PacienteService,
    AcudienteService,
    InstrumentosEquiposService
  ],
  bootstrap: [AppComponent],
  entryComponents: [VentanaAuxiliarInstrumentosEquiposComponent, VentanaAuxiliarEspecialidadComponent]
})
export class AppModule { }
