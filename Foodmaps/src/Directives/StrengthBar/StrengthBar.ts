import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
    selector: 'ag-strength-bar',
    templateUrl: './StrengthBar.html',
    styles: [require('./StrengthBar.scss').toString()]

})
export class StrengthBarComponent implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;
    private colors = ['#F00', '#F90', '#FF0', '#9F0', '#4285f4'];


    private static measureStrength(p) {
        var force = 0;
        var regex = /[$-/:-?{-~!"^_`\[\]]/g; 

        var lowerLetters = /[a-z]+/.test(p);
        var upperLetters = /[A-Z]+/.test(p);
        var numbers = /[0-9]+/.test(p);
        var symbols = regex.test(p);

        var flags = [lowerLetters, upperLetters, numbers, symbols];

        var passedMatches = 0;
        for (let flag of flags) {
            passedMatches += flag === true ? 1 : 0;
        }

        force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        force += passedMatches * 10;

        // (Curto)
        force = (p.length <= 6) ? Math.min(force, 10) : force;

        // (Variedade da caracteres fraca)
        force = (passedMatches === 1) ? Math.min(force, 10) : force;
        force = (passedMatches === 2) ? Math.min(force, 30) : force;
        force = (passedMatches === 3) ? Math.min(force, 40) : force;

        return force;

    }
    private getColor(s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        var password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        if (password) {
            let c = this.getColor(StrengthBarComponent.measureStrength(password));
            this.setBarColors(c.idx, c.col);
        }
    }
    private setBarColors(count, col) {
        for (let i = 0; i < count; i++) {
            this['bar' + i] = col;
        }
    }
}