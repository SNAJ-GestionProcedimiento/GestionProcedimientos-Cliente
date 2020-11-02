import { Paciente } from 'src/_models/paciente.model';
import { Acudiente } from 'src/_models/acudiente.model';
import { ProcedimientoModalidad } from 'src/_models/procedimientoModalidad.model';

import { DateHelper } from 'src/_helpers/date.helper';
import { Procedimiento } from '../procedimiento.model';
import { Agendamiento } from '../agendamiento.models';

export class AgendaCrear{
    /**
     * Campos de paciente
     */
    public identificacionPac: string;
    public tipoIdentificacionPac: string;
    public fechaNacimientoPac: string;
    public correoPac: string;
    public telefonoPac: string;
    public direccionPac: string;
    public nombrePac: string;
    public generoPac: string;
    /**
     * Campos de acudiente
     */
    public identificacionAcu : string;
    public tipoIdentificacionAcu : string;
    public fechaNacimientoAcu : string;
    public correoAcu : string;
    public telefonoAcu : string;
    public direccionAcu : string;
    public nombreAcu : string;
    public generoAcu : string;
    /**
     * Campos de hora y fecha
     */
    public fechaHora: string;
    public estadoFecha: string;
    /**
     * Campos de procedimiento - modalidad
     */
    public cama : string;
    public estadoCama : string;
    public bancoSangre : string;
    public idProcedimientoModalidad : string;
     /**
     * Campo de observación
     */
    public observacion : string;
    /**
     * Campos salas y usuario
     */
    public estadoSala: string;
    public idSala : string;
    public idUsuario:string='1';

    constructor(){    }

    public static fromOBJECTS(
        paciente:Paciente,
        acudiente:Acudiente,
        procedimiento:Procedimiento,
        agendamiento:Agendamiento,
        observacion:string,
        estadoCama:string,
        idUsuaro:string){

        if(
            paciente == null ||
            acudiente == null ||
            procedimiento == null ||
            agendamiento == null
        ){return null;}
        var agendaCrear = new AgendaCrear();

        /**Datos de paciente */
        agendaCrear.identificacionPac = paciente.identificacion;
        agendaCrear.tipoIdentificacionPac = paciente.tipoIdentificacion;
        agendaCrear.nombrePac = paciente.nombre;
        agendaCrear.fechaNacimientoPac = paciente.fechaNacimiento.toString();
        agendaCrear.generoPac = paciente.genero;
        agendaCrear.telefonoPac = paciente.telefono;
        agendaCrear.direccionPac = paciente.direccion;
        agendaCrear.correoPac = paciente.correo;
        /**Datos de acudiente */
        agendaCrear.identificacionAcu = acudiente.identificacion;
        agendaCrear.tipoIdentificacionAcu = acudiente.tipoIdentificacion;
        agendaCrear.nombreAcu = acudiente.nombre;
        agendaCrear.fechaNacimientoAcu = acudiente.fechaNacimiento.toString();
        agendaCrear.generoAcu = acudiente.genero;
        agendaCrear.telefonoAcu = acudiente.telefono;
        agendaCrear.direccionAcu = acudiente.direccion;
        agendaCrear.correoAcu = acudiente.correo;
        /**Datos de procedimiento */
        var modalidad = procedimiento.modalidades[0];
        agendaCrear.idProcedimientoModalidad = modalidad.idProcedimientoModalidad.toString();
        agendaCrear.cama = modalidad.camaUCI.toString();
        agendaCrear.bancoSangre = modalidad.bancoSangre.toString();
        agendaCrear.estadoCama = estadoCama;
        /**Datos de agendamiento */
        agendaCrear.observacion = observacion;
        agendaCrear.fechaHora = agendamiento.fecha + ' ' + agendamiento.hora;
        agendaCrear.estadoFecha = agendamiento.estadoAgenda;
        agendaCrear.idSala = agendamiento.idSala;
        agendaCrear.estadoSala = agendamiento.estadoSala;
        /**Datos del usuario */
        agendaCrear.idUsuario = idUsuaro;

        return agendaCrear;
    }

    public parseToJSON():any{
        let as = JSON.stringify(this);
        //console.log(as);
        return as;
    }
}