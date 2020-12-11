import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';

import { GrupoUsuario } from 'src/_models/grupo.models';
import { Usuario } from 'src/_models/modelsLogin/usuario.model';

import { UsuarioCrearService } from 'src/_services/usuarios/usuario-crear.service';
import { UsuarioIdObtenerService } from 'src/_services/usuarios/usuario-id-obtener.service';
import { UsuarioTokenService } from 'src/_services/usuarios/usuario-token.service';
import { GruposService } from 'src/_services/grupos.service';
import { GroupHelper } from 'src/_helpers/group.helper';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {
  /**Variables del formulario */
  public grupos:Array<GrupoUsuario>;
  public usuarioForm:FormGroup;
  public deshabilitarBoton = true;
  /**Variables de control existencia y coincidencia */
  public existeId:boolean = false;
  public idDisponible:boolean = false;
  public existeNom:boolean = false;
  public nomVacio:boolean = true;
  public contraCoincide:boolean=true;
  /**Variables del modelo*/
  public idUsuario:string;
  public nombreUsuario:string;
  public apellidoUsuario:string;
  public nomUsuario:string;
  public contraUsuario:string;
  public correoUsuario:string;
  public tipoUsuario:string;
  /**Variable de registro */
  public usuario:Usuario;

  constructor(
    private formBuilder:FormBuilder,
    private usuarioCrearService:UsuarioCrearService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public gruposService:GruposService,
    public usuarioIdObtenerService:UsuarioIdObtenerService,
    public usuarioTokenService:UsuarioTokenService
  ) { }

  ngOnInit(): void {
    this.grupos = new Array();
    this.setGruposUsuario();
    this.buildUsuarioForm();
  }

  /**Metodo que crea el formulario */
  private buildUsuarioForm(){
    this.usuarioForm = this.formBuilder.group({
      firstNameUser:['',[Validators.required]],
      lastNameUser:['',[Validators.required]],
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
      valPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      typeUser:['',[Validators.required]],
    })
    this.usuarioForm.get("firstNameUser").valueChanges
    .subscribe(value=>{
      this.nombreUsuario = value;
    });
    this.usuarioForm.get("lastNameUser").valueChanges
    .subscribe(value=>{
      this.apellidoUsuario = value;
    });
    this.usuarioForm.get("userName").valueChanges
    .subscribe(value=>{
      /**TODO:Preguntar si existe usuario con ese username
       * si no
       */
      this.nomUsuario = value;
      if(this.nomUsuario == null){
        this.nomVacio = true;
        this.deshabilitarBoton = true;
      }else{
        this.nomVacio = false;
        this.setUsuarioNom();
      }
    });
    this.usuarioForm.get("password").valueChanges
    .subscribe(value=>{
      this.contraUsuario = value
    });
    this.usuarioForm.get("valPassword").valueChanges
    .pipe(
      debounceTime(700)
      )
    .subscribe(value=>{
      if(value!=this.contraUsuario){
        this.contraCoincide = false;
      }else{
        this.contraCoincide = true;
      }
    });
    this.usuarioForm.get("email").valueChanges
    .subscribe(value=>{
      this.correoUsuario = value;
    });
    this.usuarioForm.get("typeUser").valueChanges
    .subscribe(value=>{
      this.tipoUsuario = value;
    });
  }

  public async setGruposUsuario(){
    let res:any = await this.gruposService.getGrupos().toPromise();
    res.forEach(element => {
      this.grupos.push(new GrupoUsuario(JSON.stringify(element.group_id),GroupHelper.parseGrupoString(element.group_name)));
    });
  }

  public crearUsuario(){
    if(this.usuarioForm.valid){
      /**Se crea el objeto de tipo Usuario */
      this.usuario = new Usuario(
        this.idUsuario='null',
        this.nomUsuario,
        this.contraUsuario,
        this.nombreUsuario,
        this.apellidoUsuario,
        this.correoUsuario,
        [this.tipoUsuario]
      );
      this.registrarUsuario();
    }else{
      /**Marca todos los controles del formulario como tocados */
      let nomControles = Object.keys(this.usuarioForm.controls);
      nomControles.filter(data =>{
        let control = this.usuarioForm.controls[data];
        control.markAsTouched();
      })
    }
  }
  public async setUsuarioNom(){
    try {
      let res:any = await this.usuarioTokenService.getUser(this.nomUsuario).toPromise();
      this.existeNom = true;
      this.deshabilitarBoton = true;
    } catch (error) {
      let er:string = error.error.error;
      if(er.includes('does not exist')){
        this.existeNom =false;
        this.deshabilitarBoton = false;
      }
    }
  }

  public async registrarUsuario(){
    if(this.usuario != null){
      try {
        let res:any = await this.usuarioCrearService.addUser(this.usuario).toPromise();
        swal.fire('¡Exito!','El usuario: '+this.usuario.username+' ha sido creado exitosamente!','success')
        this.matDialog.closeAll(); 
      } catch (error) {
      }
    }else{
      this.deshabilitarBoton = true;
    }
  }

  cerrarVentana(){
    this.matDialog.closeAll();
  }

  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /**Metodos auxiliares de formularios */

}
