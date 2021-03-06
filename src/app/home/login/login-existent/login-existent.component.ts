import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitorService, Visitor } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from 'src/app/material';

@Component ({
    templateUrl: 'login-existent.component.html',
    styleUrls: ['login-existent.component.css']
})
export class LoginExistentComponent {
    visitors: Visitor[];
    progress = false;

    @ViewChild('loginForm', { static: true }) formValues;

    constructor(private visitorService: VisitorService, private router: Router, 
        private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar) {
            const formattedDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
            this.visitors = this.route.snapshot.data['visitorList'].filter(a => (a.loggedIn === 0 && a.day === formattedDate));
    }

    onSubmit(formValues) {
        this.progress = true;
        const app: Visitor = formValues.visitor;
        app.loggedIn = true;
        this.visitorService.updateVisitor(app).subscribe(res => {

            if (res['loggedIn'] === true) {
                this.snackBar.open('Login is opgeslagen', '', {
                    panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
                });
                this.router.navigate(['/home']);
                this.progress = false;

            } else {
                this.snackBar.open('Er is iets mis gegaan, probeer opnieuw.', '', {
                    panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
                });
                this.progress = false;
                this.formValues.resetForm();
            }
        });
    }

    cancel() {
        this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
    }

    openDialog(mes: string) {
        let dialogres = '';

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { message: mes };
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            dialogres = `${result}`;

            if (dialogres === 'yes') {
                this.router.navigate(['/home']);
            }
        });
    }
}