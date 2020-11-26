using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AuthDomain.Entities;
using AuthServer.Data;
using AuthServer.Models;
using AuthShared.Options;
using AutoWrapper.Extensions;
using AutoWrapper.Wrappers;
using IdentityServer4.Events;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AuthServer.Controllers
{
	[AllowAnonymous]
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IClientStore _clientStore;
		private readonly ApplicationDbContext _dbContext;
		private readonly IEventService _events;
		private readonly IIdentityServerInteractionService _interaction;
		private readonly IAuthenticationSchemeProvider _schemeProvider;
		private readonly SignInManager<AuthUser> _signInManager;
		private readonly UserManager<AuthUser> _userManager;

		public AuthController(UserManager<AuthUser> userManager,
			SignInManager<AuthUser> signInManager,
			IIdentityServerInteractionService interaction,
			IClientStore clientStore,
			IAuthenticationSchemeProvider schemeProvider,
			IEventService events,
			ApplicationDbContext dbContext)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_interaction = interaction;
			_clientStore = clientStore;
			_schemeProvider = schemeProvider;
			_events = events;
			_dbContext = dbContext;
		}

		[HttpPost("register")]
		public async Task<ApiResponse> Register([FromBody] RegisterModel model)
		{
			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors());
			AuthUser user = new(model.Email, model.Email, model.FirstName, model.LastName);
			var result = await _userManager.CreateAsync(user, model.Password);
			if (!result.Succeeded)
				throw new ApiException(result.Errors);
			return new ApiResponse("Successfully registered");
		}


		[HttpPost("login")]
		public async Task<ApiResponse> Login([FromBody] LoginModel model)
		{
			// var context = await _interaction.GetAuthorizationContextAsync(model.ClientId);

			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors());

			var result = await _signInManager.PasswordSignInAsync(model.Email,
				model.Password,
				model.RememberLogin,
				false);

			if (result.Succeeded)
			{
				var user = await _userManager.FindByNameAsync(model.Email);
				await _events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id, user.UserName));

				var authClaims = new[]
				{
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
					new Claim(JwtRegisteredClaimNames.Sub, user.Id),
					new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
					new Claim("scope", "carpool_rest_api")
				};

				var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.Key));

				var token = new JwtSecurityToken(JwtOptions.Issuer,
					JwtOptions.Audience,
					expires: DateTime.Now.AddMinutes(5),
					claims: authClaims,
					signingCredentials: new SigningCredentials(authSigningKey,
						SecurityAlgorithms.HmacSha256));

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

				user.RefreshTokens.Add(refreshToken);
				_dbContext.Set<AuthUser>().Update(user);
				await _dbContext.SaveChangesAsync();

				try
				{
					var tk = new JwtSecurityTokenHandler().WriteToken(token);
					return new ApiResponse(new {token = tk, expires = token.ValidTo, refreshToken});
				}
				catch (Exception ex)
				{
					throw new Exception();
				}
			}

			await _events.RaiseAsync(new UserLoginFailureEvent(model.Email, "invalid credentials"));
			ModelState.AddModelError(string.Empty, "Invalid email or password");

			return new ApiResponse();
		}
	}
}