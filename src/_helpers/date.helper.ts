export class DateHelper{
    public static dateToStr(date:Date){
        let oldDate = date;
        console.log(oldDate);
        let year = oldDate.getFullYear().toString();
        let month = oldDate.getMonth().toString().length<2?'0'+oldDate.getMonth().toString():oldDate.getMonth().toString();
        let day = oldDate.getDate().toString().length<2?'0'+oldDate.getDate().toString():oldDate.getDate().toString();
        let strDate = year+'-'+month+'-'+day;
        return strDate;
    }

    //Cambia el formato de la hora que entra, para ser mostrado en pantalla
    public static horaEntrada(hour:string){
        
    }

    //Cambia el formato de la hora que sale, para ser enviado al server
    public static horaSalida(hour:string){
        let newHour:string = '';
        if(hour.search('AM')>=0){
            newHour = hour.replace(' AM',':00')
        }else{
            newHour = hour.replace(' PM',':00')
        }
        console.log(newHour);
        return newHour;
    }

    public static getAge(birthdate:Date){
        let currentDate = new Date();
        let age = currentDate.getFullYear() - birthdate.getFullYear();
        let month = currentDate.getMonth() - birthdate.getMonth();
        if(month < 0 || (month===0 && currentDate.getDate() < birthdate.getDate())){
            age--;
        }
        return age;
    }
}