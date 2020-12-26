using System.Security.Claims;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Http;

namespace AuthServer.Extensions
{
	public static class UserClaimsExtensions
	{
		public static AppUserId GetUserId(this ClaimsPrincipal user)
		{
			var value = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (value != null)
			{
				var id = long.Parse(value);
				return new AppUserId(id);
			}

			throw new ApiException("Cannot read user id from token", StatusCodes.Status401Unauthorized);
		}
	}
}