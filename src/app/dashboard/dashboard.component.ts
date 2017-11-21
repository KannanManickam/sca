import { Localities } from '../models/Localities';
import { CustSvcRecords } from './../models/CustSvcRecords';
import { CustServRecordService } from '../cust-serv-record.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  custSvcRecords : CustSvcRecords[];
  subscription : Subscription;
  tableResource: DataTableResource<CustSvcRecords>;
  upcomingRows;
  completedRows;
  itemCount : number;
  chartType;chartData;chartOptions;
  labels = []; data = [];
  backgroundColor = ["#FFC133","#DAF7A6","#FFC300","#fd7e14","#17a2b8","#20c997",
                      "#FF5733","#C70039","#900C3F","#00FFFF","#008080","#008000","#808000"];

  constructor(private custRecordSvc: CustServRecordService) { 
    this.subscription = this.custRecordSvc.getAll()
        .subscribe(records => {
          this.custSvcRecords = records;
          // this.initializeUpcomingDataTable(records);
          // this.initializeCompletedDataTable(records);
          this.filterByStatus('ONGOING');
          this.filterByStatus('COMPLETE');
        });
    
    this.setChartData();
    this.setChartDetails();
  }

  private initializeUpcomingDataTable(records: CustSvcRecords[]){
    this.tableResource = new DataTableResource(records);
    this.tableResource.query({})
      .then(items => this.upcomingRows = items);
    
    // this.tableResource.count()
    //   .then(count => this.itemCount = count);
  }

  private initializeCompletedDataTable(records: CustSvcRecords[]){
    this.tableResource = new DataTableResource(records);
    this.tableResource.query({})
      .then(items => this.completedRows = items);
    
    // this.tableResource.count()
    //   .then(count => this.itemCount = count);
  }

  private filterByStatus(query: string){
    let filteredProducts = (query) ?
      this.custSvcRecords.filter(p => p.status.toLowerCase().includes(query.toLowerCase())) :
      this.custSvcRecords;
    
    if(query === 'ONGOING')
      this.initializeUpcomingDataTable(filteredProducts);
    else if(query === 'COMPLETE')
      this.initializeCompletedDataTable(filteredProducts);
  }

  filter(query: string){
    let filteredProducts = (query) ?
      this.custSvcRecords.filter(p => p.customerName.toLowerCase().includes(query.toLowerCase())) :
      this.custSvcRecords;
    
    this.initializeUpcomingDataTable(filteredProducts);
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-COMPLETE': value === 'COMPLETE',
      'is-ONGOING': value === 'ONGOING',
      'is-PENDING': value === 'PENDING'
    };
  }

  private setChartData(){
    this.chartType = 'doughnut';
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor : this.backgroundColor
        }
      ]
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };
  }

  private setChartDetails(){
    this.custRecordSvc.getAllLocalities()
      .subscribe(localities => {
        this.labels = []; this.data = [];
        localities.forEach(element => {
          if(element.count>8){
            this.labels.push(element.locality);
            this.data.push(element.count);
          }
        });
        this.setChartData();
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
