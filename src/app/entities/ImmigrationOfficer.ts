import { AccountType } from "./AccountType";
import { User } from "./User";

export class ImmigrationOfficer extends User
{

  constructor(username: string,
    password: string,
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    address: string) 
  {
    super(username, password, firstName, lastName, AccountType.IMMIGRATIONOFFICER, telephone, email, address);
    User.allUsers.push(this);
  }
}

