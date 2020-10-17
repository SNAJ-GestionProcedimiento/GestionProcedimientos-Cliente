import { ProcedimientoModalidad } from './procedimientoModalidad.model';
export class Procedimiento{
    /**
     * Identificador del objeto procedimiento
     */
    public codigoProcedimiento : string;
    /**
     * Nombre del procedimiento
     */
    public nombre : string;
    /**
     * Tipo del procedimiento
     */
    public tipo : string;

    public modalidades:Array<ProcedimientoModalidad>;

    constructor(){  }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Procedimiento{
        if (json==null) { return null;}
        var procedimiento  =new Procedimiento();

        procedimiento.codigoProcedimiento = json.codigoProcedimiento;
        procedimiento.nombre = json.nombre;
        procedimiento.tipo = json.tipo;
        procedimiento.modalidades = new Array<ProcedimientoModalidad>();

        json.modalidadesProc.forEach(element => {
            procedimiento.modalidades.push(ProcedimientoModalidad.fromJSON(element));
        });

        return procedimiento;
    }
}