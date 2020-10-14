import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Paciente } from 'src/_models/paciente.model';

import { PacienteService } from '../../../_services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  public paciente: Paciente;
  public pacienteId: string;
  public pacienteForm : FormGroup;
  public mayorEdad:boolean;
  @Output() messageEvent =new EventEmitter<boolean>();

  constructor(
    private formBuilder:FormBuilder,
    private pacienteService: PacienteService
    ) {
      this.buildpacienteForm();
     }
  sendMenssage(){
    this.messageEvent.emit(this.mayorEdad);
  }

  ngOnInit(): void {  }

  private buildpacienteForm(){
    this.pacienteForm = this.formBuilder.group({
      documentType:['',[Validators.required]],
      id:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      age:['',[]],
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      homeAddress:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      observation:['',[Validators.required]]
    });

    this.pacienteForm.get("id").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value=>{
      /**Cuando escriba el id del paciente, si existe se actualizan los cambios */
      this.pacienteId = value;
      this.setPaciente();
    });

    this.pacienteForm.get("birthdate").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      this.pacienteForm.controls['age'].setValue(this.getAge(new Date(value)));
    });

    this.pacienteForm.get('birthdate').valueChanges
    .subscribe(value=>{
      if(value<18){
        this.mayorEdad=false;
      }
      if(value>18){
        this.mayorEdad=true;
      }
      this.sendMenssage();
    })
  }

  private getAge(birthdate:Date):number{
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthdate.getFullYear();
    let month = currentDate.getMonth() - birthdate.getMonth();
    if(month < 0 || (month===0 && currentDate.getDate() < birthdate.getDate())){
      age--;
    }
    return age;
  }

  private completeForm(){
    this.pacienteForm.get('documentType').setValue(this.getTipoId(this.paciente.tipoIdentificacion));
    this.pacienteForm.get('name').setValue(this.paciente.nombre);
    this.pacienteForm.get('homeAddress').setValue(this.paciente.direccion);
    this.pacienteForm.get('birthdate').setValue(this.convertDateFormat(this.paciente.fechaNacimiento));
    this.pacienteForm.get('phoneNumber').setValue(this.paciente.telefono);
  }
  private deleteForm():void{
    this.pacienteForm.get('name').setValue('');
    this.pacienteForm.get('homeAddress').setValue('');
    this.pacienteForm.get('birthdate').setValue('');
    this.pacienteForm.get('phoneNumber').setValue('');
  }

  private convertDateFormat(date:Date){
    let oldDate = date;
    let year = oldDate.getFullYear().toString();
    let month = oldDate.getMonth().toString().length<2?'0'+oldDate.getMonth().toString():oldDate.getMonth().toString();
    let day = oldDate.getDate().toString().length<2?'0'+oldDate.getDate().toString():oldDate.getDate().toString();
    let stringDate = year+'-'+month+'-'+day;
    console.log(stringDate);
    return stringDate;
  }
  private getTipoId(tipo:string){
    switch (tipo){
      case 'CC':
        return 1;
      case 'TI':
        return 2;
      default:
        break;
    }
  }
  
  /**Geters formulario */
  get documentTypeField(){
    return this.pacienteForm.get('documentType');
  }
  get idField(){
    return this.pacienteForm.get('id');
  }
  get birthdate(){
    return this.pacienteForm.get('birthdate');
  }
  get emailField(){
    return this.pacienteForm.get('email');
  }
  get nameField(){
    return this.pacienteForm.get('name');
  }
  get homeAddressField(){
    return this.pacienteForm.get('homeAddress');
  }
  get phoneNomberField(){
    return this.pacienteForm.get('phoneNumber');
  }
  get observationField(){
    return this.pacienteForm.get('observation');
  }

  /**Peticiones */
  async setPaciente(){
    let res = await this.pacienteService.get(this.pacienteId).toPromise();
    this.paciente = Paciente.fromJSON(res);
    if (this.paciente != null){
      this.completeForm();
    }else{
      this.deleteForm();
    }
    
  }
}
