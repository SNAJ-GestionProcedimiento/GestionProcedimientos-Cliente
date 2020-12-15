import { Component, OnInit } from '@angular/core';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from "@angular/material/dialog";
import { editarEpecialidadesRequeridas, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';
import { PacienteService } from 'src/_services/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/_models/paciente.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.component.html',
  styleUrls: ['./editar-especialidad.component.css']
})
export class EditarEspecialidadComponent implements OnInit {

  paciente: Paciente = new Paciente();
  datosEspecialidad: especialidadesRequeridas;
  especialidadEditable: editarEpecialidadesRequeridas;
  estados: estadoClass[];
  idProcedimiento: number;
  opcionSeleccionado: string;
  verSeleccion = '';
  registroMedico: string;
  identificacionEspecialista: string;
  nombreEspecialista: string;

  listaEstado: estadoClass[] = [];
  EstadoDefautl: estadoClass;
  mensajeError: string = "";

  public especialistaForm: FormGroup;

  constructor(private utilityService: UtilityServiceService,
    private notificationService: notificationService.NotificationService,
    private dialog: MatDialog,
    private serviceEspecialidadRequerida: EspecilidadRequeridaService,
    private pacienteService: PacienteService,
    private formBuilder: FormBuilder,
  ) {
    this.buildespecialistaForm();
  }

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => this.estados = msg);
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    this.utilityService.customEspecialidad.subscribe(msg => {
      this.datosEspecialidad = msg;
      this.convertirEstadoLleda(this.datosEspecialidad);
      this.hacerListaEstados();
      this.opcionSeleccionado=this.EstadoDefautl.valor;
      this.verSeleccion = this.datosEspecialidad.estado;
      this.registroMedico = this.datosEspecialidad.registroMedico;
      this.identificacionEspecialista = this.datosEspecialidad.identificacion;
      this.nombreEspecialista = this.datosEspecialidad.nombreEspecialista;
    });
  }

  /**Metodo que crea el formulario */
  private buildespecialistaForm() {
    this.especialistaForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      registro: ['', [Validators.required]],
    });

    /**Cuando escriba el id del paciente lo busca*/
    this.especialistaForm.get("id").valueChanges
      .pipe(
        debounceTime(700)
      )
      .subscribe(value => {
        this.identificacionEspecialista = value;
        this.setPaciente();
      });
      this.especialistaForm.get("registro").valueChanges
      .subscribe(value => {
        this.registroMedico = value;
      });
  }


  /**Completar el formulario*/
  private completeForm() {
    this.especialistaForm.get('name').setValue(this.nombreEspecialista);
  }
  /**Deshabilita campos del formulario */
  private disableForm() {
    this.especialistaForm.get('name').disable();
  }
  /**Limpiar el formulario*/
  private deleteForm(): void {
    this.especialistaForm.get('name').setValue('');
  }
  /**Deshabilita campos del formulario */
  private enableForm() {
    this.especialistaForm.get('name').enable();
  }

  /**Peticiones */
  async setPaciente() {
    let res = await this.pacienteService.get(this.identificacionEspecialista).toPromise();
    //console.log(JSON.stringify(res));
    this.paciente = Paciente.fromJSON(res);
    if (this.paciente != null){
      //console.log("arreglo desde el if: " + this.paciente.nombre);
      this.nombreEspecialista = this.paciente.nombre;
      //this.registroMedico="123";
      this.completeForm();
      this.disableForm();
    }

  }

  editar() {
    let especialistaEnviar = this.datosEspecialidad;
    especialistaEnviar.registroMedico = this.registroMedico;
    console.log(this.registroMedico);
    especialistaEnviar.identificacion = this.identificacionEspecialista;
    especialistaEnviar.nombreEspecialista = this.nombreEspecialista;
    especialistaEnviar.estado=this.verSeleccion;
    this.especialidadEditable = new editarEpecialidadesRequeridas(especialistaEnviar.id, especialistaEnviar.codigoEspecialidad, especialistaEnviar.nombreEspecialidad, especialistaEnviar.registroMedico, especialistaEnviar.identificacion, especialistaEnviar.nombreEspecialista, especialistaEnviar.estado, this.idProcedimiento);
    this.serviceEspecialidadRequerida.editarEspecialidad(this.especialidadEditable).subscribe(
      res => {
        this.especialidadEditable = res;
        this.notificationService.success('Se edito la especialidad con código: ' + especialistaEnviar.codigoEspecialidad.toString());
        //console.log("cambio");
        this.utilityService.changeEspecialidad(this.datosEspecialidad);
        this.cerrarVentana();
      },
      (errorServicio) => {
        console.log(errorServicio);
        this.mensajeError = JSON.stringify(errorServicio.error.error);
        this.notificationService.success('Error! ' + this.mensajeError);
        //this.convertirEstadoLleda(this.datosEspecialidad);
      }
    );
    //this.utilityService.changeEspecialidad(this.datosEspecialidad);
  }



  cerrarVentana() {
    this.dialog.closeAll();
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion);
  }

  hacerListaEstados() {
    this.listaEstado = [];
    for (let i = 0; i < this.estados.length; i++) {
      if (this.estados[i].contenido != this.datosEspecialidad.estado) {
        //console.log("entro al if de hacer listados con el estado: "+this.estados[i].contenido);
        this.listaEstado.push(this.estados[i]);
      }else{
        this.EstadoDefautl=this.estados[i];
      }
    }
  }

  convertirEstadoSalida(especialistaAcambiar): especialidadesRequeridas {
    for (let j = 0; j < this.estados.length; j++) {
      //console.log("instrment que llego: "+instrumentoAcambiar.estado+" estado: "+this.estados[j].contenido);
      if (especialistaAcambiar.estado == this.estados[j].contenido) {
        //console.log("entro en salida");
        especialistaAcambiar.estado = this.estados[j].valor;
      }
    }
    return especialistaAcambiar;
  }

  convertirEstadoLleda(instrumentoAcambiar) {
    for (let j = 0; j < this.estados.length; j++) {
      if (instrumentoAcambiar.estado == this.estados[j].valor) {
        instrumentoAcambiar.estado = this.estados[j].contenido;
      }
    }
  }

}
