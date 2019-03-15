import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Visitor, Visit } from 'src/app/shared/models'
import { VisitService } from 'src/app/shared/visit.service'
import { VisitorService } from 'src/app/shared/visitor.service';

@Component ({
    templateUrl: 'logout.component.html',
    styles: [`
        h2 { padding: 30px;}
        .form-group { padding: 25px; margin-top: 30px; }
        button { margin: 10; margin-left: 25px;}
        .form-group { margin-top: 30px; }
        .example-fill-remaining-space { flex: 1 1 auto;}
    `]

    
})
export class LogoutComponent implements OnInit{
    visits: Visit[] = [];
    visitors: Visitor[] = [];
    visitor: Visitor[] = [];
    visit: Visit

    constructor(private router:Router, private visitService: VisitService, private visitorService: VisitorService){

    }

    ngOnInit() {
        this.getVisits()
        }

    onSubmit(formValues) {
       // this.deleteVisit(formValues.visit)
               this.visit = formValues.visit
               console.log(this.visitorService.getVisitor(this.visit.visitor_id).subscribe(visitors => (this.visitors = visitors)))
               console.log(this.visitors)

    }

    cancel() {
        if (window.confirm("Weet u zeker dat u de pagina wilt verlaten?")){
            this.router.navigate(['/home'])
        }
    }

    toHome() {
        if (window.confirm("Weet u zeker dat u de pagina wilt verlaten?")){
            this.router.navigate(['/home'])
        }
    }

    getVisits():void {
        this.visitService.getVisits().subscribe(visits => (this.visits = visits))
    }

    deleteVisit(visit): void {
        this.visits = this.visits.filter(h => h !== visit)
        this.visitService.deleteVisit(visit.id).subscribe()
    }

    getVisitors():void {
        this.visitorService.getVisitors().subscribe(visitors => (this.visitors = visitors));
    }
}