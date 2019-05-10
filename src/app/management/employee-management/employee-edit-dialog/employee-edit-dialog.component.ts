import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, 
  ErrorStateMatcher, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService, EmployeeService, Employee, User } from 'src/app/shared';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
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
        console.log(res);
        userjson = res['success'];
        setTimeout(() => {
          if (userjson !== undefined) {
          console.log(userjson)
          let name = userjson['name']; let email = userjson['email']; let id = userjson['id'];
          this.user = { name, email, id } as User;
          this.userEdit = Object.assign({}, this.user);
          console.log(this.userEdit);
          this.userexist = true;
          }
        }, 0);
        this.loading = false;
      });

    } else {
      console.log('no user');
      this.userexist = false;
      this.loading = false;
    }
    this.employeeEdit = {name, firstname, email} as Employee;
    console.log(this.employeeEdit);
  }

  onSubmit() {
    this.progress = true;
    console.log(this.del)
    if (this.cancel !== true) {

      if (this.del === false) {

        this.employee.name = this.employeeEdit.name;
        this.employee.firstname = this.employeeEdit.firstname;
        this.employee.email = this.employeeEdit.email;

          if (this.newuser === true) {
            let result;
            console.log("newuser")
            this.authService.register(this.userEdit)
              .subscribe(res => { 
                result = res['success']; 
                if (result !== undefined) {
                  console.log('fksefkjsenf', result)
                  let token = result['token'];
                  console.log(token);
                  this.employee.user_token = token;

                  setTimeout(() => {
                    this.updateEmployee();
                  }, 300);

                  this.authService.details(result['token']).subscribe(res => {
                    console.log(res);

                    this.snackBar.open('User is opgeslagen.', '',
                    { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});

                    this.edit = false;
                    this.newuser = false;
                    this.progress = false;
                  });

                } else {
                  console.log('ksfkesfnkj')
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
      console.log(res);
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
  //     console.log(res)
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
    this.userEdit = {name, password, c_password, email} as User;
  }

  editpass() {
    this.router.navigate['/management/reset'];
    // this.editp = true;
    // this.userEdit.password = '';
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
              this.authService.delete(this.user).subscribe((ref) => {console.log(ref)});
              this.userexist = false;
              this.newuser = false;
              console.log("dosefhosief");
            }
        });
  }
}
