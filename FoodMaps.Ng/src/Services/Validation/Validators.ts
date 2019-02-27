import { Rule, IRuleSet } from "./ValidatorBase";
import { ValidatorFunctions } from "./ValidatorFunctions";

// Example
//export class RegistrationValidator implements IRuleSet {
//    Forbidden
//    public model: RegistrationModel;

//    constructor(r: RegistrationModel) {
//        this.model = r;
//    }
//    get rules(): Rule[] {
//        return [
//            {
//                predicate: () => ValidatorFunctions.isArrayNullOrEmpty(this.model.email, this.model.password, this.model.name, this.model.surname, this.model.gender),
//                output: () => "Por favor, preencha todos os dados"
//            }
//            , {
//                predicate: () => !ValidatorFunctions.isName(this.model.name),
//                output: () => "Nome inválido",
//            }
//            , {
//                predicate: () => !ValidatorFunctions.isSurname(this.model.surname),
//                output: () => "Sobrenome inválido",
//            }
//            , {
//                predicate: () => !ValidatorFunctions.isEmail(this.model.email),
//                output: () => "Email inválido",
//            }
//            , {
//                predicate: () => !ValidatorFunctions.isPassword(this.model.password),
//                output: () => "Senha inválida",
//            }
//           , {
//                predicate: () => this.model.gender != "male" && this.model.gender != "female",
//                output: () => "Gênero inválido",
//            }

//        ];
//    }

//    isValid(): string[] {
//        var output = [];
//        for (let r of this.rules) {
//            if (r.predicate() && output.length == 0) {
//                output.push(r.output());
//                return output;
//            }
           
//        }
//        return output;
//    }
//}