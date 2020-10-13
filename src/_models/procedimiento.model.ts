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

    public static fromJSON(json):JSON{
        if (json.procedimientos.length == 0) { return null;}
        var procedimiento  =new Procedimiento();
    }
}