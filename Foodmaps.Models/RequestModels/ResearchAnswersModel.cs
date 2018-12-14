using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface IResearchAnswersModel
    {
        Answer[] Answers { get; }
        string Guid { get; }
        string Name { get; }
        string Surname { get; }
        string Gender { get; }
        int Age { get; }
        double Weight { get; }
        double Height { get; }
    }
    public class ResearchAnswersModel : IResearchAnswersModel
    {
        public Answer[] Answers { get; set; }
        public string Guid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }

    }

    public class ResearchAnswersModelValidator : ValidatorBase<ResearchAnswersModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => IsName(m.Name), Message="DEBUG: Invalid Name" },
                    new Rule { Test = m => IsSurname(m.Surname), Message="DEBUG: Invalid Surname" },
                    new Rule { Test = m => IsGender(m.Gender), Message="DEBUG: Invalid Surname" },
                    new Rule { Test = m => IsValidNumber(m.Age), Message="DEBUG: Invalid Age" },
                    new Rule { Test = m => m.Weight > 0, Message="DEBUG: Invalid Weight" },
                    new Rule { Test = m => m.Height > 0, Message="DEBUG: Invalid Height" },
                    new Rule { Test = m => m.Answers != null, Message="DEBUG: Null Answer" },
                    new Rule { Test = m => IsGuid(m.Guid), Message="DEBUG: Invalid Guid" },
                    new Rule { Test = m => IsValidQuestionnaireAnswersArray(m.Answers), Message = "DEBUG: Invalid Answers Array"}
                };
            }
        }
    }
}

