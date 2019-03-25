import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor } from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material';

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
    private router: Router, private route: ActivatedRoute ) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  openSnackBar() {
    this.snackBar.open('Login is opgeslagen', '', { panelClass: ['blue-snackbar']});
  }

  onSubmit(formValues) {
    const date = new Date();
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en');

    this.addVisitor(formValues.lastName, formValues.firstName, formValues.email, true, formValues.company,
       formattedDate, formValues.reason, formValues.appointmentWith.id, formValues.phone);
    this.openSnackBar();
    this.router.navigate(['/home']);
  }

  cancel() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
        this.router.navigate(['/home']);
    }
  }

  toHome() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
      this.router.navigate(['/home']) ;
    }
  }

  getVisitors(): void {
    this.visitorService.getVisitors().subscribe(visitor => (this.visitors = visitor));
  }

  addVisitor(name: string, firstname: string,  email: string, loggedIn: boolean, company: string,
      day: string, subject: string, employee_id: number, telnr?: string): void {
    const newVisitor: Visitor = {name, firstname, email, telnr, company, day, subject, employee_id, loggedIn} as Visitor;
    this.visitorService.addVisitor(newVisitor).subscribe();
  }
}
