import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Visitor } from 'src/app/shared/models';
import { VisitorService } from 'src/app/shared/visitor.service';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from 'src/app/material';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';


@Component ({
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogoutComponent {
    visitors: Visitor[] = [];
    progress = false;

    @ViewChild('logoutForm') formValues;

    constructor(private router: Router, private route: ActivatedRoute,
        private visitorService: VisitorService, private dialog: MatDialog,
        private toastr: ToastrService, private snackBar: MatSnackBar ) {
        const d = formatDate(new Date, 'dd-MM-yyyy', 'en')
        this.visitors = this.route.snapshot.data['visitorList'].filter(a => (a.loggedIn === 1 && a.day === d));
    }

    onSubmit(formValues) {
        this.progress = true;

        const visitor = formValues.visitor;
        visitor.loggedIn = false;

        this.visitorService.updateVisitor(visitor).subscribe(res => {
            if (res['loggedIn'] === false) {
                this.snackBar.open('Bedankt voor uw bezoek, u bent nu uitgelogd.', '', {
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

    toHome() {
        this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
    }

    deleteVisit(visitor): void {
        this.visitors = this.visitors.filter(h => h !== visitor);
        this.visitorService.deleteVisitor(visitor.id).subscribe();
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

    showToaster() {
        this.toastr.success('Bedankt voor uw bezoek, u bent nu uitgelogd.', 'Succes', {positionClass: 'toastrclass'});
    }
}
