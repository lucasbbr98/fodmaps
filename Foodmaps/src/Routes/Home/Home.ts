import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './Home.html',
    styleUrls: ['./Home.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router
  
    ) { }
    ngOnInit(): void {
        this.router.navigateByUrl('/events');
    }
}