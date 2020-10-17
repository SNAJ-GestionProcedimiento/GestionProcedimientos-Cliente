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

    public static fromJSON(json):ProcedimientoModalidad{
        if(json==null){return null;}

        var proceMod = new ProcedimientoModalidad();

        proceMod.idProcedimientoModalidad = json.idProcedimientoModalidad;
        proceMod.bancoSangre = json.bancoSangre;
        proceMod.camaUCI = json.camaUCI;
        proceMod.codigoProcedimiento_id = json.codigoProcedimiento;
        proceMod.idModalidad_id = json.idModalidad;

        return proceMod;
    }
}