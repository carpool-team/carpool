using System;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.RestAPI.Abstract;
using Carpool.RestAPI.Commands.Location;
using Carpool.RestAPI.Queries.Location;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LocationsController : ParentController
	{
		private readonly IMediator _mediator;

		public LocationsController(IMediator mediator)
			=> _mediator = mediator;

		// GET: api/Locations
		[HttpGet]
		public async Task<IActionResult> GetLocation()
		{
			var request = new GetLocationsQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

		// GET: api/Locations/5
		[HttpGet("{locationId}")]
		public async Task<IActionResult> GetLocation(Guid locationId)
		{
			var request = new GetLocationByIdQuery(locationId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// PUT: api/Locations/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{locationId}")]
		public async Task<IActionResult> PutLocation(Guid locationId, UpdateLocationCommand request)
		{
			request.Id = locationId;
			await _mediator.Send(request).ConfigureAwait(false);

			return Ok(request);
		}

		// POST: api/Locations
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<IActionResult> PostLocation([FromBody] AddLocationCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// DELETE: api/Locations/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Location>> DeleteLocation(Guid id)
		{
			var request = new DeleteLocationCommand(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}
	}
}