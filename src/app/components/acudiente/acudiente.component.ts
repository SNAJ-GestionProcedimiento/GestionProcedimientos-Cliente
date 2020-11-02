import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Acudiente } from 'src/_models/acudiente.model';
import { TipoId } from 'src/_models/tipoId.model';

import { AcudienteService } from '../../../_services/acudiente.service';
import { TipoIdService } from 'src/_services/tipo-id.service'; 
import { PacienteAcudienteService } from 'src/_services/serviciosComponentes/paciente-acudiente.service';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';

import { DateHelper } from 'src/_helpers/date.helper';
import { GenderHelper } from 'src/_helpers/gender.helper';

@Component({
  selector: 'app-acudiente',
  templateUrl: './acudiente.component.html',
  styleUrls: ['./acudiente.component.css']
})
export class AcudienteComponent implements OnInit {

  public tiposIdentidicacion:Array<TipoId>;

  public acudiente:Acudiente = new Acudiente();
  public acudienteId:string;
  public pacienteId:string;
  public fecNacMaxima:string;

  public acuMenor:boolean=false;
  public acuPaciente:boolean=false;

  public acudienteForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private acudienteService: AcudienteService,
    private tipoIdService: TipoIdService,
    private pacienteAcudienteService:PacienteAcudienteService,
    private editarComponentesService:EditarComponentesService
    ) { 
    this.buildacudienteForm();
  }

  ngOnInit(): void {
    this.setTiposID();
    this.pacienteAcudienteService.idPaciente.subscribe(value=> this.pacienteId = value);
    this.editarComponentesService.idAcudiente.subscribe(value => {
      if(value!=''){
        this.acudienteId=value;
        this.acudienteForm.get('id').setValue(this.acudienteId);
      }
    });
    this.fecNacMaxima = DateHelper.dateToStr(DateHelper.getMaxDate(new Date()));
  }

  public getObjAcudiente(){
    return this.acudiente;
  }

  private buildacudienteForm(){
    this.acudienteForm = this.formBuilder.group({
      documentType:['',[Validators.required]],
      id:['',[Validators.required]],
      age:['',[]],
      birthdate:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      homeAddress:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      gender:['',[Validators.required]],
    });

    /**Cuando escriba el id del acudiente lo busca*/
    this.acudienteForm.get("id").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value=>{
      this.acudienteId=value;
      this.cambiarIdAcudiente();
      if(this.pacienteId != this.acudienteId){
        this.acuPaciente = false;
        this.setAcudiente();
      }else{
        this.acuPaciente = true;
        this.acudiente = null;
        this.deleteForm();
      }
    });
    this.acudienteForm.get("documentType").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.tipoIdentificacion = value;
      }
    });
    this.acudienteForm.get("birthdate").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      this.acudienteForm.controls['age'].setValue(DateHelper.getAge(new Date(value)));
      if(this.acudiente!=null){
        this.acudiente.fechaNacimiento = value;
      }
    });
    this.acudienteForm.get("email").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.correo = value;
      }
    });
    this.acudienteForm.get("name").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.nombre = value;
      }
    });
    this.acudienteForm.get("homeAddress").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.direccion = value;
      }
    });
    this.acudienteForm.get("phoneNumber").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.telefono = value;
      }
    });
    this.acudienteForm.get("gender").valueChanges
    .subscribe(value =>{
      if(this.acudiente!=null){
        this.acudiente.genero = value;
      }
    });
  }
  /**Completar el formulario*/
  private completeForm(){
    this.acudienteForm.get('documentType').setValue(this.acudiente.tipoIdentificacion);
    this.acudienteForm.get('name').setValue(this.acudiente.nombre);
    this.acudienteForm.get('homeAddress').setValue(this.acudiente.direccion);
    this.acudienteForm.get('birthdate').setValue(this.acudiente.fechaNacimiento);
    this.acudienteForm.get('phoneNumber').setValue(this.acudiente.telefono);
    this.acudienteForm.get('gender').setValue(GenderHelper.genderValue(this.acudiente.genero));
    this.acudienteForm.get('email').setValue(this.acudiente.correo);
  }
  /**Deshabilita campos del formulario */
  private disableForm(){
    this.acudienteForm.get('documentType').disable();
    this.acudienteForm.get('name').disable();
    this.acudienteForm.get('birthdate').disable();
    this.acudienteForm.get('gender').disable();
  }
  /**Limpiar el formulario*/
  private deleteForm():void{
    this.acudienteForm.get('documentType').setValue('');
    this.acudienteForm.get('name').setValue('');
    this.acudienteForm.get('homeAddress').setValue('');
    this.acudienteForm.get('birthdate').setValue('');
    this.acudienteForm.get('phoneNumber').setValue('');
    this.acudienteForm.get('age').setValue('');
    this.acudienteForm.get('gender').setValue('');
    this.acudienteForm.get('email').setValue('');
  }
  /**Deshabilita campos del formulario */
  private enableForm(){
    this.acudienteForm.get('documentType').enable();
    this.acudienteForm.get('name').enable();
    this.acudienteForm.get('birthdate').enable();
    this.acudienteForm.get('gender').enable();
    this.acudienteForm.get('email').enable();
  }

  /**Peticiones */
  async setAcudiente(){
    let res = await this.acudienteService.get(this.acudienteId).toPromise();
    this.acudiente = Acudiente.fromJSON(res);
    if (this.acudiente != null){
      if(this.acudienteId == this.acudiente.identificacion){
        let edad = DateHelper.getAge(new Date(this.acudiente.fechaNacimiento));
        if(edad > 18){
          this.completeForm();
          this.disableForm();
          this.acuMenor=false;
        }else{
          this.acuMenor=true;
          this.acudiente=null;
          this.deleteForm();
        }
      }
      else{
        this.deleteForm();
        this.acudiente = new Acudiente();
        this.acudiente.identificacion = this.acudienteId;
        this.enableForm();
      }
    }
  }

  //Carga los tipos de datos 
  async setTiposID(){
    let res = await this.tipoIdService.get().toPromise();
    this.tiposIdentidicacion = TipoId.fromJSON(res);
  }

  public cambiarIdAcudiente(){
    this.pacienteAcudienteService.cambiarIdAcudiente(this.acudienteId);
  }

}
