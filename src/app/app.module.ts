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
import { HomeComponent, LoginComponent, LoginCompanyComponent, VisitorService, LoginPrivateComponent, ManagementComponent,
  LogoutComponent, EmployeeService, NavBarComponent, EmployeeDialogComponent, CalendarComponent, LoginDialogComponent,
  EmployeeManagementComponent, AppointmentDialogComponent, VisitService, EmailService, LoginExistentComponent
  } from './index';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { DatePipe } from '@angular/common'


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
    AppointmentDialogComponent,
    LoginExistentComponent
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
    VisitService,
    EmailService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeDialogComponent,
    LoginDialogComponent,
    AppointmentDialogComponent
  ]
})
export class AppModule { }
