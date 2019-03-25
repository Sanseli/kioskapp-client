import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '../material';
import { LoginDialogComponent } from './login-dialog.component';

@Component ({
    templateUrl: 'home.component.html',
    styles: [`
        .row button { padding: 10% 15% 10% 15%; font-size: 200%;
        width: 350px; margin-top: 5%}

        body {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .img-responsive {
            max-width: 50%;-
            max-height: 50%;
            padding-top: 5%
          }
    `]
})
export class HomeComponent implements OnInit {
    constructor(private router: Router, public dialog: MatDialog) {

    }

    ngOnInit() {

    }

    toLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(LoginDialogComponent, dialogConfig);
        // this.router.navigate(['/login'])
    }

    toLogout() {
        this.router.navigate(['/logout']);
    }


}
