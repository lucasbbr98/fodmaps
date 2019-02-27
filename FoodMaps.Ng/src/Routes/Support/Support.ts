import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'support',
    templateUrl: './Support.html',
    styleUrls: ['./Support.scss']
})
export class SupportComponent {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        // Records MouseDown
        this.el.nativeElement.removeEventListener("mousedown", this.OnMouseDown.bind(this));
        this.el.nativeElement.addEventListener("mousedown", this.OnMouseDown.bind(this));
    }

    OnMouseDown(event: any) {
        if (event.target != null && event.target.className == "c-faq__title") {
            this.removeActiveDivs();
            event.target.parentElement.classList.add('c-faq--active');
        }
        if (event.target != null && event.target.className == "c-faq__title") {
            this.removeActiveDivs();
            event.target.parentElement.classList.add('c-faq--active');
        }
    }

    removeActiveDivs() {
        var activeDivs = document.querySelectorAll('.c-faq');

        if (activeDivs.length) {
            for (var i = 0; i < activeDivs.length; i++) {
                activeDivs[i].classList.remove('c-faq--active');
            }
        }
    }
}

