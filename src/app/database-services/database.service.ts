import {Injectable} from "@angular/core";
import {User} from "../entities/User";



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  activeUser: User;

  users: User[] = [
    new User('admin.username', 'admin.password', 'admin.firstName', 'admin.lastName', 'ADMIN', '5141111111', 'admin@domain.com', 'AdminCity'),
    new User('medicalDoctor.username', 'medicalDoctor.password', 'medicalDoctor.firstName', 'medicalDoctor.lastName', 'MEDICALDOCTOR', '5142222222', 'medicalDoctor@domain.com', 'MedicalDoctorCity'),
    new User('healthOfficial.username', 'healthOfficial.password', 'healthOfficial.firstName', 'healthOfficial.lastName', 'HEALTHOFFICIAL', '5143333333', 'medicalDoctor@domain.com', 'HealthOfficialCity'),
    new User('immigrationOfficer.username', 'immigrationOfficer.password', 'immigrationOfficer.firstName', 'immigrationOfficer.lastName', 'IMMIGRATIONOFFICER', '5144444444', 'immigrationOfficer@domain.com', 'ImmigrationOfficerCity'),
    new User('patient.username', 'patient.password', 'patient.firstName', 'patient.lastName', 'PATIENT', '5145555555', 'patient@domain.com', 'PatientCity'),
  ];


  findUser(username: string, password: string, accountType: string): User {
    const foundUser: User = this.users.find(user => user.username === username && user.password === password && user.accountType === accountType);
    this.activeUser = foundUser;
    // Persist Active-User to Disk:
    localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
    return foundUser;
  }
}
