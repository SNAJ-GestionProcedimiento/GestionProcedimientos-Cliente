export class Usuario{
    public id:string; 
    public username:string;
    public password:string;
    public first_name:string;
    public last_name:string;
    public email:string;
    public groups:string[];

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    constructor(id:string, username:string, password:string, first_name:string, last_name:string, email:string, groups:string[]){
        this.id = id;
        this.username = username; 
        this.password = password; 
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.groups = groups;
    }
}