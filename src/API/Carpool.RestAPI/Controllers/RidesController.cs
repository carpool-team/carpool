using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.Ride;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.RestAPI.Queries.Ride;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
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
		public async Task<ApiResponse> GetRide(Guid rideId)
		{
			var request = new GetRideQuery(rideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		// PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<ApiResponse> PutRide(Guid id, UpdateRideCommand request)
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
		public async Task<ApiResponse> AddParticipant([FromRoute] Guid rideId,
		                                              [FromBody] AddRideParticipandCommand request)
		{
			request.RideId = rideId;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse("ok");
		}
		
		[HttpGet("~/api/users/{userId}/rides/participated")]
		public async Task<ApiResponse> GetUserParticipatedRides([FromRoute] Guid userId,
		                                                        [FromQuery] bool past = false)
		{
			var request = new GetUserParticipatedRidesQuery(userId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpGet("~/api/users/{userId}/rides/owned")]
		public async Task<ApiResponse> GetUserOwnedRides([FromRoute] Guid userId,
		                                                 [FromQuery] bool past = false)
		{
			var request = new GetUserOwnedRidesQuery(userId, past);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}