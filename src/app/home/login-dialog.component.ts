import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '../material';

@Component ({
    templateUrl: 'login-dialog.component.html',
    styles: [`
        .t { margin-bottom: 30px;}
        h1 { font-size: 170%;}
        .container {padding: 20px 50px; }
        button { margin: 1px; }
        .btn-left {  float: right;}
        .btn-right { float: right;}
        .close { float: right;}
    `]
})
export class LoginDialogComponent {
    constructor(private router: Router, public dialogRef: MatDialogRef<LoginDialogComponent>) {

    }
    clickYes() {
        this.router.navigate(['/login/existent']);
        this.dialogRef.close();
    }

    clickNo() {
        this.router.navigate(['/login']);
        this.dialogRef.close();
    }
}
