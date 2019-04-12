import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatSnackBar} from 'src/app/material';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VisitorService, EmployeeService, Visitor,  Employee } from 'src/app/shared';
import { VisitorInfoDialogComponent } from '../visitor-info-dialog/visitor-info-dialog.component';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    templateUrl: 'appointment.component.html',
    styleUrls: [`appointment.component.css`]
})
export class AppointmentComponent {
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
    selectedDate: Date;
    first: Date;
    last: Date;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, public dialog: MatDialog, private route: ActivatedRoute,
        private visitorService: VisitorService, private employeeService: EmployeeService, 
        private snackBar: MatSnackBar) {
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
            const formattedDate = formatDate(this.day, 'dd-MM-yyyy', 'en');

            this.listData = new MatTableDataSource(this.visitors.filter(function(visitor) {
                return visitor.day === formattedDate;
            }));
        }, 400);

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.listData.sort = this.sort;
        }, 400);
  
    }

    addEvent(type: Date, event: MatDatepickerInputEvent<Date>) {
        this.selectedDate = event.value;
        const date = formatDate(this.selectedDate, 'dd-MM-yyyy', 'en');
        this.listData = new MatTableDataSource(this.visitors.filter(function(visitor) {
            return visitor.day === date;
        }));
        this.listData.sort = this.sort;
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
                setTimeout(() => {
                    this.listData.sort = this.sort;
                }, 400);
            }, 700);
        });
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();

        if (this.listData.paginator) {
          this.listData.paginator.firstPage();
        }
    }

    filterLoggedIn() {
        console.log('sfsef')
        this.listData = new MatTableDataSource(this.visitors.filter(function(visitor) {
            return visitor.loggedIn === false;
        }));
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

    deleteEmployee(employee) {
        let dialogres = '';
    
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { message: `Weet u zeker dat u ${employee.firstname} ${employee.name} wilt verwijderen uit de database?` };
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
            dialogres = `${result}`;
    
            if (dialogres === 'yes') {
              if (this.employeeService.deleteEmployee(employee.id).subscribe()) {
                this.snackBar.open(`Werknemer ${employee.firstname} ${employee.name} is verwijderd.`, '',
                    { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
                this.loadData();
              }
            }
        });
      }

    downloadPDF(string: string) {
        let formattedDate;
        if (this.selectedDate !== undefined && string !== 'loggedIn') {
            if (string !== 'loggedIn') {
                formattedDate = formatDate(this.selectedDate, 'dd-MM-yyyy', 'en');
            }
        } else {
            this.selectedDate = new Date();
            formattedDate = formatDate(this.selectedDate, 'dd-MM-yyyy', 'en');
        }

        let listVisitors: Visitor[] = [];
        const formattedHour = formatDate(this.day, 'HHumm', 'en');

        if (string === 'loggedIn') {

            listVisitors = this.visitors.filter(function(visitor) {
                return visitor.day === formattedDate && visitor.loggedIn;
            });

            this.makeTable(listVisitors, `Bezoekers ingelogd op ${formatDate(this.selectedDate, 'dd-MM-yyyy', 'en')} om ${formattedHour}`);

        } else if (string === 'day') {

            listVisitors = this.visitors.filter(function(visitor) {
                return visitor.day === formattedDate;
            });

            this.makeTable(listVisitors, `Alle bezoekers op ${formatDate(this.selectedDate, 'dd-MM-yyyy', 'en')}`);
        } else if (string === 'week') {
            this.findMonday();
            this.findFriday();
            setTimeout(() => {
                for (let day = this.first.getDay(); day <= this.last.getDay(); day++) {
                    let d: Date = this.first;
                    let v = this.visitors.filter(function(visitor) {
                        return visitor.day === formatDate(d, 'dd-MM-yyyy', 'en');
                    });
                    listVisitors = listVisitors.concat(v);
                    d.setDate(d.getDate() + 1);
                }
                setTimeout(() => {
                    console.log(listVisitors)
                    this.makeTable(listVisitors, 
                        `Alle bezoekers tussen ${formatDate(this.first, 'dd-MM-yyyy', 'en')} en ${formatDate(this.last, 'dd-MM-yyyy', 'en')}`, 
                        'addDate');
                }, 300);
            }, 500);
        } else if (string === 'month') {
            const month = this.selectedDate.getMonth();
            const year = this.selectedDate.getFullYear();
            this.first = new Date(year, month, 1);
            this.last = new Date(year, month + 1, 0);
            console.log(this.first.getDate());
            console.log(this.last.getDate())

            for (let day = this.first.getDate(); day <= this.last.getDate(); day++) {
                let d: Date = this.first;
                let v = this.visitors.filter(function(visitor) {
                    return visitor.day === formatDate(d, 'dd-MM-yyyy', 'en');
                });
                listVisitors = listVisitors.concat(v);
                d.setDate(d.getDate() + 1);
                console.log(listVisitors)
            }
            setTimeout(() => {
                this.makeTable(listVisitors, `Alle bezoeken van de maand ${formatDate(this.first, 'MMMM', 'en')}`, 'addDate');
            }, 500);
        }
    }

    makeTable(listVisitors, title, type?) {

        console.log(title);
        let columns;
        if (type === 'addDate') {
            columns = [{title: 'Dag', dataKey: 'date' }, { title: 'Naam', dataKey: 'name'}, {title: 'Voornaam', dataKey: 'firstname'},
                {title: 'Bedrijf', dataKey: 'company'}, {title: 'Reden', dataKey: 'subject'},
                {title: 'Afspraak met', dataKey: 'appointmentWith'}];
        }else {
            columns = [{title: 'Naam', dataKey: 'name'}, {title: 'Voornaam', dataKey: 'firstname'},
                {title: 'Bedrijf', dataKey: 'company'}, {title: 'Reden', dataKey: 'subject'},
                {title: 'Afspraak met', dataKey: 'appointmentWith'}];
        }


        let rows = [];

        for (let index = 0; index < listVisitors.length; index++) {
            let v: Visitor = listVisitors[index]
            let employee = this.employees.find(x => (x.id === v.employee_id));
            let employeename = employee.name + ' ' + employee.firstname;

            let row;
            if (type === 'addDate') {
                row = {'date': v.day, 'name': v.name, 'firstname': v.firstname, 'company': v.company, 'subject': v.subject,
                'appointmentWith': employeename};
            } else {
                row = {'name': v.name, 'firstname': v.firstname, 'company': v.company, 'subject': v.subject,
                'appointmentWith': employeename};
            }

            rows.push(row);
        }

        console.log (rows);
        let doc = new jsPDF('p', 'pt');
        doc.setFontSize(22);
        doc.text(20, 20, title);
        doc.autoTable(columns, rows);
        setTimeout(() => {
            doc.save('table.pdf');
        }, 500);
    }

    findMonday() {
        const dayOfWeek = this.selectedDate.getDay();
        const month = this.selectedDate.getMonth();
        const year = this.selectedDate.getFullYear();
        const day = this.selectedDate.getDate();

        if (dayOfWeek !== 1) {
            const diff = dayOfWeek - 1;
            let newDay = day - diff;
            let newMonth = month;
            let newYear = year;

            if (newDay <= 0) {
                newMonth = month - 1;

                if (newMonth > 0) {
                    const lastDayPMonth = new Date(year, newMonth +1, 0).getDate();
                    console.log(lastDayPMonth)
                    newDay = lastDayPMonth - (diff - day);

                } else {
                    newYear = year - 1;
                    newMonth = 12;
                }

            }

            setTimeout(() => {
                const lastMonday = new Date(newYear, newMonth, newDay);
                console.log(lastMonday);
                this.first = lastMonday;
            }, 300);
        }
        else this.first = this.selectedDate
    }

    findFriday() {
        const dayOfWeek = this.selectedDate.getDay();
        const month = this.selectedDate.getMonth();
        const year = this.selectedDate.getFullYear();
        const day = this.selectedDate.getDate();

        if (dayOfWeek !== 5) {
            const diff = 5 - dayOfWeek;
            let newDay = day + diff;
            let newMonth = month;
            let newYear = year;

            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

            if (newDay > lastDayOfMonth) {
                newMonth = month + 1;

                if (newMonth > 12) {
                    newYear = year + 1;
                    newMonth = 1;
                }

                const daysover = lastDayOfMonth - day;
                newDay = diff - daysover;
            }

            setTimeout(() => {
                const f = new Date(newYear, newMonth, newDay);
                console.log(f)
                this.last = f;
            }, 300);
        }
        else this.last = this.selectedDate;
    }
}
