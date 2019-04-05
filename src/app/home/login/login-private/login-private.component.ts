import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor} from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { VisitorService } from 'src/app/shared';
import { MatSnackBar, MatDialogConfig, MatDialog, MatSnackBarConfig } from 'src/app/material';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'login-private.component.html',
    styleUrls: ['login-private.component.css'],
    providers: [EmployeeService]
})
export class LoginPrivateComponent {
  isDirty = true;

  employees: Employee[];
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService,
    private router: Router, private emplservice: EmployeeService, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private dialog: MatDialog ) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  openSnackBar() {
    this.snackBar.open('Login is opgeslagen', '', { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
  }

  onSubmit(formValues) {
    const date = new Date();
    const formattedDate = formatDate(date, 'dd-MM-yyyy', 'en');

    this.addVisitor(formValues.lastName, formValues.firstName, formValues.email,
      formattedDate, formValues.reason, formValues.appointmentWith.id, true, formValues.phone);


    this.openSnackBar();
    this.router.navigate(['/home']);
  }

  cancel() {
    this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
  }

  getVisitors(): void {
    this.visitorService.getVisitors().subscribe(visitor => (this.visitors = visitor));
  }

  addVisitor(name: string, firstname: string, email: string, day: string, subject: string, employee_id: number,
    loggedIn: boolean, telnr?: string): void {
    const newVisitor: Visitor = {name, firstname, email, telnr,  day, subject, employee_id, loggedIn} as Visitor;
    console.log(newVisitor);
    this.visitorService.addVisitor(newVisitor).subscribe();
  }

  openDialog(mes: string) {
    let dialogres = '';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { message: mes };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        dialogres = `${result}`;

        if (dialogres === 'yes') {
            this.router.navigate(['/home']);
        }
    });
  }
}
