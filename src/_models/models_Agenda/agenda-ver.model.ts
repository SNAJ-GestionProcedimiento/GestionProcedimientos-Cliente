import { DateHelper } from 'src/_helpers/date.helper';
import { StateHelper } from 'src/_helpers/state.helper';

export class AgendaVer{
    public idAgenda:number;
    public idPac:string;
    public idAcu:string;
    public idProc:string;
    public nombreProc:string;
    public tipoProc:string;
    public observacion:string;
    public idSala:string;
    public estadoSala:string;
    public nombreSala:string;
    public bancoSangre:string;
    public camaUci:string;
    public estadoCama:string;
    public fecha:string;
    public hora:string;
    public estadoFecha:string;

    public static fromJSON(json):AgendaVer{
        if(json==null){return null;}
        var agendaVer = new AgendaVer();

        agendaVer.idAgenda = json.idAgendaProcedimiento;
        agendaVer.idPac = json.identificacionPac;
        agendaVer.idAcu = json.identificacionAcu;
        agendaVer.idProc = json.codigoProcedimiento;
        agendaVer.nombreProc = json.nombreProcedimiento;
        agendaVer.tipoProc = json.tipoProcedimiento;
        agendaVer.observacion = json.observacion;
        agendaVer.idSala = json.idSala;
        agendaVer.estadoSala = StateHelper.parseEstado(json.estadoSala);
        agendaVer.nombreSala = json.nombreSala;
        agendaVer.bancoSangre = StateHelper.parseRequerido(json.bancoSangre);
        agendaVer.camaUci = StateHelper.parseRequerido(json.cama);
        agendaVer.estadoCama = StateHelper.parseEstado(json.estadoCama);
        agendaVer.fecha = DateHelper.getFecha(json.fechaHora);
        agendaVer.hora = DateHelper.getHora(json.fechaHora);
        agendaVer.estadoFecha = StateHelper.parseEstadoAgenda(json.estadoFecha);

        return agendaVer;
    }
}