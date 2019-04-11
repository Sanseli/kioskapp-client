import { AppointmentComponent, EmployeeDialogComponent, EmployeeManagementComponent,
AppointmentDialogComponent, VisitorInfoDialogComponent, EmployeeEditDialogComponent, 
ManagementComponent } from './index';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { managementRoutes } from './management.routes';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppointmentComponent,
        EmployeeDialogComponent,
        EmployeeManagementComponent,
        AppointmentDialogComponent,
        VisitorInfoDialogComponent,
        EmployeeEditDialogComponent,
        ManagementComponent
    ],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        RouterModule.forChild(managementRoutes)
    ],
    providers: [],
    entryComponents: [
        EmployeeDialogComponent,
        AppointmentDialogComponent,
        VisitorInfoDialogComponent,
        EmployeeEditDialogComponent
    ]
})
export class ManagementModule { }