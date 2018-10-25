using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface IQuestionnaireAnswersModel
    {
        Answer[] Answers { get; }
        string Guid { get; }
    }
    public class QuestionnaireAnswersModel : IQuestionnaireAnswersModel
    {
        public Answer[] Answers { get; set; }
        public string Guid { get; set; }

    }

    public class QuestionnaireAnswersModelValidator : ValidatorBase<QuestionnaireAnswersModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => m.Answers != null, Message="DEBUG: Null Answer" },
                    new Rule { Test = m => IsGuid(m.Guid), Message="DEBUG: Invalid Guid" },
                    new Rule { Test = m => IsValidQuestionnaireAnswersArray(m.Answers), Message = "DEBUG: Invalid Answers Array"}
                };
            }
        }
    }
}

