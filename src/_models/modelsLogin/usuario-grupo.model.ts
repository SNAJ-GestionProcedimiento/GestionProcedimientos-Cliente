import { UsuarioCrearService } from 'src/_services/usuarios/usuario-crear.service';

export class UsuarioGrupo{
    nombreUsuario:string;
    idGrupo:string;
    nombreGrupo:string;

    constructor(){    }

    public static fromJSON(json):UsuarioGrupo{
        if(json==null){return null;}
        var grupo:UsuarioGrupo = new UsuarioGrupo();

        grupo.nombreUsuario = json.username;
        grupo.idGrupo = json.group_id;
        grupo.nombreGrupo = json.group_name;

        return grupo;
    }
}