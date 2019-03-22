import { Component, OnInit } from '@angular/core';
import { VisitorService, AppointmentService, Appointment, Visitor } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common'

@Component ({
    templateUrl: 'login-existent.component.html',
    styles: [`
    .form-group { padding: 0px; margin-top: 30px; }
    button { margin: 10; margin-left: 0px;}
    .form-group { margin-top: 30px; }
    .t { font-size: 30px; padding:2%;}
    .container {padding: 20px 50px}
    `]
})
export class LoginExistentComponent {
    appointments: Appointment[];
    visitors: Visitor[] = [];
    loaded: boolean;

    constructor(private visitorService: VisitorService, private router: Router, 
        private route: ActivatedRoute) {
            this.appointments = this.route.snapshot.data['appointmentList'];
            this.visitors = this.route.snapshot.data['visitorList'];
    }


    onSubmit(formValues) {
        const app: Appointment = formValues.appointment;
        const name = `${app.name} ${app.firstname}`;
        this.addVisit(app.id, name);
        this.router.navigate(['/home']);
    }

    addVisit(appointment_id: number, name: string) {
        const newVisitor: Visitor = {appointment_id, name} as Visitor;
        if (this.visitors.some(x => (x.appointment_id === appointment_id))) {
            console.log('al ingelogd')
        } else {
            this.visitorService.addVisitor(newVisitor).subscribe();
        }

    }

    cancel() {
        this.router.navigate(['/home']);
    }
}