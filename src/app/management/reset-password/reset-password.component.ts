import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared';
import { MatSnackBar } from 'src/app/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('form', { static: true }) formValues;
  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(formValues) {
    if (formValues.email !== undefined) {
      const email: String = formValues.email;
      this.auth.reset(email).subscribe((res) => {
        if (res['message'] === undefined) {
          this.snackBar.open('Controlleer het e-mail adres a.u.b.', '',
          { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
        } else {
          this.snackBar.open(res['message'], '',
          { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
        }
      });
    } else {
      this.snackBar.open('Vul een e-mail adres in a.u.b.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
    }
    this.formValues.resetForm();
  }

}
