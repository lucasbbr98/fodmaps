import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
    selector: 'instructions',
    templateUrl: './Instructions.html',
    styleUrls: ['./Instructions.scss']
})
export class InstructionsComponent {
    constructor(private router: Router,) { }

    goTo(url: string) {
        if (!navigator.onLine) {
            return;
        }

        this.router.navigateByUrl(url);
        
    }
}