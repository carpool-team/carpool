using FluentValidation;
using Newtonsoft.Json;

namespace AuthServer.Models
{
	public class ChangePasswordModel
	{
		[JsonConstructor]
		public ChangePasswordModel(string email, string currentPassword, string newPassword)
		{
			Email = email;
			CurrentPassword = currentPassword;
			NewPassword = newPassword;
		}

		public string Email { get; }
		public string CurrentPassword { get; }
		public string NewPassword { get; }
	}
	
	public class ChangePasswordModelValidator : AbstractValidator<ChangePasswordModel>
	{
		public ChangePasswordModelValidator()
		{
			RuleFor(x => x.Email).NotEmpty().WithMessage("Email address cannot be empty.")
				.EmailAddress();
			RuleFor(x => x.NewPassword).MinimumLength(8).WithMessage("Password is too short.")
				.Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$").WithMessage("Password does not satisfy the rules.");
		}
	}
}