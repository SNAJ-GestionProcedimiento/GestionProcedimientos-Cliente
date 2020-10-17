export class EstadoAgenda{
    /**
     * Identificador de estado
     */
    idEstado:string;
    /**
     * Nombre de estado
     */
    nombre:string;

    constructor(id:string,nombre:string){
        this.idEstado = id;
        this.nombre = nombre;
    }
    
    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Array<EstadoAgenda>{
        if(json.estadosAgendaProc.length == 0){return null;}
        var colEstados = new Array<EstadoAgenda>();
        
        json.estadosAgendaProc.forEach(estado => {
            var estados = new EstadoAgenda(estado[0],estado[1]);
            colEstados.push(estados);
        });

        return colEstados;
    }
}