using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.Rating;
using Carpool.RestAPI.Commands.User;
using Carpool.RestAPI.DTOs.GroupDTOs;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.RestAPI.DTOs.UserDTOs;
using Carpool.RestAPI.Queries.Group;
using Carpool.RestAPI.Queries.GroupInvite;
using Carpool.RestAPI.Queries.Rating;
using Carpool.RestAPI.Queries.Ride;
using Carpool.RestAPI.Queries.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
		public async Task<IActionResult> GetUsers()
		{
			var request = new GetUsersQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

		// GET: api/Users/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetUser(Guid id)
		{
			var request = new GetUserByIdQuery(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			
			return Ok(response);
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
		public async Task<IActionResult> PutUser(Guid id, UpdateUserCommand request)
		{
			request.UserId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(request);
		}

		// POST: api/Users
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<User>> PostUser(AddUserCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

		// DELETE: api/Users/5
		[HttpDelete("{userId}")]
		public async Task<IActionResult> DeleteUser(Guid userId)
		{
			var request = new DeleteUserCommand(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		#region Group Invites

		[HttpGet("{userId}/groupInvites")]
		public async Task<IActionResult> GetUserGroupInvites([FromRoute] Guid userId)
		{
			var request = new GetUserGroupInvitesQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		#endregion Group Invites

		#region Groups

		[HttpGet("{userId}/groups")]
		public async Task<ActionResult<List<IndexGroupDTO>>> GetUserGroups([FromRoute] Guid userId)
		{
			var request = new GetUserGroupsQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);
			
			return Ok(response);
		}

		#endregion Groups

		#region Ratings

		[HttpGet("{userId}/rating")]
		public async Task<IActionResult> GetUserRatingByUserId([FromRoute] Guid userId)
		{
			var request = new GetUserRatingQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		[HttpPost("{userId}/ratings")]
		public async Task<ActionResult> AddUserRating([FromBody] AddUserRatingCommand request, [FromRoute] Guid userId)
		{
			request.UserId = userId;
			var response = await _mediator.Send(request).ConfigureAwait(false);
			
			return Ok(response);
		}

		#endregion Ratings

		#region Rides

		[HttpGet("{userId}/rides/participated")]
		public async Task<ActionResult<List<IndexRideDTO>>> GetUserParticipatedRides(
			[FromRoute] Guid userId,
			[FromQuery] bool past = false)
		{
			var request = new GetUserParticipatedRidesQuery(userId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		[HttpGet("{userId}/rides/owned")]
		public async Task<IActionResult> GetUserOwnedRides(
			[FromRoute] Guid userId,
			[FromQuery] bool past = false)
		{
			var request = new GetUserOwnedRidesQuery(userId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}
		
		#endregion Rides
	}
}