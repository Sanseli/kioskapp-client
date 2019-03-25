import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdunitService } from './adunit.service';
import { MaterialModule } from './material/material.module';
import {
  HomeComponent,
  LoginComponent,
  LoginCompanyComponent,
  LoginPrivateComponent,
  ManagementComponent,
  LogoutComponent,
  EmployeeService,
  NavBarComponent,
  EmployeeDialogComponent,
  CalendarComponent,
  LoginDialogComponent,
  EmployeeManagementComponent,
  AppointmentDialogComponent,
  EmailService,
  LoginExistentComponent,
  VisitorService,
  EmployeeResolverService,
  VisitorResolverService,
  VisitorInfoDialogComponent,
  } from './index';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { DatePipe } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from './material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginCompanyComponent,
    LoginPrivateComponent,
    LogoutComponent,
    NavBarComponent,
    ManagementComponent,
    EmployeeDialogComponent,
    CalendarComponent,
    LoginDialogComponent,
    EmployeeManagementComponent,
    VisitorInfoDialogComponent,
    LoginExistentComponent,
    AppointmentDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
    ],
  providers: [
    VisitorService,
    AdunitService,
    EmployeeService,
    MessageService,
    HttpErrorHandler,
    EmailService,
    VisitorService,
    DatePipe,
    EmployeeResolverService,
    VisitorResolverService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeDialogComponent,
    LoginDialogComponent,
    AppointmentDialogComponent,
    VisitorInfoDialogComponent,
  ]
})
export class AppModule { }
