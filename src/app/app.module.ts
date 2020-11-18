import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {HTTP_INTERCEPTORS } from '@angular/common/http';
//import {BaseURLInterceptor} from './services/base-url.interceptor';
//import {HttpErrorInterceptor} from './services/http-error.interceptor';

import { AppComponent } from './app.component';
import { AuxiliarHomeComponent } from './components/auxiliar-home/auxiliar-home.component';
import { AuxiliarNavbarComponent } from './components/auxiliar-navbar/auxiliar-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AuxiliarAgendaComponent } from './components/auxiliar-agenda/auxiliar-agenda.component';
import { AuxiliarCrearProgramacionComponent } from './components/auxiliar-crear-programacion/auxiliar-crear-programacion.component';
import { PacienteService } from './../_services/paciente.service';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AcudienteComponent } from './components/acudiente/acudiente.component';
import { AcudienteService } from '../_services/acudiente.service';
import { ProcedimientoComponent } from './components/procedimiento/procedimiento.component';

import { InstrumentosEquiposService } from '../_services/serviciosInstrumentos/instrumentos-equipos.service';
import { EspecilidadRequeridaService }  from '../_services/especilidad-requerida.service';
import { NotificationService } from 'src/_services/notification.service';
import { PacienteAcudienteService } from 'src/_services/serviciosComponentes/paciente-acudiente.service';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';

import { MaterialModule } from './material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuxiliarInstrumentosEquiposComponent } from './components/auxiliar-Equipos/auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { VentanaAuxiliarInstrumentosEquiposComponent } from './components/auxiliar-Equipos/ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { AuxiliarDocumentacionComponent } from './components/auxiliar-documentacion/auxiliar-documentacion.component';
import { AuxiliarMaterialesComponent } from './components/auxiliar-materiales/auxiliar-materiales.component';
import { HoraFechaComponent } from './components/hora-fecha/hora-fecha.component';
import { AgendaInfoComponent } from './components/auxiliar-agenda/agenda-info/agenda-info.component';
import { VentanaAuxiliarDocumentacionComponent } from './components/ventana-auxiliar-documentacion/ventana-auxiliar-documentacion.component';
import { DocumentoService } from '../_services/documentacion.service';
import { VentanaAuxiliarMaterialComponent } from './components/ventana-auxiliar-material/ventana-auxiliar-material.component';
import { EstadoSalaService } from '../_services/estado-sala.service';
import { VentanaEditarInstrumentoEquipoComponent } from './components/auxiliar-Equipos/ventana-editar-instrumento-equipo/ventana-editar-instrumento-equipo.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { AuxiliarEspecialistaComponent } from './components/auxiliar-especialidad/auxiliar-especialista/auxiliar-especialista.component';
import { VentanaAuxiliarEspecialidadComponent } from './components/auxiliar-especialidad/ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';
import { EditarEspecialidadComponent } from './components/auxiliar-especialidad/editar-especialidad/editar-especialidad.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AuxiliarEditarProgramacionComponent } from './components/auxiliar-editar-programacion/auxiliar-editar-programacion.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './login.guard';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { AdminNavbarComponent } from 'src/app/components/admin-navbar/admin-navbar.component';
import { AdminUsuariosComponent } from 'src/app/components/admin-usuarios/admin-usuarios.component';
import { AdminGuard } from './admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    AuxiliarHomeComponent,
    AuxiliarNavbarComponent,
    PacienteComponent,
    AuxiliarAgendaComponent,
    AuxiliarCrearProgramacionComponent,
    AcudienteComponent,
    ProcedimientoComponent,
    AuxiliarInstrumentosEquiposComponent,
    VentanaAuxiliarInstrumentosEquiposComponent,
    AuxiliarEspecialistaComponent,
    VentanaAuxiliarEspecialidadComponent,
    AuxiliarDocumentacionComponent,
    AuxiliarMaterialesComponent,
    HoraFechaComponent,
    AgendaInfoComponent,
    VentanaAuxiliarDocumentacionComponent,
    VentanaAuxiliarMaterialComponent,
    VentanaEditarInstrumentoEquipoComponent,
    EditarEspecialidadComponent,
    ConfirmationDialogComponent,
    AuxiliarEditarProgramacionComponent,
    NotificacionesComponent,
    LoginComponent,
    AdminComponent,
    AdminNavbarComponent,
    AdminUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SidebarModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    PacienteService,         
    AcudienteService,
    InstrumentosEquiposService,
    NotificationService,
    EspecilidadRequeridaService,
    PacienteAcudienteService,
    DocumentoService,
    EstadoSalaService ,
    UtilityServiceService,
    NumeroNotificacionesService,
    LoginGuard,
    AdminGuard
    ],
  bootstrap: [AppComponent],
  entryComponents: [VentanaAuxiliarInstrumentosEquiposComponent, VentanaAuxiliarEspecialidadComponent, VentanaAuxiliarDocumentacionComponent, VentanaAuxiliarMaterialComponent, ConfirmationDialogComponent]
})
export class AppModule { }
