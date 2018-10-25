import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
    selector: 'ag-button',
    templateUrl: './Button.html',
    styles: [require('./Button.scss').toString()]
})
export class ButtonComponent {
    // Default values
    @Input() public name: string = 'Enviar';
    @Input() public className = '';
    @Input() public type = 'submit';
    @Input() public disabled = false;
    @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();
}