import {User} from "./User";

export class Appointment{
    doctor: User;
    patient: User;
    date: string;

    constructor(u1:User,u2:User, x:string){
        this.doctor=u1;
        this.patient=u2;
        this.date=x;
    }

}