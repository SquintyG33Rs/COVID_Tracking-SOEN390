import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './Test'


@Injectable()
export  class  Endpoints {

    private url:string = 'http://127.0.0.1:5000/';

    constructor(private  http : HttpClient) { }

    // Sending a GET request to /products

    public getTest(): Observable<Test[]>{
        return this.http.get<Test[]>(this.url);
    }

}
