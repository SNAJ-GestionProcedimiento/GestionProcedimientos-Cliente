export class ProcedimientoAgenda{
    /**
    * Fecha procedimiento
    */
    public fechaProc:string;
    /**
    * Hora procedimiento
    */
    public horaProc:string;
    /**
    * Codigo procedimiento
    */
    public codigoProc:string;
    /**
    * Nombre procedimiento
    */
    public nombreProc:string;
    /**
    * Tipo Procedimiento
    */
    public tipoProc:string;
    /**
    * Nombre paciente
    */
    public nombrePac:string;
    /**
    * Tipo id paciente
    */
    public tipoIdPac:string;
    /**
    * id Paciente
    */
    public idPac:string;
    /**
    * Edad paciente
    */
    public edadPac:string;

    constructor(fechaProc:string ,horaProc:string ,codigoProc:string ,nombreProc:string ,tipoProc:string ,nombrePac:string ,tipoIdPac:string ,idPac:string ,edadPac:string ){
        this.fechaProc = fechaProc;
        this.horaProc = horaProc;
        this.codigoProc = codigoProc;
        this.nombreProc = nombreProc;
        this.tipoProc = tipoProc;
        this.nombrePac = nombrePac;
        this.tipoIdPac = tipoIdPac;
        this.idPac = idPac;
        this.edadPac = edadPac;
    }
}