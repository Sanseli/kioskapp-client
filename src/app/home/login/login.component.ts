import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    templateUrl: 'login.component.html',
    styles: [`
        .row button { padding: 10% 15% 10% 15%; font-size: 200%;
        width: 350px; margin-top: 5%}

        body {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .img-responsive {
            max-width: 50%;-
            max-height: 50%;
            padding-top: 5%
          }
    `]
})
export class LoginComponent {
    public type: string;

    constructor(private router: Router) {

    }

    loginBedrijf() {
        this.router.navigate(['login/bedrijf']);
    }

    loginParticulier() {
        this.router.navigate(['/login/particulier']);
    }

    toHome() {
        this.router.navigate(['/home']);
    }
}
