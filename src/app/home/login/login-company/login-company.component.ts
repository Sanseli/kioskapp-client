import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor } from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { EmailService } from 'src/app/shared/email.service';
import { timingSafeEqual } from 'crypto';

@Component ({
    templateUrl: 'login-company.component.html',
    styleUrls: ['login-company.component.css'],
    providers: [EmployeeService]
})
export class LoginCompanyComponent {
  isDirty = true;
  progress = false;
  employees: Employee[];
  visitors: Visitor[] = [];

  @ViewChild('loginForm') formValues;

  constructor(private visitorService: VisitorService, private snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
    private emailService: EmailService ) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  onSubmit(formValues) {
    this.progress = true;
    const date = new Date();
    const formattedDate = formatDate(date, 'dd-MM-yyyy', 'en');

    this.addVisitor(formValues.lastName, formValues.firstName, formValues.email, true, formValues.company,
       formattedDate, formValues.reason, formValues.appointmentWith.id, formValues.phone);
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

    this.visitorService.addVisitor(newVisitor).subscribe(res => {
      console.log(res)
      if (res['id'] !== undefined) {
        this.snackBar.open('Login is opgeslagen', '', {
          panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.progress = false;
        this.router.navigate(['/home']);

      } else {
        this.snackBar.open('Er is iets mis gegaan, probeer opnieuw.', '', {
          panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.progress = false;
        this.formValues.resetForm();
      }
    });
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
