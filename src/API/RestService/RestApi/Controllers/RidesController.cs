﻿using System;
using System.Threading.Tasks;
using Application.Commands.RideCommands;
using Application.Commands.RideCommands.AddRecurringRide;
using Application.Commands.RideCommands.DeleteRecurringRide;
using Application.Commands.RideCommands.RemoveUserFromRide;
using Application.Queries.GroupQueries;
using Application.Queries.RideQueries;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using DataTransferObjects.Ride;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Extensions;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class RidesController : Controller
	{
		private readonly IMediator _mediator;

		public RidesController(IMediator mediator) => _mediator = mediator;

		[HttpGet]
		public async Task<ApiResponse> GetRides([FromQuery] GroupId groupId,
			[FromQuery] DateTimeOffset? dateTime = null,
			[FromQuery] RideDirection? rideDirection = null)
		{
			GetRidesQuery getRides = new(groupId,
				dateTime,
				User.GetUserId(),
				rideDirection);
			var rides = await _mediator.Send(getRides);

			return new ApiResponse(rides);
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
        public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] AppUserId appUserId,
            [FromQuery] bool past = false, [FromQuery]bool owned = false,[FromQuery]bool participated = false)
		{
			if (User.GetUserId() != appUserId)
				throw new ApiException("User does not have permissions to view other user rides.",
					StatusCodes.Status403Forbidden);
			if (owned)
			{
                GetUserOwnedRidesQuery getUserOwnedRides = new(appUserId, past);
                var userOwnedRides = await _mediator.Send(getUserOwnedRides);

                return new ApiResponse(userOwnedRides);
			}
            if(participated)
            {
                GetUserParticipatedRidesQuery getUserParticipatedRides = new(appUserId, past);
                var userParticipatedRides = await _mediator.Send(getUserParticipatedRides);

                return new ApiResponse(userParticipatedRides);
            }

            GetUserRidesQuery getUserRides = new(appUserId, past);
            var userRides = await _mediator.Send(getUserRides);

            return new ApiResponse(userRides);
        }

        [HttpGet("~/api/groups/{groupId}/rides")]
        public async Task<ApiResponse> GetGroupRides([FromRoute] GroupId groupId)
        {
	        GetGroupRidesQuery request = new(groupId, User.GetUserId());
	        var rides = await _mediator.Send(request);

	        return new ApiResponse(rides);
        }

        // PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{rideId}")]
		public async Task<ApiResponse> PutRide([FromRoute] RideId rideId, [FromBody] UpdateRideDto model)
		{
			var appUserId = User.GetUserId();
			
			UpdateRideCommand updateRide = new(rideId,
				model.ParticipantIds,
				model.Date,
				model.Price,
				appUserId);

			var ride = await _mediator.Send(updateRide).ConfigureAwait(false);

			return new ApiResponse(ride);
		}

		// POST: api/Rides
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostRide([FromBody] AddRideCommand request)
		{
			if (User.GetUserId() != request.OwnerId)
				throw new ApiException("User does not have permission to add other user ride",
					StatusCodes.Status403Forbidden);
			var ride = await _mediator.Send(request);
			return new ApiResponse(ride, StatusCodes.Status201Created);
		}

		[HttpPost("recurring")]
		public async Task<ApiResponse> AddRecurringRide([FromBody] AddRecurringRideCommand request)
		{
			if (User.GetUserId() != request.OwnerId)
				throw new ApiException("User does not have permission to add other user ride",
					StatusCodes.Status403Forbidden);
			var rideIds = await _mediator.Send(request);
			return new ApiResponse(rideIds, StatusCodes.Status201Created);
		}

		// DELETE: api/Rides/5
		[HttpDelete("{rideId}")]
		public async Task<ApiResponse> DeleteRide([FromRoute]RideId rideId)
		{
            DeleteRideCommand deleteRide = new(rideId, User.GetUserId());
			var ride = await _mediator.Send(deleteRide).ConfigureAwait(false);

			return new ApiResponse($"Deleted ride with id: {ride.Id}.");
		}

		[HttpDelete("recurring/{recurringRideId}")]
		public async Task<ApiResponse> DeleteRecurringRide([FromRoute] RecurringRideId recurringRideId)
		{
			DeleteRecurringRideCommand deleteRecurringRide = new(recurringRideId);

			var response = await _mediator.Send(deleteRecurringRide);

			return new ApiResponse("Rides has been deleted.");
		}


        [HttpDelete("{rideId}/users/{appUserId}")]
		public async Task<ApiResponse> RemoveUserFromRide([FromRoute] RideId rideId, [FromRoute] AppUserId appUserId)
		{
            RemoveUserFromRideCommand removeUserFromRide = new(rideId, appUserId, User.GetUserId());
			await _mediator.Send(removeUserFromRide).ConfigureAwait(false);

			return new ApiResponse($"User with id {appUserId} has been deleted from ride with id {rideId}");
		}
	}
}