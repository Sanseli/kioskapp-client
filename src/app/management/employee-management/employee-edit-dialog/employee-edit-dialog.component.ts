import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, ErrorStateMatcher, MatTableDataSource } from '@angular/material';
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
  users: User[];
  editp: boolean;

  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private authService: AuthService) {
    this.employee = data.employee;
    let name = this.employee.name; let firstname = this.employee.firstname; let email = this.employee.email;
    if (this.employee.user_token !== null) {
      let userjson
      this.authService.details(this.employee.user_token).subscribe(res => {userjson = res['success']});
      setTimeout(() => {
        let name = userjson['name']; let email = userjson['email'];
        this.userEdit = { name, email } as User;
        this.userexist = true;
      }, 1000);

    } else {
      console.log('no user');
      this.userexist = false;
    }
    this.employeeEdit = {name, firstname, email} as Employee;
    console.log(this.employeeEdit);
  }

  onSubmit() {
    if (this.cancel !== true) {

      this.employee.name = this.employeeEdit.name;
      this.employee.firstname = this.employeeEdit.firstname;
      this.employee.email = this.employeeEdit.email;

      if (this.userexist === true) {
        if (this.newuser === true) {
          let result = undefined;
          this.authService.register(this.userEdit)
            .subscribe(res => { result = res['success']; });
            setTimeout(() => {
              if (result !== undefined) {
                let token = result['token'];
                console.log(token);
                this.employee.user_token = token;
                setTimeout(() => {
                  this.updateEmployee();
                }, 300);
                this.authService.details(result['token']).subscribe(res => {console.log(res)})
                this.snackBar.open('Nieuwe user is aangemaakt.', '',
                { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
                this.edit = false;
              }
            }, 2500);
        } else {
          setTimeout(() => {
            this.updateEmployee();
            // updateuser
          }, 300);
        }
      } else {

        setTimeout(() => {
          this.updateEmployee();
        }, 300);
      }

    }
  }

  updateEmployee() {
    console.log(this.employee)
    this.service.updateEmployee(this.employee).subscribe();
    this.snackBar.open('Uw wijzigingen zijn opgeslagen.', '',
    { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
    this.edit = false;
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
    let password = ''; let c_password = ''; let email = this.employeeEdit.email;
    this.userEdit = {name, password, email} as User;
  }

  editpass() {
    this.editp = true;
    this.userEdit.password = '';
  }

  // passwordEquals(): boolean {
    
  // }
}
