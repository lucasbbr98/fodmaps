
export interface IRuleSet {
    rules: Rule[];
    //validate(item: any): any[];
    isValid() : string[];
}
export class Rule {
    predicate: () => boolean;
    output: () => any;
}

