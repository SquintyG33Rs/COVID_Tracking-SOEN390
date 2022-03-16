/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTANT: id == userid, docid != userid, patientid != userid. They are unique keys in their own table. use any getDoctorby..() or getPatientBy..() to get docid and patientid  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Injectable } from  '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './entities/User'
//import { UserI } from './entities/UserI'


@Injectable()
export  class  Endpoints {

    private url:string = 'https://api.team23soen390.xyz/';
    constructor(private  http : HttpClient) { }
    

    //GET requests
    public getUsers(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'users');
    }

    public getDoctors(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'doctors');
    }
    
    public getPatients(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'patients');
    }

    public getAppointments(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'appointments');
    }
    
    public getUserById(id): Observable<any>{
        return this.http.get<any>(this.url + '/users/' + id);
    }

    public getUserByUsername(username): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("username", username)
        return this.http.get<any>(this.url + 'users/', {params: qparams});
    }

    public getDoctorByUsername(username): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.username", username)
        return this.http.get<any>(this.url + 'doctors/', {params: qparams});
    }

    public getPatientByUsername(username): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.username", username)
        return this.http.get<any>(this.url + 'patients/', {params: qparams});
    }

    public getDoctorById(id): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.id", id)
        return this.http.get<any>(this.url + 'doctors/', {params: qparams});
    }

    public getPatientById(id): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.id", id)
        return this.http.get<any>(this.url + 'patients/', {params: qparams});
    }

    public getDoctorByDoctorId(doctorid): Observable<any>{//uses doctorid, doctorid != userid

        return this.http.get<any>(this.url + 'doctors/' + doctorid);
    }

    public getPatientByPatientId(patientid): Observable<any>{//uses patientid, patientid != userid

        return this.http.get<any>(this.url + 'patients/' + patientid);
    }

    public getAppointmentByPatientUserId(id): Observable<any>{ 
        let qparams = new HttpParams();
        qparams = qparams.append("patient.id", id)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentByDoctorUserId(id): Observable<any>{ 
        let qparams = new HttpParams();
        qparams = qparams.append("doctor.id", id)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentByPatientId(patientid): Observable<any>{ //uses patientid, patientid != userid
        let qparams = new HttpParams();
        qparams = qparams.append("patient", patientid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentByDoctorId(doctorid): Observable<any>{ //uses doctorid, doctorid != userid
        let qparams = new HttpParams();
        qparams = qparams.append("doctor", doctorid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }


    //POST requests
    //pass user object
    public createAccount(user): Observable<any>{
        const body = {
            username: user.username,
            first_name: user.firstname,
            last_name: user.lastname,
            address: user.address,
            phone: user.telephone,
            account_type: user.accountType,
            email: user.email,
            password: user.password
        }
        return this.http.post<any>(this.url + 'auth/local/register', body);
    }

    public createDoctor(userid): Observable<any>{ //add an entry for Doctor, call this after successfully creating a user with accountType = DOCTOR
        const body = {
            is_user: userid
        }
        return this.http.post<any>(this.url + 'doctors/', body);
    }

    public createPatient(userid): Observable<any>{ //add an entry for Doctor, call this after successfully creating a user with accountType = PATIENT
        const body = {
            is_user: userid
        }
        return this.http.post<any>(this.url + 'doctors/', body);
    }

    //identifier can be either username or email, will return JWT on success.
    public login(identifier, password): Observable<any>{
        const body = {
            identifier: identifier,
            password: password
        }
        return this.http.post<any>(this.url + 'auth/local/', body);
    }

    public createAppointment(docid, patientid, date): Observable<any>{ //docid and patientid are not the same as their userid, call getDoctorby..() to get their doctor id
        const body = {
            doctor: docid,
            patient: patientid,
            date: date
        }
        return this.http.post<any>(this.url + 'appointments/', body);
    }


    //PUT requests
    //docid and patientid are not the same as their userid, call getDoctorby..() to get their doctor id
    public addPatientToDoctor(docid, patientid): Observable<any>{
        const body = {
            patients: patientid
        }
        return this.http.put<any>(this.url + 'doctors/' + docid, body);
    }

    //Call this when calling addPatientToDoctor and perform the necessary checks
    public addDoctorToPatient(docid, patientid): Observable<any>{
        const body = {
            current_doctor: docid
        }
        return this.http.put<any>(this.url + 'patients/' + patientid, body);
    }

}
