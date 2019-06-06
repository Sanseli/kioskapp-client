import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, 
  ErrorStateMatcher, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService, EmployeeService, Employee, User } from 'src/app/shared';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'employee-edit-dialog.component.html',
    styleUrls: [`employee-edit-dialog.component.css`]
})
export class EmployeeEditDialogComponent {
  loading = true;
  progress = false;
  cancel: boolean;
  edit = false;
  isDirty = true;
  employee: Employee;
  employeeEdit: Employee;
  userexist: boolean;
  newuser: boolean;
  userEdit: User;
  user: User;
  alerts: any;
  users: User[];
  editp: boolean;
  del: boolean;

  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private authService: AuthService,
    private router: Router, public dialog: MatDialog) {
    this.employee = data.employee;
    const name = this.employee.name; const firstname = this.employee.firstname; const email = this.employee.email;
    this.del = false;
    if (this.employee.user_token !== null) {
      let userjson: any;
      this.authService.details(this.employee.user_token).subscribe(res => {
        userjson = res['success'];
        setTimeout(() => {
          if (userjson !== undefined) {
          let name = userjson['name']; let email = userjson['email']; let id = userjson['id'];
          this.user = { name, email, id } as User;
          this.userEdit = Object.assign({}, this.user);
          this.userexist = true;
          }
        }, 0);
        this.loading = false;
      });

    } else {
      this.userexist = false;
      this.loading = false;
    }
    this.employeeEdit = {name, firstname, email} as Employee;
  }

  onSubmit() {
    if (this.cancel !== true) {

      if (this.del === false) {
        this.progress = true;

        this.employee.name = this.employeeEdit.name;
        this.employee.firstname = this.employeeEdit.firstname;
        this.employee.email = this.employeeEdit.email;

          if (this.newuser === true) {
            let result;
            this.authService.register(this.userEdit)
              .subscribe(res => { 
                result = res['success']; 
                if (result !== undefined) {
                  let token = result['token'];
                  this.employee.user_token = token;

                  setTimeout(() => {
                    this.updateEmployee();
                  }, 300);

                  this.authService.details(result['token']).subscribe(res => {
                    this.snackBar.open('User is opgeslagen.', '',
                    { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});

                    this.edit = false;
                    this.newuser = false;
                    this.progress = false;
                  });

                } else {
                  this.snackBar.open('User is niet opgeslagen, controlleer het wachtwoord a.u.b.', '',
                    { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
                }
              });
        } else {

        setTimeout(() => {
          this.updateEmployee();
        }, 300);
      }
      }
    }
  }

  updateEmployee() {
    this.service.updateEmployee(this.employee).subscribe((res) => {
      this.snackBar.open('Uw wijzigingen zijn opgeslagen.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
      this.edit = false;
      this.progress = false;
    });
  }

  // updateUser() {
  //   this.user.name = this.employee.firstname.replace(/ /g, '') + '.' + this.employee.name.replace(/ /g, '');
  //   if (this.userEdit !== undefined) {
  //     this.user.password = this.userEdit.password;
  //     this.user.c_password = this.userEdit.c_password;
  //   } else {
  //     //this.user.c_password = this.user.password;
  //   }

  //   this.authService.update(this.user).subscribe((res) => {
  //   })
  // }

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
    this.userEdit = {name, password, c_password, email} as User;
  }

  editpass() {
    this.router.navigate['/management/reset'];
  }

  deleteUser() {
    this.del = true;
    let dialogres = '';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { message: 'Weet u zeker dat u deze user wilt verwijderen?' };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      dialogres = `${result}`;

      if (dialogres === 'yes') {
        if (this.user.id !== undefined) {
          this.progress = true;
          this.authService.delete(this.user.id).subscribe((ref) => {
            if (ref === 204) {
              this.userexist = false;
              this.newuser = false;
              this.progress = false;
              this.del = false;
              this.snackBar.open('User is verwijderd', '',
              { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});

            } else {
              this.snackBar.open('Verwijderen van user is mislukt, probeer opnieuw.', '',
              { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
              this.progress = false;
              this.del = false;
            }
          });
        }
      }
    });
  }
}
