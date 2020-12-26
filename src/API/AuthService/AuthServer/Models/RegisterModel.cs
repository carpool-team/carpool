using System.ComponentModel.DataAnnotations;
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

		[EmailAddress]
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Password { get; set; }
	}
}