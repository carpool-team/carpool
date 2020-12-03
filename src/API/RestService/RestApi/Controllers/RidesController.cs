using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.RideCommands;
using RestApi.Commands.RideCommands.RemoveUserFromRide;
using RestApi.DTOs.Ride;
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

        // GET: api/Rides/5
		[HttpGet("{rideId}")]
		public async Task<ApiResponse> GetRide(RideId rideId)
		{
            GetRideQuery request = new(rideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

        [HttpGet("~/api/users/{appUserId}/rides/participated")]
        public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] long userId,
            [FromQuery] bool past = false)
        {
            AppUserId typedAppUserId = new(userId);
            GetUserParticipatedRidesQuery request = new(typedAppUserId, past);
            var response = await _mediator.Send(request).ConfigureAwait(false);

            return new ApiResponse(response);
        }

        [HttpGet("~/api/users/{appUserId}/rides/owned")]
        public async Task<ApiResponse> GetUserOwnedRides([FromRoute] long userId,
            [FromQuery] bool past = false)
        {
            AppUserId typedAppUserId = new(userId);
            GetUserOwnedRidesQuery request = new(typedAppUserId, past);
            var response = await _mediator.Send(request).ConfigureAwait(false);

            return new ApiResponse(response);
        }

		// PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{rideId}")]
		public async Task<ApiResponse> PutRide([FromRoute] long rideId, [FromBody] UpdateRideDto model)
		{
			RideId typedRideId = new(rideId);
            UpdateRideCommand request = new(typedRideId,
				model.ParticipantIds,
				model.Date,
				model.Price);

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

        [HttpPost("{rideId}/users")]
        public async Task<ApiResponse> AddParticipant([FromRoute] RideId rideId,
            [FromBody] AddRideParticipandCommand request)
        {
            request.RideId = rideId;
            var response = await _mediator.Send(request).ConfigureAwait(false);

            return new ApiResponse("ok");
        }

		// DELETE: api/Rides/5
		[HttpDelete("{rideId}")]
		public async Task<ApiResponse> DeleteRide(long rideId)
		{
			RideId typedRideId = new(rideId);
			var request = new DeleteRideCommand(typedRideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}


        [HttpDelete("{rideId}/users/{appUserId}")]
		public async Task<ApiResponse> RemoveUserFromRide([FromRoute] long rideId, [FromRoute] AppUserId appUserId)
		{
			RideId typedRideId = new(rideId);
			var request = new RemoveUserFromRideCommand(typedRideId, appUserId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse($"User with id {appUserId} has been deleted from ride with id {rideId}");
		}
	}
}