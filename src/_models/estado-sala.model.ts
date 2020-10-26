export class EstadoSala{
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

    public static fromJSON(json){

        if(json.estadosSalas.length == 0){return null;}
        var colEstados = new Array<EstadoSala>();

        
        json.estadosSalas.forEach(estadoSala => {
            var tipoDoc = new EstadoSala(estadoSala[0],estadoSala[1]);
            colEstados.push(tipoDoc);
        });

        console.log("Estados salas desde el modleo: "+colEstados);

        return colEstados;
    }
}