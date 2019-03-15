import { Component, OnInit, NgModule } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor, Visit } from 'src/app/shared/models';
import { VisitService } from 'src/app/shared';
import { DatePipe, formatDate } from '@angular/common';

@Component ({
    templateUrl: 'login-company.component.html',
    styleUrls: ['login-company.component.css'],
    providers: [EmployeeService]
})
export class LoginCompanyComponent implements OnInit {
  isDirty = true;

  employees: Employee[];
  visitors: Visitor[];
  last: Visitor;

  date: Date;
  formattedDate: string;

  constructor(private visitorService: VisitorService, private emplservice: EmployeeService,
    private router: Router, private visitService: VisitService, private datepipe: DatePipe ) {}

  ngOnInit() {
    this.getEmployees();
    this.getVisitors();
  }

  onSubmit(formValues) {
    this.formattedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    console.log(this.formattedDate)
    this.addVisitor(formValues.lastName, formValues.firstName, formValues.email, formValues.company,
      formValues.reason, this.formattedDate);
    console.log(formValues);
    window.confirm('Login is opgeslagen.');
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

  getEmployees(): void {
    this.emplservice.getEmployees().subscribe(employees => (this.employees = employees));
  }

  getVisitors(): void {
    this.visitorService.getVisitors().subscribe(visitors => (this.visitors = visitors));
  }

  addVisitor(name: string, firstname: string, email: string, company: string, reason: string, day: string): void {
    const newVisitor: Visitor = {name, firstname, email, company, reason, day} as Visitor;
    console.log(newVisitor);
    //this.visitorService.addVisitor(newVisitor).subscribe();
    this.getVisitors();
    this.last = this.visitors[this.visitors.length-1];
    console.log(this.last);
    const fullname =  `${name}  ${firstname}`
    this.addVisit(this.last.id, fullname);
  }

  addVisit(visitor_id: number, name: string) {
    const newVisit: Visit = {visitor_id, name};
    this.visitService.addVisit(newVisit).subscribe();
  }
}
