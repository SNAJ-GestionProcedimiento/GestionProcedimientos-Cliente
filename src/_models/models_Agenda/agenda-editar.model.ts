import { Acudiente } from '../acudiente.model';
import { Agendamiento } from '../agendamiento.models';
import { Paciente } from '../paciente.model';
import { Procedimiento } from '../procedimiento.model';

export class AgendaEditar{
    public idAgendaProcedimiento:string
    public correoPac:string;
    public telefonoPac:string;
    public direccionPac:string;
    public identificacionAcu:string;
    public tipoIdentificacionAcu:string;
    public fechaNacimientoAcu:string;
    public correoAcu:string;
    public telefonoAcu:string;
    public direccionAcu:string;
    public nombreAcu:string;
    public generoAcu:string;
    public fechaHora:string;
    public estadoFecha:string;
    public cama:string;
    public estadoCama:string;
    public bancoSangre:string;
    public observacion:string;
	public estadoSala:string;
    public idSala:string;
    public idUsuario:string;

    constructor(){    }

    public parseToJSON():any{
        let as = JSON.stringify(this);
        //console.log(as);
        return as;
    }

    public static fromOBJECTS(
        idAgendaProcedimiento:string,
        paciente:Paciente,
        acudiente:Acudiente,
        procedimiento:Procedimiento,
        agendamiento:Agendamiento,
        observacion:string,
        estadoCama:string,
        idUsuario:string){

            if(
                paciente == null ||
                acudiente == null ||
                procedimiento == null ||
                agendamiento == null
            ){return null;}
            var agendaEditar = new AgendaEditar();

            /**Agenda a ediar */
            agendaEditar.idAgendaProcedimiento = idAgendaProcedimiento;
            /**Datos del paciente */
            agendaEditar.correoPac = paciente.correo;
            agendaEditar.telefonoPac = paciente.telefono;
            agendaEditar.direccionPac = paciente.direccion;
            /**Datos del acudiente */
            agendaEditar.identificacionAcu = acudiente.identificacion;
            agendaEditar.tipoIdentificacionAcu = acudiente.tipoIdentificacion;
            agendaEditar.nombreAcu = acudiente.nombre;
            agendaEditar.fechaNacimientoAcu = acudiente.fechaNacimiento.toString();
            agendaEditar.generoAcu = acudiente.genero;
            agendaEditar.direccionAcu = acudiente.direccion;
            agendaEditar.telefonoAcu = acudiente.telefono;
            agendaEditar.correoAcu = acudiente.correo;
            /**Datos del procedimeinto */
            agendaEditar.cama = procedimiento.modalidades[0].camaUCI.toString();
            agendaEditar.estadoCama = estadoCama;
            agendaEditar.bancoSangre = procedimiento.modalidades[0].bancoSangre.toString();
            /**Datos del agendamiento */
            agendaEditar.fechaHora = agendamiento.fecha+' '+agendamiento.hora;
            agendaEditar.estadoFecha = agendamiento.estadoAgenda;
            agendaEditar.idSala = agendamiento.idSala;
            agendaEditar.estadoSala = agendamiento.estadoSala;
            /**Observacion */
            agendaEditar.observacion = observacion;
            /**Estado cama */
            agendaEditar.estadoCama = estadoCama;
            /**Usuario */
            agendaEditar.idUsuario = idUsuario;

            return agendaEditar;

    }
}