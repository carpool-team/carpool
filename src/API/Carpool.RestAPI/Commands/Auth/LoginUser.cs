using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;
using MediatR;

namespace Carpool.RestAPI.Commands.Auth
{
	public class LoginUser : IRequest<JwtSecurityToken>
	{
		[JsonConstructor]
		public LoginUser(string email, string password)
		{
			Email = email;
			Password = password;
		}

		public string Email { get; set; }
		public string Password { get; set; }
	}
}