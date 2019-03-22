import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../material';
import { Visitor } from '../shared/models';

@Component ({
    templateUrl: 'visitor-dialog.component.html',
    styles: [`
    `]
})
export class VisitorDialogComponent {

  constructor(public dialogRef: MatDialogRef<VisitorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Visitor) {
  }

}
