import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthService } from '../shared';

@Component ({
    templateUrl: 'management.component.html',
    styleUrls: [`management.component.css`]
})
export class ManagementComponent {

    constructor(private router: Router, private auth: AuthService) {

    }

    onSubmit(formValues) {
        let name = formValues.username; let password = formValues.password;
        let user = {name, password} as User;
        console.log(user)
        let result;
        this.auth.login(user).subscribe(res => {result = res['success']; } );
        setTimeout(() => {
            console.log(result)
            if (result !== undefined) {
                this.router.navigate(['/management/appointments']);

            }
        }, 2000);

        //this.router.navigate(['/management/appointments']);
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}
