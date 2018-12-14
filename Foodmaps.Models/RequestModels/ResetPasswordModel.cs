using System.Collections.Generic;

namespace Foodmaps.Models.RequestModels
{
    using Validation;
    using static Extensions.Extension;
    public interface IResetPasswordModel
    {
        string PasswordToken { get; }
        string Password { get; }

    }
    public class ResetPasswordModel : IResetPasswordModel
    {

        public string PasswordToken { get; set; }
        public string Password { get; set; }

    }


    public class ResetPasswordModelValidator : ValidatorBase<ResetPasswordModel>
    {
        protected override IEnumerable<Rule> Rules
        {
            get
            {
                return new[] {
                    new Rule { Test = m => !string.IsNullOrEmpty(m.PasswordToken), Message = "Invalid Token" },
                    new Rule { Test = m => IsPassword(m.Password) , Message = "Invalid Password" }
                };
            }
        }
    }
}

