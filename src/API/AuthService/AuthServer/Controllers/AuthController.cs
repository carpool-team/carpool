﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Auth.DataAccessLayer.DatabaseContexts;
using AuthDomain.Entities;
using AuthServer.Extensions;
using AuthServer.Models;
using AuthServer.Services;
using AuthServer.Utilities;
using AutoWrapper.Extensions;
using AutoWrapper.Wrappers;
using DataTransferObjects.User;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AuthServer.Controllers
{
	[AllowAnonymous]
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly ApplicationDbContext _dbContext;
		private readonly SignInManager<AuthUser> _signInManager;

		private readonly ITokenGenerator _tokenGenerator;
		private readonly IUserManagementService _userManagementService;
		private readonly UserManager<AuthUser> _userManager;

		public AuthController(UserManager<AuthUser> userManager,
		                      SignInManager<AuthUser> signInManager,
		                      ApplicationDbContext dbContext,
		                      IUserManagementService userManagementService,
		                      ITokenGenerator tokenGenerator)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_dbContext = dbContext;
			_userManagementService = userManagementService;
			_tokenGenerator = tokenGenerator;
		}

		[HttpPost("register")]
		public async Task<ApiResponse> Register([FromBody] RegisterModel model)
		{
			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors());

			var idGenerator = new IdGenerator(IdGeneratorType.User);
			AuthUser user = new(model.Email, model.FirstName, model.LastName,
				new AppUserId(idGenerator.CreateId()));

			var result = await _userManager.CreateAsync(user, model.Password);

			if (!result.Succeeded)
				throw new ApiException(result.Errors);

			var addUser = new AddUserDto(user.AppUserId,
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
				await _userManager.DeleteAsync(user);
				throw new ApiException(ex);
			}
		}

		[HttpPost("login")]
		public async Task<ApiResponse> Login([FromBody] LoginModel model)
		{
			if (!ModelState.IsValid)
				throw new ApiException(ModelState.AllErrors(), StatusCodes.Status401Unauthorized);

			var result = await _signInManager.PasswordSignInAsync(model.Email,
				             model.Password,
				             model.RememberLogin,
				             false);

			if (!result.Succeeded)
			{
				ModelState.AddModelError(string.Empty, "Invalid email or password");

				throw new ApiException(ModelState.AllErrors(), StatusCodes.Status401Unauthorized);
			}


			var user = await _userManager.FindByNameAsync(model.Email);

			var token = _tokenGenerator.GenerateJwtToken(user.AppUserId);
			var refreshToken = _tokenGenerator.GenerateRefreshToken();

			user.RefreshTokens.Add(refreshToken);
			_dbContext.Set<AuthUser>().Update(user);
			await _dbContext.SaveChangesAsync();

			var refreshTokenByteArray = Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(refreshToken));
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

		[HttpPut("change-password")]
		[Authorize]
		public async Task<ApiResponse> ChangePassword([FromBody] ChangePasswordModel model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);

			if (user == null)
				throw new ApiException("User does not exist.", StatusCodes.Status404NotFound);

			if (user.AppUserId != User.GetUserId())
				throw new ApiException(StatusCodes.Status403Forbidden);
			
			var identityResult = await _userManager.ChangePasswordAsync(user, 
				model.CurrentPassword,
				model.NewPassword);

			if (!identityResult.Succeeded)
				throw new ApiException("Failed to change the password.");

			return new ApiResponse(StatusCodes.Status204NoContent);
		}
		
		[HttpPost("refresh-token")]
		public async Task<ApiResponse> RefreshToken([FromBody] RefreshTokenModel refreshToken)
		{
			var refreshTokenBytes = Convert.FromBase64String(refreshToken.Value);

			var deserializedRefreshToken =
				JsonConvert.DeserializeObject<RefreshToken>(Encoding.ASCII.GetString(refreshTokenBytes));

			var user = await _dbContext.AuthUsers
			                           .Include(x => x.RefreshTokens)
			                           .Where(x => x.RefreshTokens.Any(a => a.Token == deserializedRefreshToken.Token))
			                           .SingleOrDefaultAsync();

			_ = user ?? throw new ApiException("Provided token was invalid or not found",
				    StatusCodes.Status401Unauthorized);

			var loadedToken = user.RefreshTokens.SingleOrDefault(x => x.Token == deserializedRefreshToken.Token);

			if (!loadedToken.IsActive)
				throw new ApiException("Provided token was ivnalid or not found", StatusCodes.Status401Unauthorized);

			var token = user.RefreshTokens.SingleOrDefault(x => x.Token == deserializedRefreshToken.Token);
			// ReSharper disable once PossibleNullReferenceException
			token.Revoked = DateTime.Now;

			var newJwtToken = _tokenGenerator.GenerateJwtToken(user.AppUserId);
			var newRefreshToken = _tokenGenerator.GenerateRefreshToken();

			user.RefreshTokens.Add(newRefreshToken);
			_dbContext.Set<AuthUser>().Update(user);
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
				var jwtToken = new JwtSecurityTokenHandler().WriteToken(newJwtToken);
				return new ApiResponse(new
				{
					token = jwtToken,
					expires = newJwtToken.ValidTo,
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