import { Component, Injectable, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Employee, EmployeeService } from 'src/app/shared';

@Component ({
    templateUrl: 'employee-dialog.component.html',
    styleUrls: [`employee-dialog.component.css`]
})
export class EmployeeDialogComponent {

  constructor(private service: EmployeeService, public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private snackBar: MatSnackBar) {
  }

  onSubmit(formValues) {
    if (formValues.firstname != null) {
      this.addEmployee(formValues.name, formValues.email, formValues.firstname);
    } else {this.addWOname(formValues.name, formValues.email); }
    this.snackBar.open('Nieuwe werknemer is opgeslagen.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
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
