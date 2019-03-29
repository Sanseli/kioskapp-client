import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    templateUrl: 'login.component.html',
    styles: [`
        .row button { padding: 10% 15% 10% 15%; font-size: 200%;
        width: 350px; margin-top: 1%}

        body {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .img-responsive {
            max-width: 55%;-
            max-height: 55%;
            padding-top: 1%
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
