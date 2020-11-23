import { DateHelper } from 'src/_helpers/date.helper';

//Modelo que llega de listar agendas
export class ProcedimientoAgenda{
    /**
     * Id de agenda procedimiento
     */
    public idAgendaProcedimiento:string;
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
    /**
     * Identificacion acudiente
     */
    public idAcu:string
    /**
     * Observacion del paciente en la agenda
     */
    public observacion:string

    constructor(){ }

    public static fromJSON(json){
        if(json==null){return null;}
        var procedimientoAgenda = new ProcedimientoAgenda();

        procedimientoAgenda.idAgendaProcedimiento = json.idAgendaProcedimiento;
        procedimientoAgenda.fechaProc = DateHelper.getFecha(json.fechaHora);
        procedimientoAgenda.horaProc = DateHelper.getHora(json.fechaHora);
        procedimientoAgenda.codigoProc = json.codigoProcedimiento;
        procedimientoAgenda.nombreProc = json.nombreProcedimiento;
        procedimientoAgenda.tipoProc = json.tipoProcedimiento;
        procedimientoAgenda.nombrePac = json.nombrePac;
        procedimientoAgenda.tipoIdPac = json.tipoIdentificacionPac;
        procedimientoAgenda.idPac = json.identificacionPac;     
        procedimientoAgenda.edadPac = DateHelper.getAge(new Date(json.fechaNacPac)).toString();
        procedimientoAgenda.idAcu = json.identificacionAcu;
        procedimientoAgenda.observacion = json.observacion;


        return procedimientoAgenda;
    }
}