import { Component, Inject } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Employee } from '../../../shared/models';

@Component ({
    templateUrl: 'employee-edit-dialog.component.html',
    styleUrls: [`employee-edit-dialog.component.css`]
})
export class EmployeeEditDialogComponent {
  isDirty = true;
  employee: Employee;
  employeeEdit: Employee;

  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
      this.employee = data.employee;
      const name = this.employee.name; const firstname = this.employee.firstname; const email = this.employee.email;
      this.employeeEdit = {name, firstname, email} as Employee;
      console.log(this.employeeEdit);
  }

  onSubmit() {
    this.employee.name = this.employeeEdit.name;
    this.employee.firstname = this.employeeEdit.firstname;
    this.employee.email = this.employeeEdit.email;
    setTimeout(() => {
      this.service.updateEmployee(this.employee).subscribe();
      this.snackBar.open('Uw wijzigingen zijn opgeslagen.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
      this.dialogRef.close();
    }, 300);

  }

  onCancel() {
    this.dialogRef.close();
  }

}
