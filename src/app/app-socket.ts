import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable()
  export class Sockets {
  
    public message$: BehaviorSubject<any> = new BehaviorSubject('');
    constructor() {}
  
    socket = io('https://api.team23soen390.xyz/');
  
    public sendMessage(message) {
      this.socket.emit('message', message);
    }
  
    public getNewMessage = () => {
      this.socket.on('message', (message) =>{
        this.message$.next(message);
      });

      this.socket.on('hello', (message) =>{
        this.message$.next(message);
      });
      
      return this.message$.asObservable();
    };
  }