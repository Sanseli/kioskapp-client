import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { AuthService, EmployeeService, Employee, User } from 'src/app/shared';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable, observable } from 'rxjs';


@Component ({
    templateUrl: 'employee-edit-dialog.component.html',
    styleUrls: [`employee-edit-dialog.component.css`]
})
export class EmployeeEditDialogComponent {
  cancel: boolean;
  edit = false;
  isDirty = true;
  employee: Employee;
  employeeEdit: Employee;
  userexist: boolean;
  newuser: boolean;
  userEdit: User;
  user: User;
  alerts:any;

  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private authService: AuthService) {
    this.employee = data.employee;
    const name = this.employee.name; const firstname = this.employee.firstname; const email = this.employee.email;

    if (this.employee.user_id !== null) {
      console.log(this.employee.user_id);
      this.userexist = true;
    } else {
      console.log('no user');
      this.userexist = false;
    }
    this.employeeEdit = {name, firstname, email} as Employee;
    console.log(this.employeeEdit);
  }

  onSubmit() {
    if (this.cancel !== true) {

      if (this.userexist === true) {
        if (this.newuser === true) {
          let myData;
          this.authService.register(this.userEdit)
            .subscribe(res => {myData = res;});
            setTimeout(() => {
              console.log(myData);
              let id = myData[0];
              this.snackBar.open('Nieuwe user is aangemaakt.', '',
              { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
              this.edit = false;
            }, 2500);
        }
      }
      this.employee.name = this.employeeEdit.name;
      this.employee.firstname = this.employeeEdit.firstname;
      this.employee.email = this.employeeEdit.email;
      setTimeout(() => {
        this.service.updateEmployee(this.employee).subscribe();
        this.snackBar.open('Uw wijzigingen zijn opgeslagen.', '',
        { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
        this.edit = false;
      }, 300);

      
    }
  }

  setReturnData(data) {
    this.alerts = data;
  }

  onCancel() {
    this.cancel = true;
    this.edit = false;
    if (this.newuser === true) {
      this.newuser = false;
      this.userexist = false;
    }
  }

  toggleEdit() {
    if (!this.edit) {
      this.edit = true;
    } else if (this.edit) {
      this.edit = false;
    }
    console.log(this.edit);
  }

  close() {
    this.dialogRef.close();
  }

  newUser() {
    this.edit = true;
    this.newuser = true;
    this.userexist = true;
    let name = this.employeeEdit.firstname.replace(/ /g, '') + '.' + this.employeeEdit.name.replace(/ /g, ''); 
    let password = ''; let c_password = '';
    this.userEdit = {name, password} as User;
  }

  // passwordEquals(): boolean {
    
  // }
}
