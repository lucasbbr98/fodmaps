export class ValidatorFunctions {

    public static isDate(date: Date): boolean{
        var currentDate = new Date();
        var currentYear = new Date().getFullYear();
        if (date.getFullYear() > currentYear || date.getFullYear() < currentYear - 100) {
            return false;
        }
    }
    public static isInt(n:number):boolean {
        return n % 1 === 0;
    }
    public static IsNegative(n:number):boolean {
        if (n < 0) {
            return true;
        }
        return false;
    }
    public static IsId(i: number): boolean {
        if (this.IsNegative(i) || !this.isInt(i)) {
            return false;
        }
        return true;
    }

    public static isFutureDate(date: Date): boolean {
        if (date == null) {
            return false;
        }
        var currentDate = new Date();
        if (date < currentDate) {
            return false;
        }
        return true;
    }

    public static isNullOrEmpty(test: string):boolean {
        if (test == null || test == '') {
            return true;
        }
        return false;
    }

    public static isArrayNullOrEmpty(...params: string[]): boolean {
        for (let item of params) {
            if (this.isNullOrEmpty(item)) {
                console.log(item + 'IS NULL');
                return true;
            }
        }
        return false;
    }

    public static hasLength(test: string, min: number, max: number): boolean {
        if (test == null || test == '') {
            return false;
        }
        if (test.length < min || test.length > max) {
            return false;
        }
        return true;
    }

    public static isCPF(cpf: string): boolean {
        var mt1: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        var mt2: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var _cpf: string, TempCPF: string, Digito: string;
        var soma: number, resto: number;
        _cpf = cpf.trim().replace("-", "").replace(".", "").replace(".", "");
        if (_cpf.length != 11)
            return false;

        TempCPF = _cpf.substring(0, 9);
        soma = 0;
        for (var i = 0; i < 9; i++) {
            soma += parseInt(TempCPF[i].toString()) * mt1[i];
        }

        resto = soma % 11;
        if (resto < 2)
            resto = 0;
        else
            resto = 11 - resto;

        Digito = resto.toString();
        TempCPF = TempCPF + Digito;
        soma = 0;

        for (var i = 0; i < 10; i++) {
            soma += parseInt(TempCPF[i].toString()) * mt2[i];
        }

        resto = soma % 11;
        if (resto < 2)
            resto = 0;
        else
            resto = 11 - resto;

        Digito = Digito + resto.toString();

        return _cpf.endsWith(Digito);
    }

    public static isYearNumber(test: number): boolean {
        var currentYear = new Date().getFullYear();
        if (test <= currentYear - 100 || test > currentYear) {
            return false;
        }
        return true;
    }

    public static isEqual(first: any, second: any) :boolean{
        if (first == second) {
            return true;
        }
        return false;
    }



    public static isName(name:string): boolean {
        if (!this.hasLength(name, 3, 40)) {
            return false;
        }
        var re = /^[ A-Za-z\u00C0-\u00ff]+$/;
        if (!re.test(name.toLowerCase())) {
            return false;
        }
        return true;
    }
    public static isSurname(surname:string): boolean {
        if (!this.hasLength(surname, 2, 70)) {
            return false;
        }

        var re = /^[ A-Za-z\u00C0-\u00ff]+$/;
        if (!re.test(surname.toLowerCase())) {
            return false;
        }
        return true;
    }
    public static isEmail(email: string): boolean {

        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        if (!re.test(email.toLowerCase())) {
            return false;
        }
        return true;
    }
    public static isPassword(password:string): boolean {
        if (!this.hasLength(password, 6, 50)) {
            return false;
        }
        return true;
    }
    public static isCourse(course:string): boolean {
        if (!this.hasLength(course, 3, 40)) {
            return false;
        }

        var re = /^[ A-Za-z\u00C0-\u00ff]+$/;
        if (!re.test(course.toLowerCase())) {
            return false;
        }
        return true;
    }

}