import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    templateUrl: 'login.component.html',
    styles: [`

    `]
})
export class LoginComponent {
    public type: string;
    loading = true;

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

    onLoad() {
        this.loading = false;
    }
}
