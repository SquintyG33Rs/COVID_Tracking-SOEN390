import {User} from "./User";
import {Doctor} from "./Doctor";
import {Patient} from "./Patient";

export class Appointment
{
    doctor: Doctor;
    patient: Patient;
    date: Date;

    constructor(doctor: Doctor ,patient: Patient, date: Date)
    {
        this.doctor = doctor;
        this.patient = patient;
        this.date = date;
    }

}
