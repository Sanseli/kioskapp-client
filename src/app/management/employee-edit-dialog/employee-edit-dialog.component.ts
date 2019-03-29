import { Component, Injectable, OnInit, ViewChild, Inject } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatDialogRef } from '@angular/material';
import { Employee } from '../../shared';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';

@Component ({
    templateUrl: 'employee-edit-dialog.component.html',
    styles: [`

    `]
})
export class EmployeeEditDialogComponent {

  constructor(private service: EmployeeService, public dialogRef: MatDialogRef<EmployeeEditDialogComponent>) {
  }

  onSubmit() {

  }
  
  onCancel() {

  }

}
