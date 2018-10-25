
export class DateBuilder {
    day: string;
    month: string;
    year: string;
    hour: string;
    minutes: string;

    addMinutes(min: string): DateBuilder {
        var test = parseInt(min);
        if (test > 60 || test < 0) {
            this.minutes = null;
            return this;
        }
        this.minutes = min;
        return this;
    }

    addDay(day: string): DateBuilder {
        var test = parseInt(day);
        if (test > 31 || test < 1) {
            this.day = null;
            return this;
        }
        this.day = day;
        return this;
    }

    addMonth(month: string): DateBuilder {
        var test = parseInt(month);
        if (test > 12 || test < 1) {
            this.month = null;
            return this;
        }
        this.month = month;
        return this;
    }

    addYear(year: string): DateBuilder {
        var test = parseInt(year);
        if (test > 31 || test < 1) {
            this.year = null;
            return this;
        }
        this.year = year;
        return this;
    }

    ensureArguments(completeDate:boolean = false): boolean {
        if (this.day == null || this.month == null || this.year == null) {
            return false;
        }
        if (completeDate) {
            if (this.hour == null || this.minutes == null) {
                return false;
            }
        }
        return true;
    }

    public buildPartial() : Date {
        if (!this.ensureArguments()) {
            return null;
        }

        let dateString = this.year + '-' + this.month + '-' + this.day;
        return new Date(dateString);
    }
}

export class Builders {
    public static buildPartialDate(builder: DateBuilder): Date
    {
        let dateString = builder.year + '-' + builder.month + '-' + builder.day;
        return new Date(dateString);
    }
    public static buildCompleteDate(builder: DateBuilder): Date
    {
        //Following ISO Standard: (2015-03-25T12:00:00Z)
        let dateString = builder.year + '-' + builder.month + '-' + builder.day + 'T' + builder.hour + ':' + builder.minutes + ':' + '00' + 'Z';
        return new Date(dateString);
    }
}

// Im not using this class.
export class BuilderValidator {

    public static isPartialDate(builder: DateBuilder): boolean {
        var test = parseInt(builder.day);
        if (!this.isInRange(test, 1, 31)) {
            return false;
        }
        test = parseInt(builder.month);
        if (!this.isInRange(test, 1, 12)) {
            return false;
        }
        test = parseInt(builder.year);
        var currentYear = new Date().getFullYear();
        if (!this.isInRange(test, currentYear-100, currentYear+1)) {
            return false;
        }
        return true;
    }

    public static isCompleteDate(builder: DateBuilder): boolean {
        if (!this.isPartialDate(builder)) {
            return false;
        }
        var test = parseInt(builder.hour);
        if (!this.isInRange(test, 1, 24)) {
            return false;
        }
        var test = parseInt(builder.minutes);
        if (!this.isInRange(test, 0, 60)) {
            return false;
        }
        return true;
    }

    // helpers
    private static isInRange(n: number, min:number, max:number):boolean {
        if (n > max || n < min) {
            return false;
        }
        return true;
    }
}