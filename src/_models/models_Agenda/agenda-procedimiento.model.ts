export class AgendaProcedimiento{
    public idAgendaProc:string;
    public idProcedimientoMod:string;
    public idSala:string;
    public idPaciente:string;
    public idAcudiente:string;
    public idUsuario:string;
    public fechaHora:string;
    public estadoFecha:string;
    public cama:boolean;
    public estadoCama:string;
    public bancosangre:boolean;
    public estadoSala:string
    public observacion:string;

    public static fromJSON(json):AgendaProcedimiento{
        if(json!=null){return null;}
        var agendaProc = new AgendaProcedimiento();
        agendaProc.idAgendaProc=json.idAgendaProcedimiento;
        agendaProc.idProcedimientoMod=json.idProcedimientoModalidad;
        agendaProc.idSala=json.idSala;
        agendaProc.idPaciente=json.idPaciente;
        agendaProc.idAcudiente=json.idAcudiente;
        agendaProc.idUsuario=json.idUsuario;
        agendaProc.fechaHora=json.fechaHora;
        agendaProc.estadoFecha=json.estadoFecha;
        agendaProc.cama=json.cama;
        agendaProc.estadoCama=json.estadoCama;
        agendaProc.bancosangre=json.bancoSangre;
        agendaProc.estadoSala=json.estadoSala;
        agendaProc.observacion=json.observacion;

        return agendaProc;
    }
}