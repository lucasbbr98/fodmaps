import { Component, OnInit, forwardRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxComponent),
    multi: true
};

@Component({
    selector: 'ag-textbox',
    templateUrl: './TextBox.html',
    styleUrls: ['./TextBox.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextBoxComponent implements OnInit, ControlValueAccessor {

    public errorToDisplay: string = '';

    @Input()
    public shorterror: string = '';
    @Input()
    public longerror: string = '';
    @Input()
    public patternerror: string = '';
    @Input()
    public sameaserror: string = '';

    private _valid: boolean = true;
    @Input()
    public get valid(): boolean {
        return this._valid;
    }
    public set valid(value: boolean) {
        if (this._valid === value) {
            return;
        }

        this._valid = value;
        this.validChange.emit(this._valid);
    }

    @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() placeholder: string = 'Search...';
    @Input() type: string = 'text';
    @Input() index: number = 0;
    @Input() autofocus: boolean = true;
    @Input('aMask') kzMask: string = '';
    @Input() sameas: string = '';
    @Input() strength: string = 'false';

    @Input() pattern: string = '';
    @Input() min: number = 0;
    @Input() max: number = 0;


    public get isValid(): string {
        if (this.text == null || this.text == '' || this.text == '0') {
            this.errorToDisplay = '';
            return 'invalid';
        }
        if (this.type === 'number' && this.text != null && this.text != '') {

            var num = Number.parseInt(this.text);

            if (this.min != 0 && num < this.min) {
                this.errorToDisplay = this.shorterror == '' ? 'Must be at least ' + this.min + ' characters' : this.shorterror;
                this.valid = false;
                return 'invalid';
            }

            if (this.max != 0 && num > this.max) {
                this.errorToDisplay = this.longerror == '' ? 'Cannot be more than ' + this.max + ' characters' : this.longerror;
                this.valid = false;
                return 'invalid';
            }

            return 'valid';
        }
        if (this.min != 0 && (this.text == null || this.text.length < this.min)) {
            this.errorToDisplay = this.shorterror == '' ? 'Must be at least ' + this.min + ' characters' : this.shorterror;
            this.valid = false;
            return 'invalid';
        }

        if (this.max != 0 && this.text != null && this.text.length > this.max) {
            this.errorToDisplay = this.longerror == '' ? 'Cannot be more than ' + this.max + ' characters' : this.longerror;
            this.valid = false;
            return 'invalid';
        }

        if (this.pattern != '') {
            var regex = new RegExp(this.pattern);
            if (this.text == null || !regex.test(this.text)) {
                this.errorToDisplay = this.patternerror == '' ? 'Invalid entry' : this.patternerror;
                this.valid = false;
                return 'invalid';
            }
        }

        if (this.sameas != null && this.sameas != '' &&
            this.text != null && this.sameas != this.text) {
            this.errorToDisplay = this.sameaserror == '' ? 'Has to be the same as ' + this.sameas : this.sameaserror;
            this.valid = false;
            return 'invalid';
        }

        this.valid = true;
        this.errorToDisplay = '';

        return 'valid';
    }

    @Output()
    public blurred: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public focused: EventEmitter<any> = new EventEmitter<any>();

    public hovering: boolean = false;
    public focusing: boolean = false;

    ngOnInit(): void {

    }

    doBlur() {
        setTimeout(() => {
            this.blurred.emit();
        }, 150);
        this.focusing = false;
    }

    doFocus() {
        this.focused.emit();
        this.focusing = true;
    }

    //NG-MODEL Stuff
    writeValue(obj: string): void {
        if (obj !== this._text) {
            this._text = obj;
        }
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: string) => void = noop;

    private _text: string;
    public get text(): string {
        return this._text;
    }
    public set text(item: string) {
        if (item !== this._text) {
            this._text = item;
            this.onChangeCallback(item);
        }
    }
    public disabled: boolean = false;

    // MY OWN MASK IMPLEMENTATION - LUCAS

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        var eventTargetValue = $event.target.value;
        // Avoiding a bunch of console errors
        if (eventTargetValue == null || this.kzMask == null || this.kzMask == '')
            return;

        var valor = eventTargetValue.replace(/\D/g, '');
        var pad = this.kzMask.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);

        // Backspace
        if ($event.keyCode === 8) {
            this.onChangeCallback(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChangeCallback(valor);
        }

        var valorMaskPos = 0;
        valor = '';
        for (var i = 0; i < this.kzMask.length; i++) {
            if (isNaN(parseInt(this.kzMask.charAt(i)))) {
                valor += this.kzMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }
        $event.target.value = valor;
        this.writeValue(valor);
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.kzMask.length) {
            return;
        }
        this.onChangeCallback('');
        $event.target.value = '';
    }
}

