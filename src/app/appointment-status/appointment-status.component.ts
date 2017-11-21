import { CustServRecordService } from '../cust-serv-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
// import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css']
})
export class AppointmentStatusComponent {

  appointment: any = {};
  id;
  localities$;
  visitType$;
  staff$;
  productType$;
  brand$;
  status$;
  spareName$;

  minDate = new Date(2017, 0, 1);
  maxDate = new Date();

  constructor(
    // private popup:Popup,
    private route:ActivatedRoute,
    private router: Router,
    private custRecordSvc: CustServRecordService) {
    this.localities$ = this.custRecordSvc.getAllLocalities();
    this.visitType$ = ["INSTALLATION", "SERVICE"];
    this.staff$ = ["Anand","Kumar","Ranjith","Sarathi","Sathish","Veerasamy","Venkatesh"];
    this.productType$ = ["Chimney","HOB Chimney","Water"];
    this.brand$ = ["Elica","Faber","Gilma","Hindware","Sleek"];
    this.status$ = ["ONGOING","PENDING","COMPLETE"];
    this.spareName$ = ["Motor Light","Oilcup","Red Pipe","AMC","Gastube"];
    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Status:'+this.id);
    
    if(this.id)
      this.custRecordSvc.get(this.id).subscribe(p=>{
        console.log(p);
        this.appointment=p
      });
  }

  updateAppointment(){
    console.log('updateAppointment:',this.id);
    console.log(this.appointment);
    let result = this.custRecordSvc.updateAppointment(this.id, this.appointment);
    console.log(result);
    // this.popup.show();
    
    // this.router.navigate(['/appointments/status', result]);
  }

  deleteAppointment(){
    console.log('deleteAppointment');
  }

  addSpares(){
    console.log('Adding new spare');
  }
}
