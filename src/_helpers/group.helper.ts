export class GroupHelper{
    public static parseGrupoUsuario(grupo:string){
        switch(grupo){
            case 'PEND':
                return 'Pendiente';
            case 'CONF':
                return 'Confirmado';
            case 'CANC':
                return 'Cancelado';
            default:
                return '';
        }
    }
}