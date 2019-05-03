import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthService } from 'src/app/shared/index';
import { MatSnackBar } from 'src/app/material/index';

@Component ({
    templateUrl: 'management.component.html',
    styleUrls: [`management.component.css`]
})
export class ManagementComponent {

    constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {

    }

    @ViewChild('form') formValues; // Added this

    onSubmit(formValues) {
        let name = formValues.username; let password = formValues.password;
        let user = {name, password} as User;
        console.log(user)
        let result;
        this.auth.login(user).subscribe((res) => {
            result = res['success']; 
            console.log(result)
            if (result !== undefined) {
                this.auth.authentication = result['token'];
                this.router.navigate(['/management/appointments']);

            } else {
                this.snackBar.open('Wachtwoord is niet correct.', '',
                { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
                this.formValues.resetForm();
            }
        } );

    }

    cancel() {
        this.router.navigate(['/home']);
        
    }

    temp() {
        this.auth.authentication = 'testauth';

        this.router.navigate(['/management/appointments']);

    }
}
