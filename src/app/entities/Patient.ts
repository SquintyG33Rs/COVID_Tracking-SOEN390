import { AccountType } from "./AccountType";
import { Doctor } from "./Doctor";
import { User } from "./User";

export class Patient extends User
{

  currentDoctor: Doctor;

  constructor(username: string,
    password: string,
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    address: string) 
  {
    super(username, password, firstName, lastName, AccountType.PATIENT, telephone, email, address);
    User.allUsers.push(this);
  }
}

