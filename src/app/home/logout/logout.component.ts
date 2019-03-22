import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Visitor, Appointment } from 'src/app/shared/models';
import { VisitorService } from 'src/app/shared/visitor.service';
import { AppointmentService } from 'src/app/shared';

@Component ({
    templateUrl: 'logout.component.html',
    styles: [`
        .form-group { padding: 0px; margin-top: 30px; }
        button { margin: 10; margin-left: 0px;}
        .form-group { margin-top: 30px; }
        .t { font-size: 30px; padding:2%;}
        .container {padding: 20px 50px}

    `]


})
export class LogoutComponent {
    appointments: Appointment[] = [];
    visitors: Visitor[] = [];

    constructor(private router: Router, private route: ActivatedRoute,
        private appointmentService: AppointmentService, private visitorService: VisitorService) {
        this.visitors = this.route.snapshot.data['visitorList'];
    }

    onSubmit(formValues) {
       this.deleteVisit(formValues.visitor);
       this.router.navigate(['/home']);
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

    deleteVisit(visitor): void {
        this.visitors = this.visitors.filter(h => h !== visitor);
        this.visitorService.deleteVisitor(visitor.id).subscribe();
    }
}
