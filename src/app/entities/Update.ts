import {AccountType} from './AccountType';
import {FormControl} from '@angular/forms';

export class Update {
  static allUpdates: Update[] = [];
  date: Date;
  temp: number;
  weight: number;
  cough: boolean;
  head: boolean;
  throat: boolean;
  fever: boolean;
  taste: boolean;
  tired: boolean;
  patient_id: number;


  constructor(date: Date,
  temp: number,
  weight: number,
  cough: boolean,
  head: boolean,
  throat: boolean,
  fever: boolean,
  taste: boolean,
  tired: boolean,
  /* patient_id: number */)
  {
    this.date = date;
    this.temp = temp;
    this.weight = weight;
    if (cough !== true)
      {cough  = false;}
    this.cough = cough;
    if (head !== true)
    {head  = false;}
    this.head = head;
    if (throat !== true)
    {throat  = false;}
    this.throat = throat;
    if (fever !== true)
    {fever  = false;}
    this.fever = fever;
    if (taste !== true)
  {taste  = false;}
    this.taste = taste;
    if (tired !== true)
  {tired  = false;}
    this.tired = tired;
    /* this.patient_id = patient_id; */
  }
}
