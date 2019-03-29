import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Visitor } from 'src/app/shared/models';
import { VisitorService } from 'src/app/shared/visitor.service';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from 'src/app/material';
import { ToastrService } from 'ngx-toastr';


@Component ({
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogoutComponent {
    visitors: Visitor[] = [];

    constructor(private router: Router, private route: ActivatedRoute,
        private visitorService: VisitorService, private dialog: MatDialog,
        private toastr: ToastrService, private snackBar: MatSnackBar ) {
        this.visitors = this.route.snapshot.data['visitorList'].filter(a => (a.loggedIn === 1));
        console.log(this.visitors);
        

    }

    onSubmit(formValues) {
        const visitor = formValues.visitor;
        visitor.loggedIn = false;
        console.log(visitor);
        console.log(this.visitorService.updateVisitor(visitor).subscribe());
        this.snackBar.open('Bedankt voor uw bezoek, u bent nu uitgelogd.', '', { panelClass: ['blue-snackbar'], 
        verticalPosition: 'top', horizontalPosition: 'center'});
        // this.deleteVisit(formValues.visitor);
        this.router.navigate(['/home']);
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
