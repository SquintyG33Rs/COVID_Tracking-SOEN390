import { Component, OnInit } from '@angular/core';
import { Endpoints } from 'src/app/app-endpoints';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  private activeUser: any;
  private messages = [];

  constructor(private endpoints: Endpoints) { }

  ngOnInit() {

  this.activeUser = JSON.parse(localStorage.getItem('user'));

      this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
      res =>
      {
        this.messages = res[0].incoming_messages;
      },err => console.log(err))
  }

}
