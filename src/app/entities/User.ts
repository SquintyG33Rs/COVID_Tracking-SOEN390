import { AccountType } from './AccountType';
import { Observable } from 'rxjs';
/*
export class InformationEvent
{
  username: string
  password: string
  firstName: string
  lastName: string
  accountType: AccountType
  telephone: string
  email: string
  address: string
}
*/
export class User
{
  static allUsers: User[] = [];
  public username: string;
  password: string;
  firstName: string;
  lastName: string;
  public accountType: AccountType;
  telephone: string;
  email: string;
  address: string;

  constructor(  username: string,
                password: string,
                firstName: string,
                lastName: string,
                accountType: AccountType,
                telephone: string,
                email: string,
                address: string)
  {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accountType = accountType;
    this.telephone = telephone;
    this.email = email;
    this.address = address;
  }
}



