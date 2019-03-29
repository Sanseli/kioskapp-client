import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../material';

@Component ({
    templateUrl: 'dialog.component.html',
    styleUrls: [`dialog.component.css`]
})
export class DialogComponent {
    message: string;

    constructor(private router: Router, public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any ) {
        this.message = data.message;
    }

    clickYes() {
        this.dialogRef.close('yes');
    }

    clickNo() {
        this.dialogRef.close('no');
    }
}
