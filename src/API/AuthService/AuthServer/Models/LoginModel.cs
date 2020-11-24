using Newtonsoft.Json;

namespace AuthServer.Models
{
	public class LoginModel
	{
		[JsonConstructor]
		public LoginModel(string email, string password, bool rememberLogin, string clientId)
		{
			Email = email;
			Password = password;
			RememberLogin = rememberLogin;
			ClientId = clientId;
		}

		public string Email { get; }
		public string Password { get; }
		public bool RememberLogin { get; }
		public string ClientId { get; }
	}
}