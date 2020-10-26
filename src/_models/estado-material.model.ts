export class EstadoCama{
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
        if(json.estadosMateriales.length == 0){return null;}
        var colEstados = new Array<EstadoCama>();
        
        json.estadosCama.forEach(estado => {
            var tipoDoc = new EstadoCama(estado[0],estado[1]);
            colEstados.push(tipoDoc);
        });
        console.log(colEstados);
        return colEstados;
    }
}