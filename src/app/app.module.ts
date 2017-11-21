import { DatepickerModule } from 'angular-mat-datepicker';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { CustServRecordService } from './cust-serv-record.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Angular Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { PopupModule } from 'ng2-opd-popup';

import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './auth-guard.service';
import { ChartModule } from 'angular2-chartjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CustomersComponent } from './customers/customers.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppointmentNewComponent } from './appointment-new/appointment-new.component';
import { AppointmentStatusComponent } from './appointment-status/appointment-status.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpareComponent } from './spare/spare.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    AppointmentsComponent,
    CustomersComponent,
    InventoryComponent,
    AppointmentNewComponent,
    AppointmentStatusComponent,
    SpareComponent
  ],
  imports: [
    AngularFireAuthModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // PopupModule.forRoot(),   
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path:'login', component: LoginComponent},
      {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
      {path:'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
      {path:'appointments/new', component: AppointmentNewComponent, canActivate: [AuthGuard]},
      {path:'appointments/status/:id', component: AppointmentStatusComponent, canActivate: [AuthGuard]},
      {path:'customers', component: CustomersComponent, canActivate: [AuthGuard]},
      {path:'inventory', component: InventoryComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [
    CustServRecordService,
    AuthService,
    AuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'en-IN'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
