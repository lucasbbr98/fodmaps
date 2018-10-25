using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface IRegistrationModel
    {
        string Email { get; }
        string Name { get; }
        string Surname { get; }
        string Gender { get; }
        string CPF { get; }
        string Password { get; }
        string DateString { get; }
    }
    public class RegistrationModel : IRegistrationModel
    {
        public string Email {get; set;}

        public string Name {get; set;}

        public string Surname {get; set;}

        public string Gender {get; set;}

        public string CPF {get; set;}

        public string Password {get; set;}

        public string DateString {get; set;}
    }

    public class RegistrationModelValidator : ValidatorBase<RegistrationModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => IsName(m.Name), Message="DEBUG: Invalid Name" },
                    new Rule { Test = m => IsSurname(m.Surname), Message="DEBUG: Invalid Surname" },
                    new Rule { Test = m => IsGender(m.Gender), Message="DEBUG: Invalid Gender" },
                    new Rule { Test = m => IsValidEmail(m.Email), Message="DEBUG: Invalid Email" },
                    new Rule { Test = m => IsPassword(m.Password), Message = "DEBUG: Invalid Password"},
                    new Rule { Test = m => IsDate(m.DateString), Message = "DEBUG: Invalid Date"},
                    new Rule { Test = m => IsCPF(m.CPF), Message="DEBUG: Invalid CPF" },
                };
            }
        }
    }
}

