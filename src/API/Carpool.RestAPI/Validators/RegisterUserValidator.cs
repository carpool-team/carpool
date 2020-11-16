using Carpool.RestAPI.Commands.Auth;
using FluentValidation;

namespace Carpool.RestAPI.Validators
{
	public class RegisterUserValidator : AbstractValidator<RegisterUser>
	{
		public RegisterUserValidator()
		{
			RuleFor(x => x.Email).EmailAddress();
			RuleFor(x => x.Password).MinimumLength(8)
			                        .Matches(@"[A-Z]+").WithMessage("Password must contain at least one uppercase letter.")
			                        .Matches(@"[a-z]+").WithMessage("Password must contain at least one lowercase letter.")
			                        .Matches(@"[0-9]+").WithMessage("Password must contain at least one number.")
			                        .Matches(@"[\!\?\*\.]+").WithMessage("Password must contain at least one (!? *.).");;
			RuleFor(x => x.FirstName).NotEmpty();
			RuleFor(x => x.LastName).NotEmpty();
		}
	}
}