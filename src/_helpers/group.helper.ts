export class GroupHelper{
    public static parseGrupoString(grupo:string){
        switch(grupo){
            case 'Admin':
                return 'Administrador';
            case 'Auxiliar de Programación':
                return 'Auxiliar de Programación';
            default:
                return '';
        }
    }
    public static parseGrupoNumber(grupo:number){
        switch(grupo){
            case 1:
                return 'Administrador';
            case 2:
                return 'Auxiliar de Programación';
            default:
                return '';
        }
    }
    public static parseGrupoStrNum(nomGrupo:string){
        switch(nomGrupo){
            case 'Administrador':
                return '1';
            case 'Auxiliar de Programación':
                return '2';
            default:
                return '0';
        }
    }


    public static obtenerGruposStr(grupos:Array<number>){
        if(grupos==null){return new Array<string>();}
        let gruposString = new Array<string>();
        grupos.forEach(element => {
            gruposString.push(GroupHelper.parseGrupoNumber(element));
        });
        return gruposString;
    }

    public static obtenerGruposId(grupos:Array<string>){
        if(grupos==null){return new Array<string>();}
        let gruposString = new Array<string>();
        grupos.forEach(element => {
            gruposString.push(GroupHelper.parseGrupoStrNum(element));
        });
        return gruposString;
    }
}