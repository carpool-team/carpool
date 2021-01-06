using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Newtonsoft.Json;

namespace AuthServer.Models
{
	public class RegisterModel
	{
		[JsonConstructor]
		public RegisterModel(string email, string firstName, string lastName, string password)
		{
			Email = email;
			FirstName = firstName;
			LastName = lastName;
			Password = password;
		}

		[EmailAddress] public string Email { get; set; }

		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Password { get; set; }
	}

	public class RegisterModelValidator : AbstractValidator<RegisterModel>
	{
		public RegisterModelValidator()
		{
			RuleFor(x => x.Email).NotEmpty().WithMessage("Email address cannot be empty.")
			                     .EmailAddress();

			RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name cannot be empty.");
			RuleFor(x => x.LastName).NotEmpty().WithMessage("Last name cannot be empty.");
			RuleFor(x => x.Password).MinimumLength(8).WithMessage("Password is too short.")
			                        .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").WithMessage("Password does not satisfy rules ");
		}
	}
}