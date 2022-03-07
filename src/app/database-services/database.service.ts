import { AccountType } from './../entities/AccountType';
import {Injectable} from "@angular/core";
import {User} from "../entities/User";
import { Appointment } from '../entities/Appointment';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService 
{
  activeUser: User;

  testuser:User = new User('doctor.username', 'doctor.password', 'doctor.firstName', 'doctor.lastName', AccountType.MEDICALDOCTOR, '5142222222', 'doctor@domain.com', 'DoctorCity');
  users: User[] = [
    new User('admin.username', 'admin.password', 'admin.firstName', 'admin.lastName', AccountType.ADMIN, '5141111111', 'admin@domain.com', 'AdminCity'),
    new User('doctor.username', 'doctor.password', 'doctor.firstName', 'doctor.lastName', AccountType.MEDICALDOCTOR, '5142222222', 'doctor@domain.com', 'DoctorCity'),
    new User('healthOfficial.username', 'healthOfficial.password', 'healthOfficial.firstName', 'healthOfficial.lastName', AccountType.HEALTHOFFICIAL, '5143333333', 'healthOfficial@domain.com', 'HealthOfficialCity'),
    new User('immigrationOfficer.username', 'immigrationOfficer.password', 'immigrationOfficer.firstName', 'immigrationOfficer.lastName', AccountType.IMMIGRATIONOFFICER, '5144444444', 'immigrationOfficer@domain.com', 'ImmigrationOfficerCity'),
    new User('patient.username', 'patient.password', 'patient.firstName', 'patient.lastName', AccountType.PATIENT, '5145555555', 'patient@domain.com', 'PatientCity'),
  ];
  appointments:Appointment[]=[];


  findUser(username: string, password: string, accountType: AccountType): User 
  {
    const foundUser: User = this.users.find(user => user.username === username && user.password === password && user.accountType === accountType);
    this.activeUser = foundUser;
    // Persist Active-User to Disk:
    localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
    return foundUser;
  }
}
