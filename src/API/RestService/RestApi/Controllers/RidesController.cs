using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.RideCommands;
using RestApi.Commands.RideCommands.RemoveUserFromRide;
using RestApi.DTOs.Ride;
using RestApi.Queries.RideQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
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

        [HttpGet("~/api/users/{appUserId}/rides")]
        public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] long userId,
            [FromQuery] bool past = false, [FromQuery]bool owned = false,[FromQuery]bool participated = false)
        {
            AppUserId typedAppUserId = new(userId);

			if (owned)
            {
                GetUserOwnedRidesQuery getUserOwnedRides = new(typedAppUserId, past);
                var userOwnedRides = await _mediator.Send(getUserOwnedRides);

                return new ApiResponse(userOwnedRides);
			}
            if(participated)
            {
                GetUserParticipatedRidesQuery getUserParticipatedRides = new(typedAppUserId, past);
                var userParticipatedRides = await _mediator.Send(getUserParticipatedRides);

                return new ApiResponse(userParticipatedRides);
            }

            GetUserRidesQuery getUserRides = new(typedAppUserId, past);
            var userRides = await _mediator.Send(getUserRides);

            return new ApiResponse(userRides);
        }

        // PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{rideId}")]
		public async Task<ApiResponse> PutRide([FromRoute] long rideId, [FromBody] UpdateRideDto model)
		{
			RideId typedRideId = new(rideId);
            UpdateRideCommand updateRide = new(typedRideId,
				model.ParticipantIds,
				model.Date,
				model.Price);

			var ride = await _mediator.Send(updateRide).ConfigureAwait(false);

			return new ApiResponse(ride);
		}

		// POST: api/Rides
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostRide([FromBody] AddRideCommand request)
		{
			var ride = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(ride, StatusCodes.Status201Created);
		}

        [HttpPost("{rideId}/users")]
        public async Task<ApiResponse> AddParticipant([FromRoute] RideId rideId,
            [FromBody] AddRideParticipantCommand addrideParticipant)
        {
            addrideParticipant.RideId = rideId;
            await _mediator.Send(addrideParticipant).ConfigureAwait(false);

            return new ApiResponse("Added user to the ride", StatusCodes.Status201Created);
        }

		// DELETE: api/Rides/5
		[HttpDelete("{rideId}")]
		public async Task<ApiResponse> DeleteRide(long rideId)
		{
			RideId typedRideId = new(rideId);
            DeleteRideCommand deleteRide = new(typedRideId);
			var ride = await _mediator.Send(deleteRide).ConfigureAwait(false);

			return new ApiResponse(ride);
		}


        [HttpDelete("{rideId}/users/{appUserId}")]
		public async Task<ApiResponse> RemoveUserFromRide([FromRoute] long rideId, [FromRoute] AppUserId appUserId)
		{
			RideId typedRideId = new(rideId);
            RemoveUserFromRideCommand removeUserFromRide = new(typedRideId, appUserId);
			var response = await _mediator.Send(removeUserFromRide).ConfigureAwait(false);

			return new ApiResponse($"User with id {appUserId} has been deleted from ride with id {rideId}");
		}
	}
}