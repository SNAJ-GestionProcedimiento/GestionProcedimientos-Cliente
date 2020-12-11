import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
/**Modelos */
import { Usuario } from 'src/_models/modelsLogin/usuario.model';
/**Servicios */
import { UsuarioTokenService } from 'src/_services/usuarios/usuario-token.service';
import { UsuarioEditarService } from 'src/_services/usuarios/usuario-editar.service';
import { UsuarioCgContraService } from 'src/_services/usuarios/usuario-cg-contra.service';

@Component({
  selector: 'app-auxiliar-usuario-configuracion',
  templateUrl: './auxiliar-usuario-configuracion.component.html',
  styleUrls: ['./auxiliar-usuario-configuracion.component.css']
})
export class AuxiliarUsuarioConfiguracionComponent implements OnInit {

  /**Varialbes de usuario*/
  public usuario:Usuario;
  public anteriorContra:string;
  public nuevaContra:string;
  /**Formulario Usuario*/
  public usuarioForm:FormGroup;
  /**Formulario Contraseña*/
  public contraForm:FormGroup;

  constructor(
    private usuarioTokenService:UsuarioTokenService,
    private formBuilder:FormBuilder,
    private usuarioEditarService:UsuarioEditarService,
    private usuarioCgContraService:UsuarioCgContraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.buildContraForm();
  }

  public buildUsuarioForm(){
    this.usuarioForm = this.formBuilder.group({
      firstName:[this.usuario.first_name,[Validators.required]],
      lastName:[this.usuario.last_name,[Validators.required]],
      email:[this.usuario.email,[Validators.required,Validators.email]],
    });
    this.usuarioForm.get('firstName').valueChanges.subscribe(value=>{
      this.usuario.first_name = value;
    });
    this.usuarioForm.get('lastName').valueChanges.subscribe(value=>{
      this.usuario.last_name = value;
    });
    this.usuarioForm.get('email').valueChanges.subscribe(value=>{
      this.usuario.email = value;
    });
  }

  public buildContraForm(){
    this.contraForm = this.formBuilder.group({
      oldPassword:['',[Validators.required]],
      newPassword:['',[Validators.required]]
    });
    this.contraForm.get('oldPassword').valueChanges.subscribe(value=>{
      this.anteriorContra = value;
    });
    this.contraForm.get('newPassword').valueChanges.subscribe(value=>{
      this.nuevaContra = value;
    });
  }

  /**Peticiones */
  public async cargarUsuario(){
    try {
      let nombreUsuario = localStorage.getItem('username');
      let res:any = await this.usuarioTokenService.getUser(nombreUsuario).toPromise();
      this.usuario = res;
      this.buildUsuarioForm();
    } catch (error) {
      console.log(error.error);
    }
  }

  public async editarUsuario(){
    try {
      if (this.usuarioForm.valid) {
        let res:any = await this.usuarioEditarService.editUserUser(this.usuario).toPromise();
        swal.fire('¡Genial '+this.usuario.first_name+'!','Los datos han sido actualizados con exito','success');
      }else{
        console.log(this.usuarioForm.get('email').errors);
        swal.fire('¡Lo sentimos '+this.usuario.first_name+'!','Revisa los campos obligatorios','error')  
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  public async editarContra(){
    try {
      if (this.contraForm.valid) {
        let res:any = await this.usuarioCgContraService.changePassUser(this.anteriorContra,this.nuevaContra).toPromise();
        swal.fire('¡Genial '+this.usuario.first_name+'!','La contraseña ha sido cambiada con exito','success');
      }else{
        console.log(this.contraForm.errors);
      }
    } catch (error) {
      swal.fire('¡Lo sentimos '+this.usuario.first_name+'!','La contraseña actual no cioncide','error')
    }
  }
  /**Eventos */
  gestionOnclick(){
    this.router.navigateByUrl('programacion');
  }
}
