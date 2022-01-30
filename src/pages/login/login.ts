import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  template: `<ion-button (click)="login()">Login</ion-button>`,
})
export class LoginButtonComponent {
  constructor() {}

  login() {
  }
}