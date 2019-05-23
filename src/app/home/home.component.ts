import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '../material';
import { DialogComponent } from '../shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'home.component.html',
    styleUrls: [`home.component.css`]
})
export class HomeComponent {
    loading = true;

    constructor(private router: Router, public dialog: MatDialog) {

    }

    toLogin() {
        let dialogres = '';

        const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        dialogConfig.data = { message: 'Hebt u al een afspraak?' };
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            dialogres = `${result}`;

            if (dialogres === 'yes') {
                this.router.navigate(['/login/existent']);
            } else if (dialogres === 'no') {
                this.router.navigate(['/login']);
            }
        });


        // this.router.navigate(['/login'])
    }

    toLogout() {
        this.router.navigate(['/logout']);
    }

    onLoad() {
        this.loading = false;
    }

}
