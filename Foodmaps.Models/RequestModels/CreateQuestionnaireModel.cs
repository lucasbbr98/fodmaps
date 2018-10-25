using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface ICreateQuestionnaireModel
    {
        string Type { get; }
        string Name { get; }
        int PatientId { get; }
    }
    public class CreateQuestionnaireModel : ICreateQuestionnaireModel
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public int PatientId { get; set; }
   
    }

    public class CreateQuestionnaireModelValidator : ValidatorBase<CreateQuestionnaireModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => IsValidQuestionnaireType(m.Type), Message="DEBUG: Invalid Type" }
                };
            }
        }
    }
}

