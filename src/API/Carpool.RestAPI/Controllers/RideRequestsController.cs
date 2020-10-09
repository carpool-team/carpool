using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.RideRequest;
using Carpool.RestAPI.Queries.RideRequest;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RideRequestsController : Controller
	{
		private readonly CarpoolDbContext _context;
		private readonly IMediator _mediator;

		public RideRequestsController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
			_mediator = mediator;
		}

		// GET: api/RideRequests
		[HttpGet]
		public async Task<ActionResult<IEnumerable<RideRequest>>> GetRideRequests()
		{
			var request = new GetRideRequestsQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// GET: api/RideRequests/5
		[HttpGet("{id}")]
		public async Task<ActionResult<RideRequest>> GetRideRequest(Guid id)
		{
			var request = new GetRideRequestByIdQuery(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// PUT: api/RideRequests/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutRideRequest(Guid id, UpdateRideRequestCommand request)
		{
			request.RideRequestId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);


			return Ok(request);
		}

		// POST: api/RideRequests
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<IActionResult> PostRideRequest([FromBody] AddRideRequestCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// DELETE: api/RideRequests/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteRideRequest(Guid id)
		{
			var request = new DeleteRideRequestCommand(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}
	}
}