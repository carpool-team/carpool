using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth.DataAccessLayer.DatabaseContexts;
using AuthDomain.Entities;
using AuthServer.Services;
using AuthServer.Utilities;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RestApi.DTOs.User;

namespace AuthServer.Commands
{
	public class UpdateUserCommand : IRequest
	{
		public UpdateUserCommand(AppUserId appUserId,
			string firstName, 
			string lastName, 
			string email)
		{
			AppUserId = appUserId;
			FirstName = firstName;
			LastName = lastName;
			Email = email;
		}

		public AppUserId AppUserId { get; }
		public string FirstName { get; }
		public string LastName { get; }
		public string Email { get; }
	}
	
	public class UpdateUserCommandHandler : AsyncRequestHandler<UpdateUserCommand>
	{
		private readonly UserManager<AuthUser> _userManager;
		private readonly ApplicationDbContext _dbContext;
		private readonly ITokenGenerator _tokenGenerator;
		private readonly IUserManagementService _userManagementService;

		public UpdateUserCommandHandler(UserManager<AuthUser> userManager, ITokenGenerator tokenGenerator, IUserManagementService userManagementService, ApplicationDbContext dbContext)
		{
			_userManager = userManager;
			_tokenGenerator = tokenGenerator;
			_userManagementService = userManagementService;
			_dbContext = dbContext;
		}

		protected override async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
		{
			var user = await AsyncEnumerable.SingleOrDefaultAsync(_dbContext.AuthUsers, x => x.AppUserId == request.AppUserId,
				cancellationToken);

			if (user is null)
				throw new ApiException("User does not exists.");
			
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;

			try
			{
				await _dbContext.SaveChangesAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			UpdateUserDto updateUserDto = new(request.FirstName,
				request.LastName,
				request.Email);

			try
			{
				await _userManagementService.UpdateUser(request.AppUserId.Value, updateUserDto);
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}