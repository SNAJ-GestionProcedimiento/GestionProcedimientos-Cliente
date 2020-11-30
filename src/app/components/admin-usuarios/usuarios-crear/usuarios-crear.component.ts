import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';

import { GrupoUsuario } from 'src/_models/grupo.models';
import { Usuario } from 'src/_models/modelsLogin/usuario.model';

import { UsuarioCrearService } from 'src/_services/usuarios/usuario-crear.service';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {
  /**Variables del formulario */
  public grupos:Array<GrupoUsuario>;
  public usuarioForm:FormGroup;
  /**Variables de control existencia y coincidencia */
  public existeId:boolean = false;
  public existeNom:boolean = false;
  public contraCoincide:boolean=true;
  /**Variables del modelo*/
  public idUsuario:string;
  public nombreUsuario:string;
  public apellidoUsuario:string;
  public nomUsuario:string;
  public contraUsuario:string;
  public correoUsuario:string;
  public tipoUsuario:string='1';

  constructor(
    private formBuilder:FormBuilder,
    private usuarioCrearService:UsuarioCrearService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.grupos = new Array();
    this.setGruposUsuario();
    this.buildUsuarioForm();
  }

  /**Metodo que crea el formulario */
  private buildUsuarioForm(){
    this.usuarioForm = this.formBuilder.group({
      idUser:['',[Validators.required]],
      firstNameUser:['',[Validators.required]],
      lastNameUser:['',[Validators.required]],
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
      valPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      typeUser:['1',[Validators.required]],
    })
    this.usuarioForm.get("idUser").valueChanges
    .subscribe(value=>{
      /**TODO:Preguntar si existe usuario con ese id
       * si no
       */
      if(value == '1'){
        this.existeId = true;
      }else{
        this.existeId = false;
        this.idUsuario = value;
      }
    });
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
        this.contraCoincide = true;
      }else{
        this.contraCoincide = false;
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

  public setGruposUsuario(){
    //TODO: hacer la peticion de grupos de usuario
    this.grupos.push(new GrupoUsuario('1','Administrador'));
    this.grupos.push(new GrupoUsuario('2','Auxiliar de Programación'));
  }

  public crearUsuario(){
    if(this.usuarioForm.valid){
      /**Se crea el objeto de tipo Usuario */
      let usuario = new Usuario(
        this.idUsuario,
        this.nomUsuario,
        this.contraUsuario,
        this.nombreUsuario,
        this.apellidoUsuario,
        this.correoUsuario,
        [this.tipoUsuario]
      );
        console.log(usuario);
      let res:any = this.usuarioCrearService.addUser(usuario).toPromise();
      console.log(res);
      //Mensaje de creacion con nombre de usuario
      this.openSnackBar('Se ha registrado al usuario',usuario.username);
      this.matDialog.closeAll();
    }else{
      console.log('invalido infeliz')
    }
  }

  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
