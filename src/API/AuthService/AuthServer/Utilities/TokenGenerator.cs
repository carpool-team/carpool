using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AuthDomain.Entities;
using AuthShared.Options;
using IdentifiersShared.Identifiers;
using Microsoft.IdentityModel.Tokens;

namespace AuthServer.Utilities
{
	public class TokenGenerator : ITokenGenerator
	{
		private readonly JwtOptions _jwtOptions;
		
		public TokenGenerator(JwtOptions jwtOptions) 
			=> _jwtOptions = jwtOptions;

		public JwtSecurityToken GenerateJwtToken(AppUserId userId)
		{
			var authClaims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Sub, userId.Value.ToString()),
				new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
				new Claim("scope", "carpool_rest_api")
			};

			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));

			var token = new JwtSecurityToken(_jwtOptions.Issuer,
				_jwtOptions.Audience,
				expires: DateTime.Now.AddDays(30),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

			return token;
		}
		
		public JwtSecurityToken GenerateIdpJwtToken()
		{
			var authClaims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Sub, "790688245242396672"),
				new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
				new Claim("scope", "carpool_rest_api")
			};

			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));

			var token = new JwtSecurityToken(_jwtOptions.Issuer,
				_jwtOptions.Audience,
				expires: DateTime.Now.AddSeconds(30),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

			return token;
		}

		public RefreshToken GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(randomNumber);
			}

			var refreshToken = new RefreshToken
			{
				Token = Convert.ToBase64String(randomNumber),
				Expires = DateTime.UtcNow.AddDays(10),
				Created = DateTime.UtcNow
			};

			return refreshToken;
		}
	}
}