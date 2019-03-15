import { Component, Injectable, OnInit, ViewChild, Inject } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { MatDialogRef } from '@angular/material';
import { Employee } from '../shared';

@Component ({
    templateUrl: 'employee-dialog.component.html',
    styles: [`.example-container {
      height: 400px;
      overflow: auto;
    }

    table {
      width: 100%;
    }

    button {
      margin: 16px 8px;
    }
    `]
})
export class EmployeeDialogComponent implements OnInit {

  constructor(private service: EmployeeService, public dialogRef: MatDialogRef<EmployeeDialogComponent>) {
  }

  ngOnInit() {

  }

  onSubmit(formValues) {
    if (formValues.firstname != null) {
      this.addEmployee(formValues.name, formValues.email, formValues.firstname);
    } else {this.addWOname(formValues.name, formValues.email); }
    this.dialogRef.close();

  }

  onCancel() {
    this.dialogRef.close();
  }

  addEmployee(name: string,  email: string, firstname: string, ) {
    const newEmployee: Employee = {name, firstname, email} as Employee;
    console.log(newEmployee);
    this.service.addEmployee(newEmployee).subscribe();
  }

  addWOname(name: string, email: string) {
    const newEmployee: Employee = {name, email} as Employee;
    console.log(newEmployee);
    this.service.addEmployee(newEmployee).subscribe();
  }
}
