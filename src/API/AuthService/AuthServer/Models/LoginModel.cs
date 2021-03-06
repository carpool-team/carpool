﻿using Newtonsoft.Json;

namespace AuthServer.Models
{
	public class LoginModel
	{
		[JsonConstructor]
		public LoginModel(string email, string password, bool rememberLogin)
			=> (Email, Password, RememberLogin)
				= (email, password, rememberLogin);

		public string Email { get; }
		public string Password { get; }
		public bool RememberLogin { get; }
	}
}