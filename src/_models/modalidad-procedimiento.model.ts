import { Procedimiento } from './procedimiento.model';

export class ModalidadProcedimiento{
    /**
     * Identificador del objeto modalidad
     */
    idModalidad:string;
    /**
     * Nombre de la modalidad
     */
    nombre:string;

    constructor(){}

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):ModalidadProcedimiento{
        if(json==null){ return null}
        var modalidad = new ModalidadProcedimiento;

        modalidad.idModalidad = json.idModalidad;
        modalidad.nombre = json.nombre;

        return modalidad;
    }
}