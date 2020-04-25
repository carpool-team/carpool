using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Abstract;
using Carpool.RestAPI.DTOs.LocationDTOs;

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
			return await _context.Locations.ToListAsync();
		}

		// GET: api/Locations/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Location>> GetLocation(Guid id)
		{
			var location = await _context.Locations.FindAsync(id);

			if (location == null)
			{
				return NotFound();
			}

			return location;
		}

		// PUT: api/Locations/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutLocation(Guid id, Location location)
		{
			if (id != location.Id)
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
				if (!LocationExists(id))
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
		public async Task<ActionResult<Location>> PostLocation(Location location)
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

		[HttpGet("GetMockLocation")]
		public async Task<ActionResult<Location>> GetMockLocation()
		{
			var szkolna = new Location()
			{
				Coordinates = new Coordinates()
				{
					Longitude = 53.123454,
					Latitude = 23.086287,
				},
				LocationName = new LocationName()
				{
					Name = "ul. Szkolna 17, Białystok"
				}
			};
			var location = new LocationDTO()
			{
				Coordinates = new CoordinatesDTO()
				{
					Latitude = szkolna.Coordinates.Latitude,
					Longitute = szkolna.Coordinates.Longitude
				},
				Name = szkolna.LocationName.Name
			};
			return Json(location);
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
				LocationName = new LocationName()
				{
					Name = "ul. Szkolna 17, Białystok"
				}
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