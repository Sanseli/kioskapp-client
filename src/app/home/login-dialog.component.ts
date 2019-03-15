import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialogRef } from '../material';

@Component ({
    templateUrl: 'login-dialog.component.html',
    styles: [`

    `]
})
export class LoginDialogComponent {
    constructor(private router: Router, public dialogRef: MatDialogRef<LoginDialogComponent>) {

    }
    clickYes() {
        this.router.navigate(['/login/existent'])
        this.dialogRef.close();
    }

    clickNo(){
        this.router.navigate(['/login'])
        this.dialogRef.close()
    }
}