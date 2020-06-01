using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.Core.DTOs.RideRequestDTOs;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RideRequestsController : Controller
	{
		private readonly CarpoolDbContext _context;

		public RideRequestsController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/RideRequests
		[HttpGet]
		public async Task<ActionResult<IEnumerable<RideRequest>>> GetRideRequests()
		{
			return await _context.RideRequests.ToListAsync();
		}

		// GET: api/RideRequests/5
		[HttpGet("{id}")]
		public async Task<ActionResult<RideRequest>> GetRideRequest(Guid id)
		{
			var rideRequest = await _context.RideRequests.FindAsync(id);

			if (rideRequest == null)
			{
				return NotFound();
			}

			return rideRequest;
		}

		// PUT: api/RideRequests/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutRideRequest(Guid id, RideRequest rideRequest)
		{
			if (id != rideRequest.Id)
			{
				return BadRequest();
			}

			_context.Entry(rideRequest).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!RideRequestExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/RideRequests
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<RideRequest>> PostRideRequest([FromBody]AddRideRequestDTO rideRequestDTO)
		{
			var rideRequest = new RideRequest()
			{
				Date = rideRequestDTO.Date,
				Destination = rideRequestDTO.Destination,
				StartingLocation = rideRequestDTO.StartingLocation,
				Requester = null,
			};
			_context.RideRequests.Add(rideRequest);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetRideRequest", new { id = rideRequest.Id }, rideRequestDTO);
		}

		// DELETE: api/RideRequests/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<RideRequest>> DeleteRideRequest(Guid id)
		{
			var rideRequest = await _context.RideRequests.FindAsync(id);
			if (rideRequest == null)
			{
				return NotFound();
			}

			_context.RideRequests.Remove(rideRequest);
			await _context.SaveChangesAsync();

			return rideRequest;
		}

		[HttpGet("GetEmptyAddRideRequest")]
		public async Task<ActionResult<AddRideRequestDTO>> GetEmptyAddRideRequest()
		{
			var addRideRequestDTO = AddRideRequestDTO.GetEmpty();
			return Json(addRideRequestDTO);
		}

		private bool RideRequestExists(Guid id)
		{
			return _context.RideRequests.Any(e => e.Id == id);
		}
	}
}