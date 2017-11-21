import { Router } from '@angular/router';
import { CustServRecordService } from '../cust-serv-record.service';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.css']
})
export class AppointmentNewComponent {

  localities$;
  visitType$;
  staff$;
  productType$;
  brand$;
  status$;
  spareName$;
  appointment:any =   {};

  constructor(
    private elRef: ElementRef, 
    private router: Router,
    private custRecordSvc: CustServRecordService) { 
    this.localities$ = this.custRecordSvc.getAllLocalities();
    this.visitType$ = ["INSTALLATION", "SERVICE"];
    this.staff$ = ["Anand","Kumar","Ranjith","Sarathi","Sathish","Veerasamy","Venkatesh"];
    this.productType$ = ["Chimney","HOB Chimney","Water"];
    this.brand$ = ["Elica","Faber","Gilma","Hindware","Sleek"];
    this.status$ = ["ONGOING","PENDING","COMPLETE"];
    this.spareName$ = ["Motor Light","Oilcup","Red Pipe","AMC","Gastube"];
    Window["myComponent"] = this;
  }
  
  createAppointment(){
    console.log(this.appointment);
    let result = this.custRecordSvc.createAppointment(this.appointment);
    console.log(result);
    
    this.router.navigate(['/appointments/status', result.key]);
  }

  resetAppointmentForm(){
    this.appointment = {};
    
    // this.router.navigate(['/admin/products']);
  }

  room = 1;
  addSpares(){
    console.log('New spares');
    this.room++;
    var objTo = document.getElementById('sparesDiv')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass"+this.room);
    divtest.setAttribute("id", "removeclass"+this.room);
    var rdiv = 'removeclass'+this.room;

    divtest.innerHTML = `
    <div class="form-group row offset-4 mt-4">
      <div class="input-group col-md-3">
        <select #spareName="ngModel" [(ngModel)]="appointment.spareName" name="spareName" 
          id="spareName" class="form-control form-control-sm" required>
          <option value="Motor Light">Motor Light</option>
          <option value="Oilcup">Oilcup</option>
          <option value="Red Pipe">Red Pipe</option>
          <option value="AMC">AMC</option>
          <option value="Gastube">Gastube</option>
        </select>          
      </div>
      <div class="col-md-4">
        <input #spareAmount="ngModel" [(ngModel)]="appointment.spareAmount" name="spareAmount" 
          id="spareAmount" type="text" class="form-control form-control-sm" placeholder="In Rupees" required>
      </div>
      <div class="col-md-1">
        <button id="`+ this.room +`" class="btn btn-sm btn-danger" type="button" 
                                            (click)="removeSpares(`+ this.room +`);"> 
          <i class="fa fa-minus" aria-hidden="true"></i>
        </button>
      </div>
    </div>`;
    
    objTo.appendChild(divtest);

    this.elRef.nativeElement.querySelector('button').
      addEventListener('click', (event) => this.removeSpares(event));
  }

  public removeSpares(rid) {
    console.log('Delete spares');
    var elem = document.getElementById('removeclass2');
    elem.parentNode.removeChild(elem);
  }

}
