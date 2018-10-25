import { Component, ViewChild, ElementRef, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'text-spinner',
    templateUrl: './TextSpinner.html',
    styleUrls: ['./TextSpinner.scss']
})
export class TextSpinnerComponent implements OnInit {

    @Input()
    public items: string[] = [];

    public txt: string = '';

    private current: number = 0;
    private deleting: boolean = false;
    private position: number = 1;

    ngOnInit(): void {
        this.doTypeWriter();
    }

    private doTypeWriter() {
        if (this.items == null ||
            this.items.length <= 0) {
            console.log('No text items');
            return;
        }

        var timeout = 300 - Math.random() * 100;

        if (this.txt == '' && this.deleting) {
            this.current += 1;

            if (this.current >= this.items.length)
                this.current = 0;

            this.deleting = false;
            this.position = 1;
        }

        var text = this.items[this.current];

        if (this.position >= text.length) {
            this.deleting = true;
        }

        this.position += this.deleting ? -1 : 1;

        this.txt = text.substring(0, this.position);


        setTimeout(this.doTypeWriter.bind(this), this.deleting ? timeout / 2 : timeout);
    }
}