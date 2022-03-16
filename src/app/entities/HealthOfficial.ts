import { AccountType } from "./AccountType";
import { User } from "./User";

export class HealthOfficial extends User
{

  constructor(username: string,
    password: string,
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    address: string) 
  {
    super(username, password, firstName, lastName, AccountType.HEALTHOFFICIAL, telephone, email, address);
    User.allUsers.push(this);
  }
}

