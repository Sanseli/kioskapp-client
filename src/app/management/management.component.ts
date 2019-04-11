import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    templateUrl: 'management.component.html',
    styleUrls: [`management.component.css`]
})
export class ManagementComponent {
    constructor(private router: Router) {

    }
    onSubmit() {
        this.router.navigate(['/management/appointments']);
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}
