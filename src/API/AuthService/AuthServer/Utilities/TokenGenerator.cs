using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthShared.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthServer.Utilities
{
	public class TokenGenerator
	{
		public JwtSecurityToken GenerateToken(long userId)
		{
			var authClaims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
				new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
				new Claim("scope", "carpool_rest_api")
			};

			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.Key));
			
			var token = new JwtSecurityToken(
				JwtOptions.Issuer,
				JwtOptions.Audience,
				expires: DateTime.Now.AddMinutes(5),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigningKey,
					SecurityAlgorithms.HmacSha256)
					
			);

			return token;
		}
	}
}