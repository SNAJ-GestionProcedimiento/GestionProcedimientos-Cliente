export class StateHelper{
    public static parseEstadoAgenda(estado:string){
        switch(estado){
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
    public static parseEstado(estado:string){
        switch(estado){
            case 'PEND':
                return 'Pendiente';
            case 'AGEN':
                return 'Agendado';
            default:
                return '';
        }
    }
    public static parseRequerido(estado:boolean){
        switch (estado){
            case true:
                return 'Requerido';
            case false:
                return 'No Requerido';
            default:
                return '';
        }
    }
}