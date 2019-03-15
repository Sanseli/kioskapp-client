import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component ({
    templateUrl: 'login.component.html',
    styles: [`
        .row button { padding: 40px 100px; font-size: 30px;
        width: 350px; margin-top: 5%}
        
        body {
            overflow-x: hidden;
            overflow-y: auto;
        }
  
        .img-responsive {
            max-width: 50%; /* or to whatever you want here */
            max-height: auto; /* or to whatever you want here */
            padding-top: 30px
          }
    `]
})
export class LoginComponent {
    public type: string

    constructor(private router:Router){

    }

    loginBedrijf(){
        this.router.navigate(['login/bedrijf'])
    }

    loginParticulier(){
        this.router.navigate(['/login/particulier'])
    }

    toHome() {
        this.router.navigate(['/home'])
    }
}