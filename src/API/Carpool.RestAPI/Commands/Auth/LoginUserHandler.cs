using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Carpool.RestAPI.Commands.Auth
{
	public class LoginUserHandler : IRequestHandler<LoginUser, JwtSecurityToken>
	{
		private readonly IConfiguration _configuration;
		private readonly UserManager<ApplicationUser> _userManager;


		public LoginUserHandler(UserManager<ApplicationUser> userManager, IConfiguration configuration)
		{
			_userManager = userManager;
			_configuration = configuration;
		}

		public async Task<JwtSecurityToken> Handle(LoginUser request, CancellationToken cancellationToken)
		{
			var user = await _userManager.FindByEmailAsync(request.Email).ConfigureAwait(false);
			if (user is null)
				throw new ApiException($"There is no user with email: {request.Email}", StatusCodes.Status404NotFound);

			if (!await _userManager.CheckPasswordAsync(user, request.Password))
				throw new ApiException($"Password is invalid", StatusCodes.Status401Unauthorized);
			
			var authClaims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

			var token = new JwtSecurityToken(
				_configuration["Jwt:Issuer"],
				_configuration["Jwt:Audience"],
				expires: DateTime.Now.AddHours(72),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigningKey,
					SecurityAlgorithms.HmacSha256)
			);

			return token;
		}
	}
}