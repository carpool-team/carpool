using Carpool.RestAPI.Commands.Auth;
using FluentValidation;

namespace Carpool.RestAPI.Validators
{
	public class LoginUserValidator : AbstractValidator<LoginUser>
	{
		public LoginUserValidator()
		{
			RuleFor(x => x.Email).EmailAddress().WithMessage("Email is in incorrect format");
		}
	}
}