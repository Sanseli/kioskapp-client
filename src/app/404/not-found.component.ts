import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    template: `
      <div class="jumbotron text-center">
        <h2>
          404 - Page not found
        </h2>
        <p>You might want to go to the <a routerLink="/">home page</a></p>
      </div>
    `
  })
  export class NotFoundComponent implements OnInit {
    path: string;
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit() {
      this.route.data.pipe(take(1))
        .subscribe((data: { path: string }) => {
          this.path = data.path;
        });
    }
  }