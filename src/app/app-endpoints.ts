/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTANT: id == userid, docid != userid, patientid != userid. They are unique keys in their own table. use any getDoctorby..() or getPatientBy..() to get docid and patientid  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Injectable } from  '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Sockets } from './app-socket';

@Injectable()
export  class  Endpoints {

    private url:string = 'https://api.team23soen390.xyz/';
    constructor(private  http : HttpClient, private sockets: Sockets) { }
    private activeUser = JSON.parse(localStorage.getItem('user'));

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

    public getInteractions(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'interactions' );
      }

    public getUserById(id): Observable<any>{
        return this.http.get<any>(this.url + 'users/' + id);
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

    public getAppointmentsByPatientUserId(userid): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("patient.is_user", userid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentsByDoctorUserId(userid): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("doctor.is_user", userid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentsByPatientId(patientid): Observable<any>{ //uses patientid, patientid != userid
        let qparams = new HttpParams();
        qparams = qparams.append("patient", patientid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentsByDoctorId(doctorid): Observable<any>{ //uses doctorid, doctorid != userid
        let qparams = new HttpParams();
        qparams = qparams.append("doctor", doctorid)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentsByPatientUsername(username): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("patient.username", username)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getAppointmentsByDoctorUsername(username): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("doctor.username", username)
        return this.http.get<any>(this.url + 'appointments/', {params: qparams});
    }

    public getInteractionById(interactionId): Observable<any>{
        return this.http.get<any>(this.url + 'interactions/' + interactionId);
    }
    
    public getInteractionsByLocation(location: string): Observable<any>{
        let qparams = new HttpParams();
        qparams = qparams.append("location", location);
        return this.http.get<any>(this.url + 'interactions/', {params: qparams});
    }

    public getMessageByMessageId(messageid: number): Observable<any>{
        return this.http.get<any>(this.url + 'messages/' + messageid);
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

    public createPatient(userid): Observable<any>{ //add an entry for Doctor, call this after successfully creating a user with accountType = PATIENT
        const body = {
            is_user: userid,
            flagged: false
        }
        return this.http.post<any>(this.url + 'patients/', body);
    }

    public createInteraction(start: number, end: number, loc: any, patientid: number, flagged: boolean) {
        const body = {
            start: start,
            location: loc,
            end: end,
            patient: patientid,
            flagged: flagged
        }
        return this.http.post<any>(this.url + 'interactions/', body);
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

    public createStatus(patientid): Observable<any> {
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
            tiredness: false,
            patient: patientid
        }
        return this.http.post<any>(this.url + 'statuses/', body);
    }

    public createStatusWithParams(dateString, temperature, weight, cough, headache, sore_throat, fever, loss_of_taste_or_smell, tiredness, patientid): Observable<any> { //call

       const body = {

            date: dateString,
            temperature: temperature,
            weight: weight,
            cough: cough,
            headache: headache,
            sore_throat: sore_throat,
            fever: fever,
            loss_of_taste_or_smell: loss_of_taste_or_smell,
            tiredness: tiredness,
            patient: patientid

        }
        console.log(this.activeUser.id + " updated their status");
        return this.http.post<any>(this.url + 'statuses/', body);
    }

    public createMessage(userid: number, content: string, targetid: number): Observable<any>{ //docid and patientid are not the same as their userid, call getDoctorby..() to get their doctor id
        const body = {
            author: userid,
            message_content: content,
            read: false,
            target: targetid
        }
        return this.http.post<any>(this.url + 'messages/', body);
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

    public modifyPatientInteractions(patientid, interactionIds): Observable<any> { //interactions can be an array
        const body = {
            interactions: interactionIds
        }
        return this.http.put<any>(this.url + 'patients/' + patientid, body);
    }

  public addStatusToPatientHistory(patientid, statusid) { //statusids can be an array
    this.getPatientByPatientId(patientid).subscribe((data) => {
      let statusids = data['status_history'];
      //console.log(statusids);
      statusids.push(statusid);
      const body = {
        status_history: statusids
      };
      this.http.put<any>(this.url + 'patients/' + patientid, body).subscribe((data) => {
        console.log(data);
      });
    });
  }

  public removeStatusFromPatientHistory(patientid, statusid) { //statusids can be an array
    this.getPatientByPatientId(patientid).subscribe((data) => {
      let statusids = data['status_history'];
      //console.log(statusids);
      const index = statusids.indexOf(statusid);
      if (index > -1) {
        statusids.splice(index,1);
      }
      const body = {
        status_history: statusids
      };
      this.http.put<any>(this.url + 'patients/' + patientid, body).subscribe((data) => {
        console.log(data);
      });
    });
  }

  public assignPatientToDoctor(patientid, doctorid) { //statusids can be an array
    this.getDoctorByDoctorId(doctorid).subscribe((data) => {
      let patients = data['patients'];
      patients.push(patientid);
      const body = {
        patients: patients
      };
      this.http.put<any>(this.url + 'doctors/' + doctorid, body).subscribe((data) => {
        console.log(data);
      });
    });
  }

  public unassignPatientFromDoctor(patientid, doctorid) { //statusids can be an array
    this.getDoctorByDoctorId(doctorid).subscribe((data) => {
      let patients = data['patients'];
      const index = patients.indexOf([patientid]);
      if (index > -1) {
        patients.splice(index,1);
      }
      const body = {
        patients: patients
      };
      this.http.put<any>(this.url + 'doctors/' + doctorid, body).subscribe((data) => {
        console.log(data);
      });
    });
  }

  public addInteractionToPatient(patientid, interactionId) { //interactions can be an array
    this.getPatientByPatientId(patientid).subscribe((data) => {
        let interactions = data['interactions'];
        //console.log(interactions);
        interactions.push(interactionId);
        const body = {
          interactions: interactions
        };
        this.http.put<any>(this.url + 'patients/' + patientid, body).subscribe((data) => {
          console.log(data);
        });
      });
  }
  public removeInteractionFromPatientHistory(patientid, interactionid) { //statusids can be an array
    this.getPatientByPatientId(patientid).subscribe((data) => {
      let interactionids = data['interactions'];
      //console.log(interactionids);
      const index = interactionids.indexOf(interactionid);
      if (index > -1) {
        interactionids.splice(index,1);
      }
      const body = {
        status_history: interactionids
      };
      this.http.put<any>(this.url + 'patients/' + patientid, body).subscribe((data) => {
        console.log(data);
      });
    });
  }

  public flagInteraction(interactionId: number, flagged: boolean): Observable<any> {
    const body = {
        flagged: flagged
    }
    return this.http.put<any>(this.url + 'interactions/' + interactionId, body);
  }

  public modifyUser(user: any): Observable<any> {
    const body = {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        phone: user.phone,
        account_type: user.account_type,
        email: user.email,
    }
    return this.http.put<any>(this.url + 'users/' + user.id, body);
  }

  public flagPatient(patientid: number, flag: boolean): Observable<any> {
    const body = {
        flagged: flag
    }
    return this.http.put<any>(this.url + 'patients/' + patientid, body);
  }

  //prevent email spam
  public modifyNotifiedPatient(patientid: number, dates: any): Observable<any> {
    const body = {
        notified: dates
    }
    return this.http.put<any>(this.url + 'patients/' + patientid, body);
  }

  public addNotifyPatient(patient, date: any): Observable<any> { //[{date: dd/mm/yyyy}, {date: dd/mm/yyyy}]

        let notified = patient.notified;
        if (notified) {
            notified.push(date);
        }
        else {
            notified = [date];
        }
        const body = {
            notified: notified
        }
        return this.http.put<any>(this.url + 'patients/' + patient.id, body); 
  }

  public updateUserEmail(userid: number, email: string): Observable<any> {
    const body = {
        email: email
    }
    return this.http.put<any>(this.url + 'users/' + userid, body);
  }

  public updateUserPassword(userid: number, password: string): Observable<any> {
    const body = {
        password: password
    }
    return this.http.put<any>(this.url + 'users/' + userid, body);
  }

  public updateUserAddress(userid: number, address: string): Observable<any> {
    const body = {
        address: address
    }
    return this.http.put<any>(this.url + 'users/' + userid, body);
  }

  public updateUserPhone(userid: number, phone: any): Observable<any> {
    const body = {
        phone: phone
    }
    return this.http.put<any>(this.url + 'users/' + userid, body);
  }

  public setReadMessage(messageId: number, read: boolean): Observable<any> {
    const body = {
        read: read
    }
    return this.http.put<any>(this.url + 'messages/' + messageId, body);
  }

  public sendMessage(user: any, target: any, message: any) {
    
    let inbox = target.inbox;
    console.log(target)
    if (inbox) {
        inbox.push(message);
    }
    else {
        inbox = [message];
    }
    const body = {
        inbox: inbox
    }
    let outbox = user.outbox;
    if (outbox) {
        outbox.push(message);
    }
    else {
        outbox = [message];
    }
    const body2 = {
        outbox: outbox
    }
    this.http.put<any>(this.url + 'users/' + target.id, body).subscribe(() => {
        this.http.put<any>(this.url + 'users/' + user.id, body2).subscribe((data) => {
            const messagebody = {
                type: 'New Message',
                target: target.id,
                message_id: message.id
              }
              this.sockets.sendMessage(messagebody);
        })
        
    });

}


  //EMAIL

  public sendMail(recipient: string, subject: string, text: string, replyto: string, html: string, attachments: string, cc: any): Observable<any> { //sends a configurable email, fields can be empty strings/arrays where applicable
    //recipient, subject and text alone are sufficient to send an email.
    const body = {
        to: recipient,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments,
        replyTo: replyto,
        cc: cc
    }
    return this.http.post<any>(this.url + 'email', body);
  }

  public sendMessageToMail(recipient: string, subject: string, text: string): Observable<any> { //sends a configurable email, fields can be empty strings/arrays where applicable
    //recipient, subject and text alone are sufficient to send an email.
    const body = {
        to: recipient,
        subject: subject,
        text: text
    }
    return this.http.post<any>(this.url + 'email', body);
  }

  //specific email endpoints
  public sendCovidNotification(user: any, interaction: any): Observable<any> {
    var date = new Date(Date.parse(interaction.start));
    var humanDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
    const body = {
        to: user.email,
        subject: "Possible contact with Covid-19",
        //Need to covert the start and location into something readable and useful for the user.
        html: "Hello " + user.first_name + " " + user.last_name + ", <br> \
        This email was sent to inform you that on " + humanDate + ", there was a possibly that you may have come into contact \
        with someone who was recently identified to have shown covid-19 symptoms. We highly suggest you monitor your condition for symptoms and book an appointment with a doctor. <br> <br> \
        Thank you,<br> \
        Team 23 of SOEN390 <br> <br> \
        This message was sent automatically, do not reply to this email."
    }
    return this.http.post<any>(this.url + 'email', body);
  }

  public sendFlaggedNotification(user: any): Observable<any> {
    const body = {
        to: user.email,
        subject: "Covid-19 help",
        //Need to covert the start and location into something readable and useful for the user.
        html: "Hello " + user.first_name + " " + user.last_name + ", <br> \
        In light of your tests results that came in positive, we would like to extend to you a list of possible things you may do to alleviate the symptoms (if there are any) as well as keep others safe. \
        1. Take over the counter medicine to alleviate headaches, sneezing, coughing, etc. Be advised that not all medicine will work nor is appropriate for everyone. <br>\
        2. Keep yourself warm and well hydrated. <br> \
        3. Do not strain yourself by doing exercise or work. Take time off to rest and recover. <br> \
        4. Isolate yourself and keep a good hygiene. <br>\
        Although you may not show symptoms, you are still highly infectious. Keep away from others and isolate for at least 2 weeks. Should you wish to learn more, you can visit \
        https://www.fda.gov/emergency-preparedness-and-response/counterterrorism-and-emerging-threats/coronavirus-disease-2019-covid-19.<br> \
        Thank you for keeping others safe. We wish you a smooth and rapid recovery. <br> <br> \
        Best wishes,<br> \
        Team 23 of SOEN390 <br> <br> \
        This message was sent automatically, do not reply to this email."
    }
    return this.http.post<any>(this.url + 'email', body);
  }

  public sendAppointmentNotification(doctorUser: any, user: any, unixTime: number): Observable<any> {
    var date = new Date(unixTime)
    const body = {
        to: user.email,
        subject: "Appointment with doctor.",
        html: "Hello " + user.first_name + " " + user.last_name + ", <br> \
        This is a confirmation email for your scheduled appointment on " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear() + " at " + date.getHours() + ":" + date.getMinutes() + " \
        with Dr. " + doctorUser.first_name + " " + doctorUser.last_name + ".<br>\
        Verify that the above information is correct. Feel free to reach out to your doctor if you have any concerns. <br>\
        <br>\
        Regards,<br>\
        Team 23 of SOEN390 <br> <br> \
        This message was sent automatically, do not reply to this email."
    }
    return this.http.post<any>(this.url + 'email', body);
  }

}
