import { AccountType } from './../entities/AccountType';
import { Injectable } from "@angular/core";
import { User } from "../entities/User";
import { Appointment } from '../entities/Appointment';
import { Admin } from '../entities/Admin';
import { Doctor } from '../entities/Doctor';
import { HealthOfficial } from '../entities/HealthOfficial';
import { ImmigrationOfficer } from '../entities/ImmigrationOfficer';
import { Patient } from '../entities/Patient';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService 
{
  activeUser: User;

  testuser:User = new User('doctor.username', 'doctor.password', 'doctor.firstName', 'doctor.lastName', AccountType.MEDICALDOCTOR, '5142222222', 'doctor@domain.com', 'DoctorCity');
  users: User[] = [
    new Admin('admin.username', 'admin.password', 'admin.firstName', 'admin.lastName', '5141111111', 'admin@domain.com', 'AdminCity'),
    new Doctor('doctor.username', 'doctor.password', 'doctor.firstName', 'doctor.lastName', '5142222222', 'doctor@domain.com', 'DoctorCity'),
    new HealthOfficial('healthOfficial.username', 'healthOfficial.password', 'healthOfficial.firstName', 'healthOfficial.lastName', '5143333333', 'healthOfficial@domain.com', 'HealthOfficialCity'),
    new ImmigrationOfficer('immigrationOfficer.username', 'immigrationOfficer.password', 'immigrationOfficer.firstName', 'immigrationOfficer.lastName', '5144444444', 'immigrationOfficer@domain.com', 'ImmigrationOfficerCity'),
    new Patient('patient.username', 'patient.password', 'patient.firstName', 'patient.lastName', '5145555555', 'patient@domain.com', 'PatientCity'),
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
