using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    public interface IGetStringModel
    {
        string Data { get; }
    }
    public class GetStringModel : IGetStringModel
    {
        public string Data { get; set; }
    }

    public class GetStringModelValidator : ValidatorBase<GetStringModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => !string.IsNullOrEmpty(m.Data), Message = "Invalid String" }
                };
            }
        }
    }
}

