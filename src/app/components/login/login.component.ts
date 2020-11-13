import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import jwt_decode from 'jwt-decode';

import { Usuario } from 'src/_models/modelsLogin/usuario.model';

import { AuthService } from 'src/_services/auth.service';
import { UsuarioGrupoService } from 'src/_services/usuarios/usuario-grupo.service';
import { UsuarioCrearService } from 'src/_services/usuarios/usuario-crear.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  public usuario:string;
  public constrasena:string;

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private usuarioCrearService:UsuarioCrearService,
    public usuarioGrupoService:UsuarioGrupoService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.loginForm.get('username').valueChanges
    .subscribe(value =>{
      this.usuario = value;
    })
    this.loginForm.get('password').valueChanges
    .subscribe(value =>{
      this.constrasena = value;
    })
  }

  public async submitLogin(){
    this.submitted = true;
    this.error = null;
    if(this.loginForm.invalid){return; }
    try {
      /**Obtener el token del inicio de sesion */
      let res:any = await this.authService.login(this.usuario,this.constrasena).toPromise();
      /**Obtener el grupo al que pertenece el usuario */
      let userGroup:any = await this.usuarioGrupoService.getGroup(res.token).toPromise();
      console.log(userGroup);
    } catch (error) {
      console.log(error);
    }
  }

}
