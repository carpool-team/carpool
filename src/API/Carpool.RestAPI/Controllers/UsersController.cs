using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.Rating;
using Carpool.RestAPI.Commands.User;
using Carpool.RestAPI.DTOs.GroupDTOs;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.RestAPI.Queries.Group;
using Carpool.RestAPI.Queries.GroupInvite;
using Carpool.RestAPI.Queries.Rating;
using Carpool.RestAPI.Queries.Ride;
using Carpool.RestAPI.Queries.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : Controller
	{
		private readonly CarpoolDbContext _context;
		private readonly IMediator _mediator;

		public UsersController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
			_mediator = mediator;
		}

		// GET: api/Users
		[HttpGet]
		public async Task<ApiResponse> GetUsers()
		{
			var request = new GetUsersQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// GET: api/Users/5
		[HttpGet("{id}")]
		public async Task<ApiResponse> GetUser(Guid id)
		{
			var request = new GetUserByIdQuery(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpGet("~/api/groups/{groupId}/users")]
		public async Task<ApiResponse> GetGroupUsers([FromRoute] Guid groupId)
		{
			var result = await _mediator.Send(new GetGroupUsersQuery(groupId)).ConfigureAwait(false);
			return new ApiResponse(result);
		}

		// PUT: api/Users/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<ApiResponse> PutUser(Guid id, UpdateUserCommand request)
		{
			request.UserId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(request);
		}

		// POST: api/Users
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostUser(AddUserCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// DELETE: api/Users/5
		[HttpDelete("{userId}")]
		public async Task<ApiResponse> DeleteUser(Guid userId)
		{
			var request = new DeleteUserCommand(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}