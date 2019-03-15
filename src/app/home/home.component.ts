import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { MatDialogConfig, MatDialog } from '../material';
import { LoginDialogComponent } from './login-dialog.component';

@Component ({
    templateUrl: 'home.component.html',
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
export class HomeComponent {
    constructor(private router:Router, public dialog:MatDialog){

    }

    toLogin() {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(LoginDialogComponent, dialogConfig)
        //this.router.navigate(['/login'])
    }

    toLogout(){
        this.router.navigate(['/logout'])
    }


}