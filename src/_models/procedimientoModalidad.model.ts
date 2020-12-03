export class ProcedimientoModalidad{
    /**
     * Id del objeto procedimiento modaliad
     */
    public idProcedimientoModalidad:number;
    /**
     * CamaUCI modaliad
     */
    public camaUCI:boolean;
    /**
     * Banco de sangre modaliad
     */
    public bancoSangre:boolean;
    /**
     * Codigo de procedimiento
     */
    public codigoProcedimiento_id:string;
    /**
     * Codigo de modalidad
     */
    public idModalidad_id:number;

    
    
    constructor(idProcedimientoModalidad:number, camaUCI:boolean,bancoSangre:boolean,codigoProcedimiento_id:string,idModalidad_id:number){
        this.idProcedimientoModalidad=idProcedimientoModalidad;
        this.camaUCI=camaUCI;
        this.bancoSangre=bancoSangre;
        this.codigoProcedimiento_id=codigoProcedimiento_id;
        this.idModalidad_id=idModalidad_id;
    }

    public static fromJSON(json):ProcedimientoModalidad{
        if(json==null){return null;}

        var proceMod = new ProcedimientoModalidad(json.idProcedimientoModalidad,json.bancoSangre, json.camaUCI,json.codigoProcedimiento,json.idModalidad);

        return proceMod;
    }
}