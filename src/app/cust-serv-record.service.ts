import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CustServRecordService {

  constructor(private db:AngularFireDatabase) { }

  getAll(){
    return this.db.list('/appointments').snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          $key: c.payload.key, 
          ...c.payload.val() 
        }));
      });
  }

  get(appointmentId){
    return this.db.object('/appointmentsTest/'+appointmentId).snapshotChanges()
    .map(changes => ({
        key: changes.payload.key, 
        ...changes.payload.val() 
    }));
  }

  getAreaWise(){
    return this.db.list('/appointments', ref => ref.orderByChild('area').equalTo('Salem')).snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          $key: c.payload.key, 
          ...c.payload.val() 
        }));
      });
  }

  getAllLocalities(){
    // return this.db.list('/localities', ref => ref.orderByChild('count')).snapshotChanges()
    return this.db.list('/localities').snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          locality: c.payload.key, 
          ...c.payload.val() 
        }));
      });
  }

  storeLocalities(){
    var locality = []; var count = [];
    this.getAreaWise()
      .subscribe(appointments => {
        console.log(appointments);
      });
  }

  createAppointment(appointment){
    return this.db.list('/appointmentsTest').push(appointment);
  }

  updateAppointment(appointmentId, appointment){
    return this.db.object('/appointmentsTest/'+appointmentId).update(appointment);
  }
}
