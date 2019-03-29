import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../material';
import { Visitor, Employee,  } from '../../shared/models';
import { EmployeeService } from '../../shared';

@Component ({
    templateUrl: 'visitor-info-dialog.component.html',
    styles: [`
    `]
})
export class VisitorInfoDialogComponent {
  appointmentWith: Employee;

  constructor(public dialogRef: MatDialogRef<VisitorInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService) {
  }
}
