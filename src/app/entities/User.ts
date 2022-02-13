export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: string;
  telephone: string;
  email: string;
  address: string;

  constructor(  username: string,
                password: string,
                firstName: string,
                lastName: string,
                accountType: string,
                telephone: string,
                email: string,
                address: string) {
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

