export class AuthHelper{
    /**
     * Cambia el usuario que haya iniciado sesion
     * @param res Respuesta del servidor al iniciar sesión
     */
    public static setLoggedToken(res):void{
        localStorage.setItem('token',res.token);
    }
    /**
     * Obtiene el usuario de la sesión actual
     */
    public static getLoggedToken(){
        let token = localStorage.getItem('token');
        if(token==null){return null;}
        return token;
    }
}