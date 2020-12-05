using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuthDomain.Entities;
using AuthServer.Data;
using AuthServer.Models;
using AuthServer.Services;
using AuthServer.Utilities;
using AutoWrapper.Extensions;
using AutoWrapper.Wrappers;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestApi.DTOs.User;

namespace AuthServer.Controllers
{
	[AllowAnonymous]
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly ApplicationDbContext _dbContext;
		private readonly IAuthenticationSchemeProvider _schemeProvider;
		private readonly SignInManager<AuthUser> _signInManager;
		private readonly UserManager<AuthUser> _userManager;

		private readonly IUserManagementService _userManagementService;

        public AuthController(UserManager<AuthUser> userManager,
            SignInManager<AuthUser> signInManager,
            IAuthenticationSchemeProvider schemeProvider,
            ApplicationDbContext dbContext, IUserManagementService userManagementService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _schemeProvider = schemeProvider;
            _dbContext = dbContext;
            _userManagementService = userManagementService;
        }

        [HttpPost("register")]
		public async Task<ApiResponse> Register([FromBody] RegisterModel model)
		{
			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors());

			IdGenerator idGenerator = new IdGenerator(IdGeneratorType.User);
			AuthUser user = new(model.Email, model.Email, model.FirstName, model.LastName, new AppUserId(idGenerator.CreateId()));
			var result = await _userManager.CreateAsync(user, model.Password);

			if (!result.Succeeded)
				throw new ApiException(result.Errors);

			AddUserDto addUser = new AddUserDto(user.AppUserId.Value,
				user.FirstName,
				user.LastName,
				user.Email);

            try 
			{ 
				await _userManagementService.CreateUser(addUser);
				return new ApiResponse("Successfully registered", StatusCodes.Status201Created);
			}
			catch (Exception ex)
            {
				throw new ApiException(ex);
            }
		}


		[HttpPost("login")]
		public async Task<ApiResponse> Login([FromBody] LoginModel model)
		{
			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors());

			var result = await _signInManager.PasswordSignInAsync(model.Email,
				model.Password,
				model.RememberLogin,
				false);

			if (!result.Succeeded)
			{
				ModelState.AddModelError(string.Empty, "Invalid email or password");

				throw new ApiException(ModelState);
			}

			var user = await _userManager.FindByNameAsync(model.Email);

			TokenGenerator tokenGenerator = new();
			var token = tokenGenerator.GenerateJwtToken(new IdentityUserId(user.Id));
			var refreshToken = tokenGenerator.GenerateRefreshToken();

			user.RefreshTokens.Add(refreshToken);
			_dbContext.Set<AuthUser>().Update(user);
			await _dbContext.SaveChangesAsync();

			try
			{
				var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
				return new ApiResponse(new {token = jwtToken, expires = token.ValidTo, refreshToken});
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}

		[HttpPost("refresh-token")]
		public async Task<ApiResponse> RefreshToken([FromBody] string refreshToken)
		{
			var refreshTokenBytes = Convert.FromBase64String(refreshToken);

			var deserializedRefreshToken = JsonConvert.DeserializeObject(Encoding.ASCII.GetString(refreshTokenBytes));
			var authUser = await AsyncEnumerable.SingleOrDefaultAsync(_dbContext.Set<AuthUser>(),
				x => x.RefreshTokens.Any(a => a == deserializedRefreshToken && a.IsActive));

			_ = authUser ?? throw new ApiException("Provided token is invalid", StatusCodes.Status401Unauthorized);

			// ReSharper disable once PossibleNullReferenceException
			authUser.RefreshTokens.SingleOrDefault(x => x == deserializedRefreshToken).Revoked = DateTime.Now;

			TokenGenerator tokenGenerator = new();

			var token = tokenGenerator.GenerateJwtToken(new IdentityUserId(authUser.Id));

			var newRefreshToken = tokenGenerator.GenerateRefreshToken();

			authUser.RefreshTokens.Add(newRefreshToken);
			_dbContext.Set<AuthUser>().Update(authUser);
			try
			{
				await _dbContext.SaveChangesAsync();
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			var refreshTokenByteArray = Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(newRefreshToken));

			try
			{
				var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
				return new ApiResponse(new
				{
					token = jwtToken,
					expires = token.ValidTo,
					refreshToken = Convert.ToBase64String(refreshTokenByteArray)
				});
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}