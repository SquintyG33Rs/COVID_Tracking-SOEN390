import { AccountType } from "./AccountType";
import { Patient } from "./Patient";
import { User } from "./User";

export class Doctor extends User{

  patientList :Patient[] = []; // Maximum 20 patients per doctor

  constructor(username: string,
    password: string,
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    address: string) 
  {
    super(username, password, firstName, lastName, AccountType.MEDICALDOCTOR, telephone, email, address);

    User.allUsers.push(this);
  }
}

