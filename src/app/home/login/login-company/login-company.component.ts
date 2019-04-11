import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor } from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { EmailService } from 'src/app/shared/email.service';

@Component ({
    templateUrl: 'login-company.component.html',
    styleUrls: ['login-company.component.css'],
    providers: [EmployeeService]
})
export class LoginCompanyComponent {
  isDirty = true;

  employees: Employee[];
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService, private snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
    private emailService: EmailService ) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  openSnackBar() {
    this.snackBar.open('Login is opgeslagen', '', { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
  }

  onSubmit(formValues) {
    const date = new Date();
    const formattedDate = formatDate(date, 'dd-MM-yyyy', 'en');

    this.addVisitor(formValues.lastName, formValues.firstName, formValues.email, true, formValues.company,
       formattedDate, formValues.reason, formValues.appointmentWith.id, formValues.phone);
    this.openSnackBar();
    this.router.navigate(['/home']);
  }

  cancel() {
    this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
  }

  toHome() {
    this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
  }

  getVisitors(): void {
    this.visitorService.getVisitors().subscribe(visitor => (this.visitors = visitor));
  }

  addVisitor(name: string, firstname: string,  email: string, loggedIn: boolean, company: string,
      day: string, subject: string, employee_id: number, telnr?: string): void {
    const newVisitor: Visitor = {name, firstname, email, telnr, company, day, subject, employee_id, loggedIn} as Visitor;
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
