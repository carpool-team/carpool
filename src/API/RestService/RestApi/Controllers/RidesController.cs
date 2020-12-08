using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.RideCommands;
using RestApi.Commands.RideCommands.AddRecurringRide;
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
		private readonly IMediator _mediator;

		public RidesController(IMediator mediator) => _mediator = mediator;

		// GET: api/Rides/5
		[HttpGet("{rideId}")]
		public async Task<ApiResponse> GetRide(RideId rideId)
		{
            GetRideQuery request = new(rideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

        [HttpGet("~/api/users/{appUserId}/rides")]
        public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] AppUserId userId,
            [FromQuery] bool past = false, [FromQuery]bool owned = false,[FromQuery]bool participated = false)
        {
			if (owned)
            {
                GetUserOwnedRidesQuery getUserOwnedRides = new(userId, past);
                var userOwnedRides = await _mediator.Send(getUserOwnedRides);

                return new ApiResponse(userOwnedRides);
			}
            if(participated)
            {
                GetUserParticipatedRidesQuery getUserParticipatedRides = new(userId, past);
                var userParticipatedRides = await _mediator.Send(getUserParticipatedRides);

                return new ApiResponse(userParticipatedRides);
            }

            GetUserRidesQuery getUserRides = new(userId, past);
            var userRides = await _mediator.Send(getUserRides);

            return new ApiResponse(userRides);
        }

        // PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{rideId}")]
		public async Task<ApiResponse> PutRide([FromRoute] RideId rideId, [FromBody] UpdateRideDto model)
		{
			UpdateRideCommand updateRide = new(rideId,
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
			var ride = await _mediator.Send(request);
			return new ApiResponse(ride, StatusCodes.Status201Created);
		}

		[HttpPost("recurring")]
		public async Task<ApiResponse> AddRecurringRide([FromBody] AddRecurringRideCommand request)
		{
			var rideIds = await _mediator.Send(request);
			return new ApiResponse(rideIds, StatusCodes.Status201Created);
		}

        [HttpPost("{rideId}/users")]
        public async Task<ApiResponse> AddParticipant([FromRoute] RideId rideId,
            [FromBody] AddRideParticipantCommand addRideParticipant)
        {
            addRideParticipant.RideId = rideId;
            await _mediator.Send(addRideParticipant).ConfigureAwait(false);

            return new ApiResponse("Added user to the ride", StatusCodes.Status201Created);
        }

		// DELETE: api/Rides/5
		[HttpDelete("{rideId}")]
		public async Task<ApiResponse> DeleteRide(RideId rideId)
		{
            DeleteRideCommand deleteRide = new(rideId);
			var ride = await _mediator.Send(deleteRide).ConfigureAwait(false);

			return new ApiResponse(ride);
		}


        [HttpDelete("{rideId}/users/{appUserId}")]
		public async Task<ApiResponse> RemoveUserFromRide([FromRoute] RideId rideId, [FromRoute] AppUserId appUserId)
		{
            RemoveUserFromRideCommand removeUserFromRide = new(rideId, appUserId);
			var response = await _mediator.Send(removeUserFromRide).ConfigureAwait(false);

			return new ApiResponse($"User with id {appUserId} has been deleted from ride with id {rideId}");
		}
	}
}