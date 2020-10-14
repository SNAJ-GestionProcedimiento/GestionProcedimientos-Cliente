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

    constructor(){  }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Procedimiento{
        if (json==null) { return null;}
        var procedimiento  =new Procedimiento();

        procedimiento.codigoProcedimiento = json.procedimiento.codigoProcedimiento;
        procedimiento.nombre = json.procedimiento.nombre;
        procedimiento.tipo = json.procedimiento.tipo;

        return procedimiento;
    }
}