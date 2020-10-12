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
  form : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private pacienteService: PacienteService
    ) {
      this.buildForm();
     }

  ngOnInit(): void {  }

  private buildForm(){
    this.form = this.formBuilder.group({
      documentType:['',[Validators.required]],
      id:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      name:['',[Validators.required]],
      homeAddress:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      observation:['',[Validators.required]]
    });

    this.form.valueChanges
    .pipe(
      debounceTime(700)
    )
    .subscribe(value =>{
      /**Cuando escriba el id del paciente, si existe se actualizan los cambios */
      this.pacienteId = value.id;
      this.setPaciente();
      if(this.paciente!=null){
        this.completeForm();
      }else{
        this.deleteForm();
      }
    });
  }

  private completeForm():void{
    this.form.setControl("name",new FormControl('nombre1',Validators.required));
  }
  private deleteForm():void{
    this.form.setControl("name",new FormControl('',Validators.required))
  }

  async setPaciente(){
    let res = await this.pacienteService.get(this.pacienteId).toPromise();
    this.paciente = Paciente.fromJSON(res);
  }


}
