import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
//import { UserI } from './entities/UserI'


@Injectable()
export  class  Endpoints {

    private url:string = 'https://api.team23soen390.xyz/';

    constructor(private  http : HttpClient) { }

    // Sending a GET request to /products

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
    
    public getUserById(id): Observable<any[]>{
        return this.http.get<any[]>(this.url + '/users/' + id);
    }

    public getUserByUsername(username): Observable<any[]>{
        return this.http.get<any[]>(this.url + '/users/?username=' + username);
    }
}
