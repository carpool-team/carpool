using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.RestAPI.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class LocationsController : ParentController
	{
		private readonly CarpoolDbContext _context;

		public LocationsController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/Locations
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Location>>> GetLocation()
		{
			return await _context.Locations.Include(location => location.Coordinates).ToListAsync();
		}

		// GET: api/Locations/5
		[HttpGet("{locationId}")]
		public async Task<ActionResult<Location>> GetLocation(Guid locationId)
		{
			var location = await _context.Locations.FindAsync(locationId);

			if (location == null)
			{
				return NotFound();
			}

			return location;
		}

		// PUT: api/Locations/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{locationId}")]
		public async Task<IActionResult> PutLocation(Guid locationId, Location location)
		{
			if (locationId != location.Id)
			{
				return BadRequest();
			}

			_context.Entry(location).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!LocationExists(locationId))
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

		// POST: api/Locations
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Location>> PostLocation([FromBody] Location location)
		{
			_context.Locations.Add(location);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetLocation", new { id = location.Id }, location);
		}

		// DELETE: api/Locations/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Location>> DeleteLocation(Guid id)
		{
			var location = await _context.Locations.FindAsync(id);
			if (location == null)
			{
				return NotFound();
			}

			_context.Locations.Remove(location);
			await _context.SaveChangesAsync();

			return location;
		}


		[HttpPost("AddMockLocation")]
		public async Task<IActionResult> AddMockLocation()
		{
			var location = new Location()
			{
				Coordinates = new Coordinates()
				{
					Longitude = 53.123454,
					Latitude = 23.086287,
				},

					Name = "ul. Szkolna 17, Białystok"
				
			};
			_context.Locations.Add(location);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetLocation", new { id = location.Id }, location);
		}

		private bool LocationExists(Guid id)
		{
			return _context.Locations.Any(e => e.Id == id);
		}
	}
}