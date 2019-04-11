import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';
import { MatDialog, MatDialogConfig } from '../material/index';


@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
    .example-fill-remaining-space { flex: 1 1 auto;}
    `]
})

export class NavBarComponent {
    constructor(private router: Router, private dialog: MatDialog) {}

    toHome() {
        this.openDialog('Weet u zeker dat u de pagina wilt verlaten?');
        // this.router.navigate(['/home'])
    }

    toManagement() {
        this.router.navigate(['/management']);
    }

    openDialog(mes: string) {
        let dialogres = '';

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { message: mes };
        dialogConfig.panelClass = 'custom-dialog-container';
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig );

        dialogRef.afterClosed().subscribe(result => {
            dialogres = `${result}`;

            if (dialogres === 'yes') {
                this.router.navigate(['/home']);
            }
        });
    }
}