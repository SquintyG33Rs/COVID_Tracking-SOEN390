import { Component, OnInit } from '@angular/core';
import { Endpoints } from 'src/app/app-endpoints';
import { Sockets } from 'src/app/app-socket';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  private activeUser: any;
  private messages = [];
  private activePatient: any;
  private activeDoctor: any;
  private ready = false;
  private chat = [];
  private patients: any;
  private target: any;
  private chosen: any;
  private fullPatientList = [];
  private complete = false;
  message: string="";

  constructor(private endpoints: Endpoints, private sockets: Sockets) { }

  showDate(message) {
    if (message.date) {
      message.date = false;
    }
    else {
      message.date = true;
    }
  }

  sendMessage(message){ //patient or doctor id
    if(message) {
      this.endpoints.createMessage(this.activeUser.id, message, this.target).subscribe(newmessage => {
        this.endpoints.sendMessage(this.activeUser, this.chosen, newmessage);
        newmessage.author = newmessage.author.id;
        this.chat.push(newmessage);
      })
    }
    this.message = ""
  }

  sendByEnter(keycode, message){
    if (keycode == 13) {
      this.sendMessage(message)
    }
  }

  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.endpoints.getUserById(this.activeUser.id).subscribe(data =>{
      localStorage.setItem('user', JSON.stringify(data));
      this.activeUser = JSON.parse(localStorage.getItem('user'));
      
      if(this.activeUser.account_type=='PATIENT'){
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe((data) => {
            this.activePatient = data[0];
            this.endpoints.getUserById(this.activePatient.current_doctor.is_user).subscribe(data => {
                this.activePatient.current_doctor.is_user = data;
                this.target = this.activePatient.current_doctor.is_user.id;
                this.chosen = this.activePatient.current_doctor.is_user;
                this.activeUser.inbox.forEach(e => 
                  {
                    if (e.author == this.target) {
                      e.created_at = Date.parse(e.created_at);
                      var date = new Date(e.created_at);
                      var day = date.getDate()
                      var month = date.getMonth()
                      var year = date.getUTCFullYear()
                      e.sentDate = day + "/" + month + "/" + year
                      this.chat.push(e)
                    }
                  })
                this.activeUser.outbox.forEach(e => 
                  {
                    if (e.target == this.target) {
                      e.created_at = Date.parse(e.created_at);
                      var date = new Date(e.created_at);
                      var day = date.getDate()
                      var month = date.getMonth()
                      var year = date.getUTCFullYear()
                      e.sentDate = day + "/" + month + "/" + year
                      this.chat.push(e)
                    }
                  })
                this.chat.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
                this.ready = true;
            })
        })
      }
  
      else if(this.activeUser.account_type=='MEDICALDOCTOR'){
        this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe((data) => {
          var check = JSON.parse(localStorage.getItem('patient'))
          this.activeDoctor = data[0]

          if (check) {
            this.chosen = check.user;
            this.target = check.user.id;
            localStorage.removeItem('patient')
            this.activeUser.inbox.forEach(e => 
              {
                if (e.author == this.target) {
                  e.created_at = Date.parse(e.created_at);
                  var date = new Date(e.created_at);
                  var day = date.getDate()
                  var month = date.getMonth()
                  var year = date.getUTCFullYear()
                  e.sentDate = day + "/" + month + "/" + year
                  this.chat.push(e)
                }
              })
            this.activeUser.outbox.forEach(e => 
              {
                if (e.target == this.target) {
                  e.created_at = Date.parse(e.created_at);
                  var date = new Date(e.created_at);
                  var day = date.getDate()
                  var month = date.getMonth()
                  var year = date.getUTCFullYear()
                  e.sentDate = day + "/" + month + "/" + year
                  this.chat.push(e)
                }
              })
            this.chat.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
            this.complete = true;
            this.ready = true;
          }
          else {
            this.patients = data[0].patients;
            this.endpoints.getUsers().subscribe((users) => {
              this.patients.forEach(element => 
                {
                  var foundUser = users.find(x => x.id == element.is_user);
                  var user = {
                    user: foundUser,
                    patient: element
                  };
                  this.fullPatientList.push(user);  
                });
              this.complete = true;
            });
          }
          
        },err => console.log(err))
      }
    })
    
    //console.log(this.activeUser);
    
    this.sockets.getNewMessage().subscribe((message) => {
      console.log(message)
      if (message.type == 'New Message' && message.target == this.activeUser.id && this.chosen) {
        this.endpoints.getMessageByMessageId(message.message_id).subscribe(message => {
          this.chat.push(message);
        });
      }
    });
    
  }

  choose(patient) {
    this.chosen = patient.user
    this.target = patient.user.id
    this.activeUser.inbox.forEach(e => 
      {
        if (e.author == this.target) {
          e.created_at = Date.parse(e.created_at);
          var date = new Date(e.created_at);
          var day = date.getDate()
          var month = date.getMonth()
          var year = date.getUTCFullYear()
          e.sentDate = day + "/" + month + "/" + year
          this.chat.push(e)
        }
      })
    this.activeUser.outbox.forEach(e => 
      {
        if (e.target == this.target) {
          e.created_at = Date.parse(e.created_at);
          var date = new Date(e.created_at);
          var day = date.getDate()
          var month = date.getMonth()
          var year = date.getUTCFullYear()
          e.sentDate = day + "/" + month + "/" + year
          this.chat.push(e)
        }
      })
    this.chat.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
    this.complete = true;
    this.ready = true;
    
  }

}
