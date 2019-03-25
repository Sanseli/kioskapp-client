import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort, Sort } from '../material';
import { AppointmentDialogComponent } from './appointment-dialog.component';
import { Visitor,  Employee } from '../shared/models';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VisitorService, EmployeeService } from '../shared';
import { VisitorInfoDialogComponent } from './visitor-info-dialog.component';

@Component({
    templateUrl: 'management.component.html',
    styles: [`
    mat-form-field.filter {
        font-size: 14px;
        width: 80%;
    }
    mat-form-field.filterDate {
        font-size: 14px;
        width: 20%
    }
    mat-table { width: 100%;}
    .buttons { width: 100%, float: right;}
    mat-menu { width: 500px}
    .sort { margin-left: 3%; margin-right: 3%;}
    mat-table { max-height: 550px; overflow: auto;}
    .menu { margin-left: 1%; margin-top: 1%;}
    `]
})
export class ManagementComponent {
    visitors: Visitor[];
    employees: Employee[];
    visitorWith: Employee;
    visitorsperDay: Visitor[];
    listData: MatTableDataSource<Visitor>;
    displayedColumns = [ 'loggedIn', 'name', 'firstname', 'company', 'subject', 'actions'];
    searchKey = '';
    events: string[] = [];
    day: Date;
    visitor: Visitor;




    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, public dialog: MatDialog, private route: ActivatedRoute,
        private visitorService: VisitorService, private employeeService: EmployeeService) {
        this.visitors = this.route.snapshot.data['visitorList'];
        this.employees = this.route.snapshot.data['employeeList'];
        this.loadData();
    }


    loadData() {
        if (this.visitors != null) {
            this.visitorService.getVisitors().subscribe(visitors => (this.visitors = visitors));
        }

        setTimeout(() => {
            this.day = new Date();
            const formattedDate = formatDate(this.day, 'yyyy-MM-dd', 'en');

            this.listData = new MatTableDataSource(this.visitors.filter(function(visitor) {
                return visitor.day === formattedDate;
            }));
        }, 1000);

    }

    addEvent(type: Date, event: MatDatepickerInputEvent<Date>) {
        const date = formatDate(event.value, 'yyyy-MM-dd', 'en');
        this.listData = new MatTableDataSource(this.visitors.filter(function(visitor) {
            return visitor.day === date;
        }));
    }

    toEmployees() {
        this.router.navigate(['management/employee']);
    }

    newAppointment() {
        const componentData: any = { visitors: this.visitors, employees: this.employees };

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(AppointmentDialogComponent, { data: { comp: componentData }});

        dialogRef.afterClosed().subscribe(result => {
            setTimeout(() => {
                this.loadData();
            }, 700);
        });
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();

        if (this.listData.paginator) {
          this.listData.paginator.firstPage();
        }
    }

    onSearchClear() {
        this.searchKey = '';
        this.applyFilter();
    }

    info(visitor: Visitor) {
        this.visitor = visitor;
        this.visitorWith = this.employees.find(x => (x.id === this.visitor.employee_id));

        setTimeout(() => {
            const componentData: any = { visitor: this.visitor, employee: this.visitorWith };

            const dialogRef = this.dialog.open(VisitorInfoDialogComponent, { width: '600px', data: { comp: componentData }
            });
        }, 500);
    }

    logout(visitor: Visitor) {
        if (window.confirm('Bezoeker ' + visitor.name + ' ' + visitor.firstname + ' uitloggen?')) {
            visitor.loggedIn = false;
            this.visitorService.updateVisitor(visitor).subscribe();
            setTimeout(() => {
                this.loadData();
            }, 500);
        }
    }
}
