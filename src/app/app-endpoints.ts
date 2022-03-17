import { Injectable } from  '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './entities/User'
//import { UserI } from './entities/UserI'


@Injectable()
export  class  Endpoints {
    activeUser;

    private url:string = 'https://api.team23soen390.xyz/';

    constructor(private  http : HttpClient) { }

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

    //identifier can be either username or email, will return JWT on success.
    public login(identifier, password): Observable<any>{
        const body = {
            identifier: identifier,
            password: password
        }
        return this.http.post<any>(this.url + 'auth/local/', body);
    }


}
