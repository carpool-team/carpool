using System;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.RideCommands;
using RestApi.Commands.RideCommands.RemoveUserFromRide;
using RestApi.Queries.RideQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RidesController : Controller
	{
		private readonly CarpoolDbContext _context;
		private readonly IMediator _mediator;

		public RidesController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
			_mediator = mediator;
		}

		// GET: api/Rides?userId={id}
		[HttpGet]
		public async Task<ApiResponse> GetRides()
		{
			var request = new GetRidesQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// GET: api/Rides/5
		[HttpGet("{rideId}")]
		public async Task<ApiResponse> GetRide(RideId rideId)
		{
			var request = new GetRideQuery(rideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		// PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<ApiResponse> PutRide([FromRoute] RideId id, [FromBody] UpdateRideCommand request)
		{
			request.RideId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		// POST: api/Rides
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostRide([FromBody] AddRideCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// DELETE: api/Rides/5
		[HttpDelete("{id}")]
		public async Task<ApiResponse> DeleteRide(Guid id)
		{
			var request = new DeleteRideCommand(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(request);
		}

		[HttpPost("{rideId}/users")]
		public async Task<ApiResponse> AddParticipant([FromRoute] RideId rideId,
			[FromBody] AddRideParticipandCommand request)
		{
			request.RideId = rideId;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse("ok");
		}

		[HttpGet("~/api/users/{userId}/rides/participated")]
		public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] long userId,
			[FromQuery] bool past = false)
		{
			UserId typedUserId = new(userId);
			var request = new GetUserParticipatedRidesQuery(typedUserId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpGet("~/api/users/{userId}/rides/owned")]
		public async Task<ApiResponse> GetUserOwnedRides([FromRoute] long userId,
			[FromQuery] bool past = false)
		{
			UserId typedUserId = new(userId);
			var request = new GetUserOwnedRidesQuery(typedUserId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpDelete("{rideId}/users/{userId}")]
		public async Task<ApiResponse> RemoveUserFromRide([FromRoute] long rideId, [FromRoute] UserId userId)
		{
			RideId typedRideId = new(rideId);
			var request = new RemoveUserFromRideCommand(typedRideId, userId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse($"User with id {userId} has been deleted from ride with id {rideId}");
		}
	}
}