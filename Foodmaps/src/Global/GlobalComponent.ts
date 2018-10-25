import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'ag-global',
    templateUrl: './Global.html',
    styles: [require('./Global.scss').toString()],
    encapsulation:ViewEncapsulation.None
})
export class GlobalComponent {

}