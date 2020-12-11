import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupHelper } from 'src/_helpers/group.helper';

import { GrupoUsuario } from 'src/_models/grupo.models';
import { Usuario } from 'src/_models/modelsLogin/usuario.model';

import { GruposService } from 'src/_services/grupos.service';
import { UsuarioIdObtenerService } from 'src/_services/usuarios/usuario-id-obtener.service';
import { UsuarioTokenService } from 'src/_services/usuarios/usuario-token.service';
import { UsuarioEditarService } from 'src/_services/usuarios/usuario-editar.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {
  /**Variable de usuario*/
  public static elemento:Usuario;
  public usuario:Usuario;
  /**Variables del formulario */
  public grupos:Array<GrupoUsuario>;
  public usuarioEditarForm:FormGroup;
  /**Variables de control */
  public existeNom:boolean=false;
  public nomVacio:boolean=false;

  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public gruposService:GruposService,
    public usuarioIdObtenerService:UsuarioIdObtenerService,
    public usuarioTokenService:UsuarioTokenService,
    public usuarioEditarService:UsuarioEditarService
    ) { }

  ngOnInit(): void {
    if(UsuariosEditarComponent.elemento!=null){
      this.usuario = UsuariosEditarComponent.elemento;
      this.usuario.groups[0] = GroupHelper.parseGrupoStrNum(this.usuario.groups[0]);
      this.grupos = new Array();
      this.setGruposUsuario();
      this.buildUsuarioForm();
      this.completarFormulario();
    }
  }

  public editarOnclick(){
    this.matDialog.open(ConfirmationDialogComponent,{
      data:`¿Está seguro de guardar los cambios?`
    }).afterClosed()
    .subscribe((confirmado:Boolean)=>{
      if(confirmado){
        this.editarUsuario();
      }
    })
  }

  /**Metodo que crea el formulario */
  private buildUsuarioForm(){
    this.usuarioEditarForm = this.formBuilder.group({
      firstNameUser:['',[Validators.required]],
      lastNameUser:['',[Validators.required]],
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      typeUser:['',[Validators.required]],
    })
    this.usuarioEditarForm.get('firstNameUser').valueChanges
    .subscribe(value => {
      this.usuario.first_name = value;
    });
    this.usuarioEditarForm.get('lastNameUser').valueChanges
    .subscribe(value => {
      this.usuario.last_name = value;
    });
    this.usuarioEditarForm.get('userName').valueChanges
    .subscribe(value => {
      this.usuario.username = value;
    });
    this.usuarioEditarForm.get('email').valueChanges
    .subscribe(value => {
      this.usuario.email = value;
    });
    this.usuarioEditarForm.get('typeUser').valueChanges
    .subscribe(value => {
      this.usuario.groups[0] = value;
    });
  }

  public completarFormulario(){
    if(this.usuario != null){
      this.usuarioEditarForm.get('firstNameUser').setValue(this.usuario.first_name);
      this.usuarioEditarForm.get('lastNameUser').setValue(this.usuario.last_name);
      this.usuarioEditarForm.get('userName').setValue(this.usuario.username);
      this.usuarioEditarForm.get('email').setValue(this.usuario.email);
      this.usuarioEditarForm.get('typeUser').setValue(this.usuario.groups[0]);
    }
  }

  public async setGruposUsuario(){
    let res:any = await this.gruposService.getGrupos().toPromise();
    res.forEach(element => {
      this.grupos.push(new GrupoUsuario(JSON.stringify(element.group_id),GroupHelper.parseGrupoString(element.group_name)));
    });
  }

  /**Peticiones */
  public async editarUsuario(){
    try {
      let res:any = await this.usuarioEditarService.editUserAdmin(this.usuario).toPromise();
      this.openSnackBar('Se ha editado correctamente al usuario',this.usuario.id);
      this.matDialog.closeAll();
    } catch (error) {
      this.openSnackBar('Proceso de edición','faliida');
    }
  }
  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
