import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  DialogComponent,
  EmployeeManagementComponent,
  AppointmentDialogComponent,
  EmailService,
  LoginExistentComponent,
  VisitorService,
  EmployeeResolverService,
  VisitorResolverService,
  VisitorInfoDialogComponent,
  EmployeeEditDialogComponent
  } from './index';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { DatePipe } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from './material';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginCompanyComponent,
    LoginPrivateComponent,
    LogoutComponent,
    NavBarComponent,
    // ManagementComponent,
    // EmployeeDialogComponent,
    DialogComponent,
    // EmployeeManagementComponent,
    // VisitorInfoDialogComponent,
    LoginExistentComponent,
    // AppointmentDialogComponent,
    // EmployeeEditDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
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
    // EmployeeDialogComponent,
    DialogComponent,
    // AppointmentDialogComponent,
    // VisitorInfoDialogComponent,
    // EmployeeEditDialogComponent
  ]
})
export class AppModule { }
