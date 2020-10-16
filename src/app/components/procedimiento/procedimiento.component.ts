import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { ProcedimientoService } from '../../../_services/procedimiento.service';

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {

  public busquedaForm:FormGroup;
  public resultadoForm:FormGroup;

  public tipoProcedimiento:string;
  public valorBusqueda:string;
  public procedimiento:Procedimiento;
  public camaUci:boolean;
  public bancoSangre:boolean;
  public codigoProc: number;

  constructor(
    private formBuilder:FormBuilder,
    private procedimientoService:ProcedimientoService
  ) { 
    this.buildbusquedaForm();
    this.buildResultadoForm();
  }

  ngOnInit(): void {
    this.codigoProc=0;
  }

  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      searchId:['',[Validators.required]]
    });
    this.busquedaForm.get('searchType').valueChanges
    .subscribe(value=>{
      console.log(value);
    });
    this.busquedaForm.get('searchId').valueChanges
    .subscribe(value=>{
      this.valorBusqueda = value;
    });
  } 
  private buildResultadoForm(){
    this.resultadoForm = this.formBuilder.group({
      code:['',[]],
      name:['',[]],
      uciBed:['',[]],
      bloodBank:['',[]]
    });
    this.resultadoForm.get('uciBed').valueChanges
    .subscribe(value=>{
      this.camaUci=value;
    });
    this.resultadoForm.get('bloodBank').valueChanges
    .subscribe(value=>{
      this.bancoSangre=value;
    });
  }
  private updateResultadoForm(){
    console.log(this.procedimiento.nombre);
    this.resultadoForm.get('code').setValue(this.procedimiento.codigoProcedimiento);
    this.resultadoForm.get('name').setValue(this.procedimiento.nombre);
  }

  public buscarClick(){
    this.setProcedimiento();
    if(this.procedimiento!=null){
      this.updateResultadoForm();
    }
  }

  public getCodigoProcedimiento(): number{
    this.codigoProc= parseInt(this.procedimiento.codigoProcedimiento)
    console.log("cod: "+this.codigoProc);
    return this.codigoProc;
  }

  /**Peticiones */
  async setProcedimiento(){
    let res;
    if(this.busquedaForm.get('searchType').value==='1'){
      res = await this.procedimientoService.getCodigo(this.valorBusqueda).toPromise();
    }else{
      res = await this.procedimientoService.getNombre(this.valorBusqueda).toPromise();
    }
    this.procedimiento = Procedimiento.fromJSON(res);
  }
}
