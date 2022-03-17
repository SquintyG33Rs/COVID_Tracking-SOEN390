import {User} from "./User";

export class MedicalCommunication{
    sender: User;
    receiver: User;
    date: Date;
    message:string;

    constructor(u1:User,u2:User, x:Date,y:string){
        this.sender=u1;
        this.receiver=u2;
        this.date=x;
        this.message=y;
    }

}