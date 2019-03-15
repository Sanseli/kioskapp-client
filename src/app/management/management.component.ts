import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialogConfig, MatDialog } from '../material';
import { AppointmentDialogComponent } from './appointment-dialog.component'
@Component({
    templateUrl: 'management.component.html',
    styles: [`
    `]
})
export class ManagementComponent {
    constructor(private router: Router, public dialog: MatDialog) {}

    toEmployees() {
        this.router.navigate(['management/employee'])
    }

    newAppointment() {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.autoFocus = true;
        this.dialog.open(AppointmentDialogComponent, dialogConfig)
    }
}
