import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatusUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status-update',
  templateUrl: 'status-update.html',
})
export class StatusUpdatePage {
	updateForm = this.formBuilder.group({
	date:'',
	temp:'',
	weight:'',
	cough:false,
	head:false,
	throat:false,
	fever:false,
	taste:false,
	tired:false
	});

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusUpdatePage');
  }

  onSubmit(){
		console.log("button click");
		console.log(this.updateForm.value);
  }

}
