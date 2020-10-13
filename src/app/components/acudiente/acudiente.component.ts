import { Component, OnInit } from '@angular/core';
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

  public acudienteForm : FormGroup;
  public acudiente:Acudiente;
  public acudienteId:string;

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
      id:['',[Validators.required]],
      name:['',[Validators.required]],
      homeAddress:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
    });

    this.acudienteForm.get('id').valueChanges
    .pipe(
      debounceTime(600)
    )
    .subscribe(value=>{
      /**Cuando escriba el id del acudiente, si existe se actualizan los cambios */
      this.acudienteId = value.id;
      this.setAcudiente();
      if(this.acudiente!=null){
        this.completeForm();
      }else{
        this.deleteForm();
      }
    });
  }
  private completeForm():void{
    this.acudienteForm.controls['phoneNumber'].setValue('holi');
  }
  private deleteForm():void{
    this.acudienteForm.setControl("name",new FormControl('',Validators.required))
  }

  async setAcudiente(){
    let res = await this.acudienteService.get(this.acudienteId).toPromise();
    this.acudiente = Acudiente.fromJSON(res);
    console.log(this.acudiente);
  }

}
