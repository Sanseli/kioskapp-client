import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '../material';
import { DialogComponent } from '../shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'home.component.html',
    styles: [`
    .row button { padding: 10% 15% 10% 15%; font-size: 200%;
        width: 350px; margin-top: 1%}

        body {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .img-responsive {
            max-width: 55%;-
            max-height: 55%;
            padding-top: 1%
          }

    `]
})
export class HomeComponent implements OnInit {
    constructor(private router: Router, public dialog: MatDialog) {

    }

    ngOnInit() {

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
            } else {
                console.log(dialogres);
            }
        });


        // this.router.navigate(['/login'])
    }

    toLogout() {
        this.router.navigate(['/logout']);
    }

    

}
