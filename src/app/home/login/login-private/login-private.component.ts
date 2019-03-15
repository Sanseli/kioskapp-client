import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor, Visit } from 'src/app/shared/models';
import { VisitService } from 'src/app/shared/visit.service';
import { EmailService } from 'src/app/shared';
import { DatePipe, formatDate } from '@angular/common';

@Component ({
    templateUrl: 'login-private.component.html',
    styleUrls: ['login-private.component.css'],
    providers: [EmployeeService, VisitorService]
})
export class LoginPrivateComponent implements OnInit {
  isDirty = true;
  
  employees: Employee[] = [];
  visitors: Visitor[] = [];
  date: Date;
  formattedDate: string;

  public form = { email: null};

  constructor(private visitorService: VisitorService,
    private router: Router, private emplservice: EmployeeService, 
    private visitService: VisitService, private emailService: EmailService,
    private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.getEmployees() ;
    this.getVisitors();
  }

  onSubmit(formValues) {
    this.formattedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    console.log(this.formattedDate)
    this.addVisitor(formValues.lastName, formValues.firstName, formValues.reason, formValues.email, this.formattedDate);

    this.addVisit();
    window.confirm('Login is opgeslagen.');
    this.router.navigate(['/home']);

  }

  handleResponse(res) {
    this.form.email = null;
  }

  cancel() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
      this.router.navigate(['/home']);
    }
  }

  toHome() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
      this.router.navigate(['/home']);
    }
  }

  getEmployees(): void {
    this.emplservice.getEmployees().subscribe(employees => (this.employees = employees));
    
  }

  getVisitors(): void {
    this.visitorService.getVisitors().subscribe(visitors => (this.visitors = visitors));
    console.log(this.visitors.length)
  }

  addVisitor(name: string, firstname: string, reason: string, email: string, day: string): void {
    const newVisitor: Visitor = {name, firstname, email, reason, day} as Visitor;
    this.visitorService.addVisitor(newVisitor).subscribe();
  }

  addVisit() {
    this.visitors = []
    this.getVisitors();

    let name: string;
    let visitor_id: number;
    let last: Visitor;

    if (this.visitors.length !== 0) {
      last = this.visitors[this.visitors.length -1];
      name =  `${last.name}  ${last.firstname}`
      visitor_id = last.id;

      const newVisit: Visit = {visitor_id, name};
      console.log(newVisit)
      this.visitService.addVisit(newVisit).subscribe();
    }
  }
}
