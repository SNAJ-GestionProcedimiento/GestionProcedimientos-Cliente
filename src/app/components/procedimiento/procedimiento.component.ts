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
  keyword = 'name';
  data :any;

  public busquedaForm:FormGroup;
  public valorBusqueda:string;

  public procedimiento:Procedimiento;
  public procedimientos:Array<Procedimiento>;

  constructor(
    private formBuilder:FormBuilder,
    private procedimientoService:ProcedimientoService
  ) { 
    this.buildbusquedaForm();
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      code:['',[]],
      name:['',[]],
      uciBed:['',[]],
      bloodBank:['',[]]
    });
  } 

  private updateBusquedaForm(){
    this.busquedaForm.get('code').setValue(this.procedimiento.codigoProcedimiento);
    this.busquedaForm.get('name').setValue(this.procedimiento.nombre);
  }
  selectEvent(item) {
    console.log(item);
  }
  onChangeSearch($event){
    this.valorBusqueda = $event;
    console.log(this.valorBusqueda);
  }

  public buscarClick(){
    this.setProcedimiento();
    if(this.procedimiento!=null){
      this.updateBusquedaForm();
    }
  }

  /**Peticiones */
  async setProcedimiento(){
    if(this.busquedaForm.get('searchType').value==='1'){
      let res:any = await this.procedimientoService.getCodigo(this.valorBusqueda).toPromise();
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
    }
    console.log(this.procedimiento);
    console.log(this.procedimientos);
  }
}
