using System.Collections.Generic;
using IdentityServer4.Models;

namespace AuthServer
{
	public static class Config
	{
		public static IEnumerable<IdentityResource> IdentityResources =>
			new IdentityResource[]
			{
				new IdentityResources.OpenId(),
				new IdentityResources.Email(),
				new IdentityResources.Profile(),
			};
		
		public static IEnumerable<ApiScope> ApiScopes =>
			new List<ApiScope>
			{
				new ApiScope("carpool_rest_api", "Carpool Rest Api")
			};

		public static IEnumerable<Client> Clients =>
			new List<Client>
			{
				new Client
				{
					ClientId = "mobile",

					// no interactive user, use the clientid/secret for authentication
					AllowedGrantTypes = GrantTypes.Code,

					// secret for authentication
					ClientSecrets =
					{
						new Secret("secret".Sha256())
					},

					// scopes that client has access to
					AllowedScopes = { "carpool_rest_api" }
				}
			};
	}
}