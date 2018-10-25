using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface ICreatePatientModel
    {
        string Name { get; }
        string Surname { get; }
        string Gender { get; }
        string stringBday { get; }
        double Weight { get; }
        double Height { get; }
    }
    public class CreatePatientModel : ICreatePatientModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string stringBday { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
    }

    public class CreatePatientModelValidator : ValidatorBase<CreatePatientModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => IsValidArray(m.Name, m.Surname, m.Gender), Message="DEBUG: Invalid Data" },
                    new Rule { Test = m => IsName(m.Name), Message="DEBUG: Invalid Name" },
                    new Rule { Test = m => IsSurname(m.Surname), Message="DEBUG: Invalid Surname" },
                    new Rule { Test = m => IsDate(m.stringBday), Message="DEBUG: Invalid Birthday" },
                    new Rule { Test = m => IsGender(m.Gender), Message="DEBUG: Invalid Gender" },
                    new Rule { Test = m => IsBetween(m.Weight, 0.5, 300 ), Message="DEBUG: Invalid Weight" },
                    new Rule { Test = m => IsBetween(m.Height, 1, 250 ), Message="DEBUG: Invalid Height" }
                };
            }
        }
    }
}

