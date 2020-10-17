import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Procedimiento } from 'src/_models/procedimiento.model';
import { EstadoCama } from 'src/_models/estado-cama.model';

import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { EstadoCamaService } from 'src/_services/estado-cama.service';



@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {
  keyword = 'name';
  data:Array<any>;

  public busquedaForm:FormGroup;
  public valorBusqueda:string;
  public estadosCama:Array<EstadoCama>;

  public procedimiento:Procedimiento;
  public codigoProc: string;
  public estadoCama:string;
  public procedimientos:Array<Procedimiento>;

  constructor(
    private formBuilder:FormBuilder,
    private procedimientoService:ProcedimientoService,
    private estadoCamaService:EstadoCamaService
  ) { 
    this.buildbusquedaForm();
  }

  ngOnInit(): void {
    this.setEstadosCama();
    this.estadoCama = this.busquedaForm.get('stateBed').value;
  }

  public getObjProcedimientoModalidad(){
    return this.procedimiento.modalidades[0];
  }
  public getestadoCama(){
    return this.estadoCama;
  }

  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      code:['',[]],
      name:['',[]],
      uciBed:['',[]],
      bloodBank:['',[]],
      stateBed:['PEND',[]]
    });
    this.busquedaForm.get('uciBed').valueChanges
    .subscribe(value=>{
      if(this.procedimiento!=null && this.procedimiento.modalidades.length>0){
        this.procedimiento.modalidades[0].camaUCI = value;
      }
    });
    this.busquedaForm.get('bloodBank').valueChanges
    .subscribe(value=>{
      if(this.procedimiento!=null && this.procedimiento.modalidades.length>0){
        this.procedimiento.modalidades[0].bancoSangre = value;
      }
    });
    this.busquedaForm.get('stateBed').valueChanges
    .subscribe(value=>{
      this.estadoCama=value;
    });
  } 

  private updateBusquedaForm(){
    this.busquedaForm.get('code').setValue(this.procedimiento.codigoProcedimiento);
    this.busquedaForm.get('name').setValue(this.procedimiento.nombre);
    if(this.procedimiento.modalidades.length>0){
      this.busquedaForm.get('uciBed').setValue(this.procedimiento.modalidades[0].camaUCI);
      this.busquedaForm.get('bloodBank').setValue(this.procedimiento.modalidades[0].bancoSangre);
    }else{
      this.busquedaForm.get('uciBed').setValue(false);
      this.busquedaForm.get('bloodBank').setValue(false);
    }
  }
  selectEvent(item) {
    this.valorBusqueda = item.id;
  }
  onChangeSearch($event){
    if(this.busquedaForm.get('searchType').value=='2'){
      this.valorBusqueda = $event;
      if(this.busquedaForm.get('searchType').value=='2'){
        this.setProcedimiento();
      }
    }
    this.valorBusqueda = $event;
  }

  public buscarClick(){
    this.busquedaForm.get('searchType').setValue('1');
    this.setProcedimiento();
    if(this.procedimiento!=null){
      this.updateBusquedaForm();
    }
  }

  public getCodigoProcedimiento(){
    if(this.procedimiento!=null){
      return this.procedimiento.codigoProcedimiento;
    }else{
      return "";
    }
  }
  
  cargarNombres(){
    this.data = new Array();
    this.procedimientos.forEach(procedimiento =>{
      this.data.push({id:procedimiento.codigoProcedimiento,name:procedimiento.nombre});
    });
  }

  /**Peticiones */
  async setProcedimiento(){
    if(this.busquedaForm.get('searchType').value==='1'){
      let res:any = await this.procedimientoService.getCodigo(this.valorBusqueda).toPromise();
      console.log(res);
      this.procedimiento = Procedimiento.fromJSON(res.procedimiento);
      this.procedimientos=new Array<Procedimiento>();
    }else{
      let res:any = await this.procedimientoService.getNombre(this.valorBusqueda).toPromise();
      this.procedimientos = new Array<Procedimiento>();
      res.procedimientos.forEach(procedimiento => {
        this.procedimientos.push(procedimiento);
      });
      this.procedimiento = null;
      this.data = this.procedimientos;
      if(this.procedimientos.length > 0){
        this.cargarNombres();
      }
    }
  }

  async setEstadosCama(){
    let res:any = await this.estadoCamaService.get().toPromise();
    this.estadosCama = EstadoCama.fromJSON(res);
  }
}
