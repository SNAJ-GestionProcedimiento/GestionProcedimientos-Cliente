import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Paciente } from 'src/_models/paciente.model';
import { TipoId } from 'src/_models/tipoId.model';

import { PacienteService } from 'src/_services/paciente.service';
import { TipoIdService } from 'src/_services/tipo-id.service';
import { PacienteAcudienteService } from 'src/_services/serviciosComponentes/paciente-acudiente.service';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';

import { DateHelper } from 'src/_helpers/date.helper';
import { GenderHelper } from 'src/_helpers/gender.helper';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  @Output() messageEvent =new EventEmitter<boolean>();

  public tiposIdentidicacion:Array<TipoId>;

  public paciente: Paciente = new Paciente();
  public pacienteId:string;
  public idAcudiente:string;
  public observacionPaciente:string;

  public pacAcudiente:boolean=false;

  public pacienteForm : FormGroup;
  

  constructor(
    private formBuilder:FormBuilder,
    private pacienteService: PacienteService,
    private tipoIdService: TipoIdService,
    private pacienteAcudienteService:PacienteAcudienteService,
    private editarComponentesService:EditarComponentesService
    ) {
      this.buildpacienteForm();
  }

  ngOnInit(): void {  
    this.setTiposID();
    this.pacienteAcudienteService.idAcudiente.subscribe(value=> this.idAcudiente = value);
    this.editarComponentesService.idPaciente.subscribe(value=>{
      if(value!=''){
        this.pacienteId=value;
        this.pacienteForm.get('id').setValue(this.pacienteId);
        this.pacienteForm.get('id').disable();
      }
    });
    this.editarComponentesService.observacion.subscribe(value => {
      if(value!=''){
        this.observacionPaciente=value;
        this.pacienteForm.get('observation').setValue(this.observacionPaciente);
      }
    })
  }
  /** Gets */
  public getObjPaciente(){
    return this.paciente;
  }
  public getObservacion(){
    return this.observacionPaciente;
  }

  /**Metodo que crea el formulario */
  private  buildpacienteForm(){
    this.pacienteForm = this.formBuilder.group({
      documentType:['',[Validators.required]],
      id:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      age:['',[]],
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      homeAddress:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      gender:['',[Validators.required]],
      observation:['',[Validators.required]]
    });

    /**Cuando escriba el id del paciente lo busca*/
    this.pacienteForm.get("id").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value=>{
      this.pacienteId=value;
      this.cambiarIdPaciente();
      if(this.idAcudiente!=this.pacienteId){
        this.pacAcudiente = false;
        this.setPaciente();
      }else{
        this.pacAcudiente = true;
        this.paciente=null;
      }
    });
    this.pacienteForm.get("documentType").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.tipoIdentificacion = value;
      }
    });
    this.pacienteForm.get("birthdate").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      this.pacienteForm.controls['age'].setValue(DateHelper.getAge(new Date(value)));
      if(this.paciente!=null){
        this.paciente.fechaNacimiento = value;
      }
    });
    this.pacienteForm.get("email").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.correo = value;
      }
    });
    this.pacienteForm.get("name").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.nombre = value;
      }
    });
    this.pacienteForm.get("homeAddress").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.direccion = value;
      }
    });
    this.pacienteForm.get("phoneNumber").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.telefono = value;
      }
    });
    this.pacienteForm.get("gender").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.paciente.genero = value;
      }
    });
    this.pacienteForm.get("observation").valueChanges
    .subscribe(value =>{
      if(this.paciente!=null){
        this.observacionPaciente=value;
      }
    });
  }

  /**Completar el formulario*/
  private completeForm(){
    this.pacienteForm.get('documentType').setValue(this.paciente.tipoIdentificacion);
    this.pacienteForm.get('name').setValue(this.paciente.nombre);
    this.pacienteForm.get('homeAddress').setValue(this.paciente.direccion);
    this.pacienteForm.get('birthdate').setValue(this.paciente.fechaNacimiento);
    this.pacienteForm.get('phoneNumber').setValue(this.paciente.telefono);
    this.pacienteForm.get('gender').setValue(GenderHelper.genderValue(this.paciente.genero));
    this.pacienteForm.get('email').setValue(this.paciente.correo);
  }
  /**Deshabilita campos del formulario */
  private disableForm(){
    this.pacienteForm.get('documentType').disable();
    this.pacienteForm.get('name').disable();
    this.pacienteForm.get('birthdate').disable();
    this.pacienteForm.get('gender').disable();
  }
  /**Limpiar el formulario*/
  private deleteForm():void{
    this.pacienteForm.get('documentType').setValue('');
    this.pacienteForm.get('name').setValue('');
    this.pacienteForm.get('homeAddress').setValue('');
    this.pacienteForm.get('birthdate').setValue('');
    this.pacienteForm.get('phoneNumber').setValue('');
    this.pacienteForm.get('age').setValue('');
    this.pacienteForm.get('gender').setValue('');
    this.pacienteForm.get('email').setValue('');
  }
  /**Deshabilita campos del formulario */
  private enableForm(){
    this.pacienteForm.get('documentType').enable();
    this.pacienteForm.get('name').enable();
    this.pacienteForm.get('birthdate').enable();
    this.pacienteForm.get('gender').enable();
    this.pacienteForm.get('email').enable();
  }

  /**Peticiones */
  async setPaciente(){
    let res = await this.pacienteService.get(this.pacienteId).toPromise();
    this.paciente = Paciente.fromJSON(res);
    if (this.paciente != null){
      if(this.pacienteId == this.paciente.identificacion){
        this.completeForm();
        this.disableForm();
      }else{
        this.deleteForm();
        this.paciente = new Paciente();
        this.paciente.identificacion = this.pacienteId;
        this.enableForm();
      }
    }
  }

  async setTiposID(){
    let res = await this.tipoIdService.get().toPromise();
    this.tiposIdentidicacion = TipoId.fromJSON(res);
  }

  /**Envios */

  public cambiarIdPaciente(){
    this.pacienteAcudienteService.cambiarIdPaciente(this.pacienteId);
  }
}
