using System.IdentityModel.Tokens.Jwt;
using AuthDomain.Entities;
using IdentifiersShared.Identifiers;

namespace AuthServer.Utilities
{
	public interface ITokenGenerator
	{
		JwtSecurityToken GenerateJwtToken(AppUserId userId);

		RefreshToken GenerateRefreshToken();
	}
}