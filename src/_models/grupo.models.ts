export class GrupoUsuario{
    /**
     * clave de grupo de usuario
     */
    public idGrupo:string;
    /**
     * nombre de grupo de usuario
     */
    public nombreGrupo:string;

    constructor(claveGrupo:string,nombreGrupo:string){
        this.idGrupo = claveGrupo;
        this.nombreGrupo = nombreGrupo;
    }

    public static fromJSON(json):Array<GrupoUsuario>{
        if(json.tiposID.length == 0){return null;}
        var colGrupos = new Array<GrupoUsuario>();
        
        json.tiposID.forEach(element => {
            var grupo = new GrupoUsuario(element[0],element[1]);
            colGrupos.push(grupo);
        });

        return colGrupos;
    }
}