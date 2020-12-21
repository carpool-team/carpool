﻿using System.Threading.Tasks;
using AuthServer.Commands;
using AuthServer.Extensions;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.DTOs.User;

namespace AuthServer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class UsersController : ControllerBase
	{
		private readonly IMediator _mediator;
		
		public UsersController(IMediator mediator) {
			_mediator = mediator;
		}

		[HttpPut("{appUserId}")]
		public async Task<ApiResponse> Put([FromRoute]AppUserId appUserId, [FromBody] UpdateUserDto updateUser)
		{
			if (User.GetUserId() != appUserId)
				throw new ApiException(StatusCodes.Status403Forbidden);
					
			UpdateUserCommand request = new(User.GetUserId(),
				updateUser.FirstName,
				updateUser.LastName,
				updateUser.Email);

			await _mediator.Send(request);

			return new ApiResponse(StatusCodes.Status204NoContent);
		}
	}
}