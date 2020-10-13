import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formBuilder:FormBuilder,
    private pacienteService: PacienteService
    ) {
      this.buildpacienteForm();
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
      this.pacienteId = value.id;
      this.setPaciente();
      if(this.paciente!=null){
        this.completeForm();
      }
    });

    this.pacienteForm.get("birthdate").valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      this.pacienteForm.controls['age'].setValue(this.getAge(new Date(value)));
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

  private completeForm():void{
    this.pacienteForm.controls['birthday'].setValue(this.paciente.fechaNacimiento);
    this.pacienteForm.controls['name'].setValue('holi');
    this.pacienteForm.controls['homeAddress'].setValue('holi');
    this.pacienteForm.controls['phoneNumber'].setValue('holi');
  }
  private deleteForm():void{
    this.pacienteForm.setControl("name",new FormControl('',Validators.required))
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
  }
}
