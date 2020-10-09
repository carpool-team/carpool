using System;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Abstract;
using Carpool.RestAPI.Commands.Ride;
using Carpool.RestAPI.Queries.Ride;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RidesController : ParentController
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
		public async Task<IActionResult> GetRides()
		{
			var request = new GetRidesQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

		// GET: api/Rides/5
		[HttpGet("{rideId}")]
		public async Task<IActionResult> GetRide(Guid rideId)
		{
			var request = new GetRideQuery(rideId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutRide(Guid id, UpdateRideCommand request)
		{
			request.RideId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// POST: api/Rides
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Ride>> PostRide([FromBody] AddRideCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

		// DELETE: api/Rides/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteRide(Guid id)
		{
			var request = new DeleteRideCommand(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(request);
		}

		[HttpPost("{rideId}/users")]
		public async Task<ActionResult> AddParticipant([FromRoute] Guid rideId,
		                                               [FromBody] AddRideParticipandCommand request)
		{
			request.RideId = rideId;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok("ok");
		}
	}
}