import { Component, OnInit } from '@angular/core';
import { VisitorService, Visitor } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

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
    visitors: Visitor[];

    constructor(private visitorService: VisitorService, private router: Router, 
        private route: ActivatedRoute) {
            const formattedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
            this.visitors = this.route.snapshot.data['visitorList'].filter(a => (a.loggedIn === 0 && a.day === formattedDate));
            console.log(this.visitors)
    }


    onSubmit(formValues) {
        const app: Visitor = formValues.visitor;
        app.loggedIn = true;
        console.log(app);
        this.visitorService.updateVisitor(app).subscribe();
        this.router.navigate(['/home']);
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}