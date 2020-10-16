import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Acudiente } from 'src/_models/acudiente.model';

import { AcudienteService } from '../../../_services/acudiente.service';  

@Component({
  selector: 'app-acudiente',
  templateUrl: './acudiente.component.html',
  styleUrls: ['./acudiente.component.css']
})
export class AcudienteComponent implements OnInit {
  public acudiente:Acudiente;
  public acudienteId:string;
  public acudienteForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private acudienteService: AcudienteService
    ) { 
    this.buildacudienteForm();
  }

  ngOnInit(): void {
  }

  private buildacudienteForm(){
    this.acudienteForm = this.formBuilder.group({
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

    this.acudienteForm.get("id").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value=>{
      /**Cuando escriba el id del acudiente, si existe se actualizan los cambios */
      this.acudienteId = value;
      this.setAcudiente();
    });
    this.acudienteForm.get("birthdate").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      this.acudienteForm.controls['age'].setValue(this.getAge(new Date(value)));
    });
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
    this.acudienteForm.get('birthdate').setValue(this.convertDateFormat(this.acudiente.fechaNacimiento));
    this.acudienteForm.get('phoneNumber').setValue(this.acudiente.telefono);
    this.acudienteForm.get('name').setValue(this.acudiente.nombre);
    this.acudienteForm.get('homeAddress').setValue(this.acudiente.direccion);
    this.acudienteForm.get('gender').setValue(this.getTipoGenero(this.acudiente.genero));
    this.acudienteForm.get('documentType').setValue(this.getTipoId(this.acudiente.tipoIdentificacion));
  }
  private deleteForm():void{
    this.acudienteForm.get('name').setValue('');
    this.acudienteForm.get('homeAddress').setValue('');
    this.acudienteForm.get('birthdate').setValue('');
    this.acudienteForm.get('phoneNumber').setValue('');
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
  private getTipoGenero(tipo:string){
    switch (tipo){
      case 'masculino':
        return 1;
      case 'femenino':
          return 2;
    }
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

  async setAcudiente(){
    let res = await this.acudienteService.get(this.acudienteId).toPromise();
    this.acudiente = Acudiente.fromJSON(res);
    console.log(this.acudiente);
  }

}
