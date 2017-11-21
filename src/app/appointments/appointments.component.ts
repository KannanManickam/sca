import { ActivatedRoute } from '@angular/router';
import { CustSvcRecords } from './../models/CustSvcRecords';
import { CustServRecordService } from '../cust-serv-record.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  appointments : CustSvcRecords[] = [];
  filteredAppointments : CustSvcRecords[] = [];
  localities$;
  subscription : Subscription;
  tableResource: DataTableResource<CustSvcRecords>;
  rows;
  itemCount : number;

  constructor(private route: ActivatedRoute, private custRecordSvc: CustServRecordService) { 
    this.subscription = this.custRecordSvc.getAll()
        .subscribe(records => {
          this.appointments = records;
          this.initializeDataTable(records);
        });
    
    this.localities$ = this.custRecordSvc.getAllLocalities();
  }

  private initializeDataTable(records: CustSvcRecords[]){
    this.tableResource = new DataTableResource(records);
    this.tableResource.query({})
      .then(items => this.rows = items);
    
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.rows = items);
  }

  filter(query: string){
    let filteredAppointments = (query) ?
      this.appointments.filter(p => p.customerName.toLowerCase().includes(query.toLowerCase())) :
      this.appointments;
    
    this.initializeDataTable(filteredAppointments);
  }

  onLocalityChange(locality){
    console.log('Loc:', locality);
    this.filteredAppointments = (locality) ?
    this.appointments.filter(p => p.area === locality) :
    this.appointments;
  
    this.initializeDataTable(this.filteredAppointments);
  }

  onStatusChange(status){
    console.log('Status:',status);
    this.filteredAppointments = (status) ?
    this.appointments.filter(p => p.status === status) :
    this.appointments;
  
    this.initializeDataTable(this.filteredAppointments);
  }


  // private populateAppointments(){
  //   this.custRecordSvc.getAll()
  //     .switchMap(appointments => {
  //       this.appointments = appointments;
  //       return this.route.queryParamMap;
  //     })
  //     .subscribe(params=>{
  //       this.locality = params.get('locality');
  //       this.applyFilter();      
  //     });
  // }  

  getCellClass({ row, column, value }): any {
    return {
      'is-COMPLETE': value === 'COMPLETE',
      'is-ONGOING': value === 'ONGOING',
      'is-PENDING': value === 'PENDING'
    };
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
