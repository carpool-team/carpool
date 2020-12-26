using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth.DataAccessLayer.DatabaseContexts;
using AuthDomain.Entities;
using AuthServer.Services;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Identity;
using RestApi.DTOs.User;

namespace AuthServer.Commands
{
	public class DeleteUserCommand : IRequest<IndexUserDto>
	{
		public DeleteUserCommand(AppUserId appUserId) 
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, IndexUserDto>
	{
		private readonly UserManager<AuthUser> _userManager;
		private readonly ApplicationDbContext _dbContext;
		private readonly IUserManagementService _userManagementService;
		
		public DeleteUserCommandHandler(UserManager<AuthUser> userManager,
			ApplicationDbContext dbContext,
			IUserManagementService userManagementService)
		{
			_userManager = userManager;
			_dbContext = dbContext;
			_userManagementService = userManagementService;
		}

		public async Task<IndexUserDto> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _dbContext.Set<AuthUser>()
				.SingleOrDefaultAsync(x => x.AppUserId == request.AppUserId, cancellationToken);

			try
			{
				var identityResult = await _userManager.DeleteAsync(user);

				if (!identityResult.Succeeded)
					throw new ApiException(identityResult.Errors);
			}
			catch (Exception ex)
			{
			}
			
			IndexUserDto indexUserDto;
			
			try
			{
				indexUserDto = await _userManagementService.DeleteUser(request.AppUserId.Value);
			}
			catch (RestEase.ApiException ex)
			{
				throw new ApiException(ex);
			}

			return indexUserDto;
		}
	}
}