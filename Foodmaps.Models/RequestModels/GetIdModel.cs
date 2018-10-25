using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    public interface IGetIntegerModel
    {
        int Value { get; }
    }
    public class GetIntegerModel : IGetIntegerModel
    {
        public int Value { get; set; }
    }

    public class GetIdModelValidator : ValidatorBase<GetIntegerModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => m.Value <= 0, Message = "Invalid Value" }
                };
            }
        }
    }
}

