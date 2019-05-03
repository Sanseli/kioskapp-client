import { AppointmentComponent, EmployeeDialogComponent, EmployeeManagementComponent,
AppointmentDialogComponent, VisitorInfoDialogComponent, EmployeeEditDialogComponent,
ManagementComponent, EqualValidator, ResetPasswordComponent, ResetPasswordTokenComponent } from './index';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { managementRoutes } from './management.routes';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../guards/auth-guard.service';

@NgModule({
    declarations: [
        AppointmentComponent,
        EmployeeDialogComponent,
        EmployeeManagementComponent,
        AppointmentDialogComponent,
        VisitorInfoDialogComponent,
        EmployeeEditDialogComponent,
        ManagementComponent,
        ResetPasswordComponent,
        ResetPasswordTokenComponent,
        EqualValidator
    ],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        RouterModule.forChild(managementRoutes)
    ],
    providers: [AuthGuardService],
    entryComponents: [
        EmployeeDialogComponent,
        AppointmentDialogComponent,
        VisitorInfoDialogComponent,
        EmployeeEditDialogComponent
    ]
})
export class ManagementModule { }