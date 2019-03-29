import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort, Sort } from '../material';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { Visitor,  Employee } from '../shared/models';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VisitorService, EmployeeService } from '../shared';
import { VisitorInfoDialogComponent } from './visitor-info-dialog/visitor-info-dialog.component';
import { DialogComponent } from '../shared/dialog-component/dialog.component';

@Component({
    templateUrl: 'management.component.html',
    styleUrls: [`management.component.css`]
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

        
        dialogConfig.data =  { comp: componentData };
        const dialogRef = this.dialog.open(AppointmentDialogComponent, dialogConfig);

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

    logInOut(visitor: Visitor) {
        let message = '';
        let dialogres = '';

        if (visitor.loggedIn) {
            message = `Bezoeker ${visitor.name} ${visitor.firstname} uitloggen?`;
        } else {
            message = `Bezoeker ${visitor.name} ${visitor.firstname} inloggen?`;
        }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { message: message };
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
            dialogres = `${result}`;
    
            if (dialogres === 'yes') {
                
                if (visitor.loggedIn) {
                    visitor.loggedIn = false;
                } else {
                    visitor.loggedIn = true;
                }

                this.visitorService.updateVisitor(visitor).subscribe();
                setTimeout(() => {
                    this.loadData();
                }, 500);
            }
        });
    }
}
