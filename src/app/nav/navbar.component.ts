import {Component} from '@angular/core'
import { Router } from "@angular/router"

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
    .example-fill-remaining-space { flex: 1 1 auto;}
    `]
})

export class NavBarComponent {
    constructor(private router:Router){}

    toHome() {
        this.router.navigate(['/home'])
    }
}