import { DateHelper } from 'src/_helpers/date.helper';

export class Agendamiento{
    /**
     * Fecha de la agendamiento
     */
    public fecha;
    /**
     * Hora de la agendamiento
     */
    public hora;
    /**
     * Estado del agendamiento
     */
    public estadoAgenda;
    /**
     * Sala del agendamiento
     */
    public idSala;
    /**
     * Estado de la sala
     */
    public estadoSala;

    public static fromJSON(json){
        if(json==null){return null;}

        var agendamiento = new Agendamiento();

        agendamiento.fecha = DateHelper.getFecha(json.fechaHora);
        agendamiento.hora = DateHelper.getHora(json.fechaHora);
        agendamiento.estadoAgenda = json.estadoFecha;
        agendamiento.idSala = json.idSala;
        agendamiento.estadoSala = json.estadoSala;

        return agendamiento;
    }
}