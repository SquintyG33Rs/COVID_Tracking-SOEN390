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

    public getUpdates(): Observable<any[]>{
      return this.http.get<any[]>(this.url + 'statuses' );
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

    public getDoctorByUserId(userid): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.id", userid)
        return this.http.get<any>(this.url + 'doctors/', {params: qparams});
    }

    public getPatientByUserId(userid): Observable<any>{

        let qparams = new HttpParams();
        qparams = qparams.append("is_user.id", userid)
        return this.http.get<any>(this.url + 'patients/', {params: qparams});
    }

    public getDoctorByDoctorId(doctorid): Observable<any>{//uses doctorid, doctorid != userid

        return this.http.get<any>(this.url + 'doctors/' + doctorid);
    }

    public getPatientByPatientId(patientid): Observable<any>{//uses patientid, patientid != userid

        return this.http.get<any>(this.url + 'patients/' + patientid);
    }

    public getAppointmentByPatientUserId(userid): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("patient.id", userid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentByDoctorUserId(userid): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("doctor.id", userid)
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

    public getAppointmentByPatientUsername(username): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("patient.username", username)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentByDoctorUsername(username): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("doctor.username", username)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    //POST requests
    //pass user object
    public createUser(user): Observable<any>{
        const body = {
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            address: user.address,
            phone: user.telephone,
            account_type: user.accountType,
            email: user.email,
            password: user.password
        }
        console.log(body)
        return this.http.post<any>(this.url + 'auth/local/register', body);
    }

    public createDoctor(userid): Observable<any>{ //add an entry for Doctor, call this after successfully creating a user with accountType = DOCTOR
        const body = {
            is_user: userid
        }
        return this.http.post<any>(this.url + 'doctors/', body);
    }

    public createPatient(userid, statusid): Observable<any>{ //add an entry for Doctor, call this after successfully creating a user with accountType = PATIENT
        const body = {
            is_user: userid,
            flagged: false,
            status: statusid
        }
        return this.http.post<any>(this.url + 'patients/', body);
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

    public createStatus(): Observable<any> {
        let date = new Date()
        let dateString = date.getTime()
        const body= {
            date: dateString,
            temperature: 0,
            weight: 0,
            cough: false,
            headache: false,
            sore_throat: false,
            fever: false,
            loss_of_taste_or_smell: false,
            tiredness: false
        }
        return this.http.post<any>(this.url + 'statuses/', body);
    }

    public createStatusWithParams(dateString, temperature, weight, cough, headache, sore_throat, fever, loss_of_taste_or_smell, tiredness): Observable<any> { //call
        const body = {
            date: dateString,
            temperature: temperature,
            weight: weight,
            cough: cough,
            headache: headache,
            sore_throat: sore_throat,
            fever: fever,
            loss_of_taste_or_smell: loss_of_taste_or_smell,
            tiredness: tiredness
        }
        return this.http.post<any>(this.url + 'statuses/', body);
    }

    //PUT requests
    //docid and patientid are not the same as their userid, call getDoctorby..() to get their doctor id
    public addPatientToDoctor(docid, patientids): Observable<any>{ //patientid can be an array of patientid
        const body = {
            patients: patientids
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

    public modifyPatientStatus(patientid, statusid): Observable<any> {
        const body = {
            status: statusid
        }
        return this.http.put<any>(this.url + 'patients/' + patientid, body);
    }

    public modifyPatientStatusHistory(patientid, statusids): Observable<any> { //statusids can be an array
        const body = {
            status_history: statusids
        }
        return this.http.put<any>(this.url + 'patients/' + patientid, body);
    }

}
