import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared';
import { MatSnackBar } from 'src/app/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(formValues) {
    if (formValues.email !== undefined) {
      const email: String = formValues.email;
      console.log(email)
      this.auth.reset(email).subscribe((res) => {console.log(res); });
    } else {
      this.snackBar.open('Vul een e-mail adres in a.u.b.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
    }
  }

}
