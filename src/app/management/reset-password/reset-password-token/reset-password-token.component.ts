import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, AuthService } from 'src/app/shared/index';
import { MatSnackBar } from 'src/app/material';

@Component({
  selector: 'app-reset-password-token',
  templateUrl: './reset-password-token.component.html',
  styleUrls: ['./reset-password-token.component.css']
})
export class ResetPasswordTokenComponent implements OnInit {
  token: any;
  @ViewChild('form') formValues;

  constructor(private route: ActivatedRoute, private auth: AuthService, private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      let result
      this.auth.findPassChange(this.token).subscribe(res => { 
        result = res['message'];
        if (result !== undefined) {
          this.snackBar.open(result, '',
            { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
          this.router.navigate(['/management']);
        }
        
      })
    });

    console.log(this.token);
  }

  onSubmit(formValues) {
    console.log(formValues)
    if (formValues.password === formValues.c_password) {
      this.changePass(formValues.email, formValues.password, this.token);
      this.formValues.resetForm();
      
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

    this.auth.changePass(user).subscribe((res) => {console.log(res) 
      console.log(res['id'])
      if (res['id'] !== undefined) {
        console.log('dkfhosef')
        this.snackBar.open('Wachtwoord is succesvol veranderd.', '',
        { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
        this.router.navigate(['/home']);
      } else {
        this.snackBar.open('Er is iets mis gegaan, probeer opnieuw.', '',
          { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
      }
    });
  }

}
