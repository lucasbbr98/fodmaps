using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface IRegistrationAdditionalModel
    {
        string JobName { get; }
        string Identifier { get; }
        string University { get; }
        Address Address { get; }
    }
    public class RegistrationAdditionalModel : IRegistrationAdditionalModel
    {
        public string JobName { get; set; }

        public string Identifier { get; set; }

        public string University { get; set; }

        public Address Address { get; set; }
    }

    public class RegistrationAdditionalModelValidator : ValidatorBase<RegistrationAdditionalModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => IsValidArray(m.University, m.JobName, m.Address.CEP), Message="DEBUG: Invalid Data" },
                    new Rule { Test = m => IsValidJobName(m.JobName), Message="DEBUG: Invalid JobName" },
                    new Rule { Test = m => HasLength(m.Address.CEP, 8, 8), Message="DEBUG: Invalid CEP" }
                };
            }
        }
    }
}

