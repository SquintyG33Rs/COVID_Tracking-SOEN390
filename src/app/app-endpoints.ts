import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from './entities/UserI'


@Injectable()
export  class  Endpoints {

    private url:string = 'http://api.localhost:8080/';

    constructor(private  http : HttpClient) { }

    // Sending a GET request to /products

    public getUsers(): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + 'users');
    }

    public getDoctors(): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + 'doctors');
    }
    
    public getPatients(): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + 'patients');
    }

    public getAppointments(): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + 'appointments');
    }
    
    public getUserById(id): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + '/users/' + id);
    }

    public getUserByUsername(username): Observable<UserI[]>{
        return this.http.get<UserI[]>(this.url + '/users/?username=' + username);
    }
}
