import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, AuthService } from 'src/app/shared/index';
import { MatSnackBar } from 'src/app/material';

@Component({
  selector: 'app-reset-password-token',
  templateUrl: './reset-password-token.component.html',
  styleUrls: ['./reset-password-token.component.css']
})
export class ResetPasswordTokenComponent implements OnInit {
  token: any;

  constructor(private route: ActivatedRoute, private auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get("token");
    });

    console.log(this.token);
  }

  onSubmit(formValues) {
    console.log(formValues)
    if (formValues.password === formValues.c_password) {
      this.changePass(formValues.email, formValues.password, this.token);
    }
    else {
      this.snackBar.open('Wachtwoord komt niet overeen.', '',
      { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
    }
  }

  changePass(email, password, token) {
    console.log(email)
    console.log(password)
    console.log(token)

    const user = {email, password, token} as User;

    this.auth.changePass(user).subscribe((res) => {console.log(res) });
  }

}
