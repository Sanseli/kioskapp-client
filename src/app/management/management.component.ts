import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '../material';
import { AppointmentDialogComponent } from './appointment-dialog.component';
import { Visitor, Appointment } from '../shared/models';
import { formatDate } from '@angular/common';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppointmentService } from '../shared';
import { VisitorDialogComponent } from './visitor-dialog.component';

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
    appointments: Appointment[];
    visitorsperDay: Visitor[];
    listData: MatTableDataSource<Appointment>;
    displayedColumns = ['name', 'firstname', 'company', 'subject', 'actions'];
    searchKey = '';
    events: string[] = [];
    day: Date;


    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, public dialog: MatDialog, private route: ActivatedRoute,
        private appointmentService: AppointmentService) {
        this.loadData();
    }

    loadData() {
        if (this.appointments != null) {
            this.appointmentService.getAppointments().subscribe(appointments => (this.appointments = appointments));
        } else {
            console.log(this.appointments = this.route.snapshot.data['appointmentList']);
        }

        setTimeout(() => {
            this.day = new Date();
            const formattedDate = formatDate(this.day, 'yyyy-MM-dd', 'en');

            console.log(this.listData = new MatTableDataSource(this.appointments.filter(function(visitor) {
                return visitor.day === formattedDate;
            })));
        }, 1000);
        
    }

    addEvent(type: Date, event: MatDatepickerInputEvent<Date>) {
        const date = formatDate(event.value, 'yyyy-MM-dd', 'en');
        console.log(date);
        console.log(this.listData = new MatTableDataSource(this.appointments.filter(function(visitor) {
            return visitor.day === date;
        })));
    }

    toEmployees() {
        this.router.navigate(['management/employee']);
    }

    newAppointment() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(AppointmentDialogComponent, { data: { route: this.route }});

        dialogRef.afterClosed().subscribe(result => {
            console.log('dialogref = closed');
            this.loadData();
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
        console.log(visitor);
        const dialogRef = this.dialog.open(VisitorDialogComponent, {data: visitor});
    }
}
