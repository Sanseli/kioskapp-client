import { Component, OnInit } from '@angular/core';
import { VisitorService, Visitor } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { MatDialog, MatDialogConfig } from 'src/app/material';

@Component ({
    templateUrl: 'login-existent.component.html',
    styleUrls: ['login-existent.component.css']
})
export class LoginExistentComponent {
    visitors: Visitor[];

    constructor(private visitorService: VisitorService, private router: Router, 
        private route: ActivatedRoute, private dialog: MatDialog) {
            const formattedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
            this.visitors = this.route.snapshot.data['visitorList'].filter(a => (a.loggedIn === 0 && a.day === formattedDate));
            console.log(this.visitors)
    }


    onSubmit(formValues) {
        const app: Visitor = formValues.visitor;
        app.loggedIn = true;
        console.log(app);
        this.visitorService.updateVisitor(app).subscribe();
        this.router.navigate(['/home']);
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