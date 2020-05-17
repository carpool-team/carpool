using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.Core.Models.Intersections;
using Carpool.RestAPI.Abstract;
using Newtonsoft.Json;
using Carpool.Core.DTOs.RideDTOs;
using Carpool.Core.DTOs.StopDTOs;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RidesController : ParentController
	{
		private readonly CarpoolDbContext _context;

		public RidesController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/Rides
		[HttpGet]
		public async Task<ActionResult<String>> GetRides()
		{
			var rides = await _context.Rides.AsNoTracking()
				.Include(ride => ride.Stops)
				.Include(ride => ride.StartingLocation)
					.ThenInclude(st => st.Coordinates)
				.Include(ride => ride.StartingLocation)
					.ThenInclude(st => st.LocationName)
				.Include(ride => ride.Participants)
				.Include(ride => ride.Owner)
				.Include(ride => ride.Destination)
					.ThenInclude(st => st.Coordinates)
				.Include(ride => ride.Destination)
					.ThenInclude(st => st.LocationName)
				.ToListAsync();
			var ridesDTO = rides.Select(ride => IndexRideDTO.GetFromRide(ride)).ToList();
			return Json(ridesDTO);
		}

		// GET: api/Rides/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Ride>> GetRide(Guid id)
		{
			var ride = await _context.Rides.FindAsync(id);

			if (ride == null)
			{
				return NotFound();
			}

			return ride;
		}

		// PUT: api/Rides/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutRide(Guid id, Ride ride)
		{
			if (id != ride.Id)
			{
				return BadRequest();
			}

			_context.Entry(ride).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!RideExists(id))
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

		// POST: api/Rides
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Ride>> PostRide([FromBody] string value)
		{
			var addRideDTO = AddRideDTO.GetFromJson(value);
			var stops = addRideDTO.AddStopDTOs.Select(stop => new Stop()
			{
				User = _context.Users.FirstOrDefault(user => user.Id == stop.UserId),
				Coordinates = stop.Coordinates
			}).ToList();
			var users = stops.Select(stop => stop.User).ToList<User>();
			var ride = new Ride()
			{
				Destination = addRideDTO.Destination,
				StartingLocation = addRideDTO.StartingLocation,
				Owner = await _context.Users.FirstOrDefaultAsync(user => user.Id == addRideDTO.OwnerId),
				Stops = stops
			};
			ride.Participants = users.Select(user => new UserParticipatedRide()
			{
				Ride = ride,
				User = user
			}).ToList();
			_context.Rides.Add(ride);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetRide", new { id = ride.Id }, ride);
		}

		// DELETE: api/Rides/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Ride>> DeleteRide(Guid id)
		{
			var ride = await _context.Rides.FindAsync(id);
			if (ride == null)
			{
				return NotFound();
			}

			_context.Rides.Remove(ride);
			await _context.SaveChangesAsync();

			return ride;
		}

		private bool RideExists(Guid id)
		{
			return _context.Rides.Any(e => e.Id == id);
		}

		[HttpPut("AddParticipant")]
		public async Task<ActionResult> AddParticipant([FromBody] AddParticipantToRideDTO addParticipantToRideDTO)
		{
			var ride = await _context.Rides.Include(ride => ride.Participants).FirstOrDefaultAsync(ride => ride.Id == addParticipantToRideDTO.RideId);
			ride.Participants.Add(new UserParticipatedRide()
			{
				Ride = ride,
				User = await _context.Users.FirstOrDefaultAsync(user => user.Id == addParticipantToRideDTO.ParticipantId)
			});
			await _context.SaveChangesAsync();
			return Json("ok");
		}

		[HttpGet("GetRide")]
		public async Task<ActionResult<AddRideDTO>> GetRide()
		{
			var ride = AddRideDTO.GetEmpty();
			ride.ParticipantsIds = new List<Guid>()
			{
				new Guid()
			};
			ride.AddStopDTOs = new List<AddStopDTO>()
			{
				new AddStopDTO(),
			};
			ride.Destination = new Location()
			{
				Coordinates = new Coordinates(),
				LocationName = new LocationName(),
			};
			ride.StartingLocation = new Location()
			{
				Coordinates = new Coordinates(),
				LocationName = new LocationName(),
			};

			return Json(ride);
		}

		[HttpPost("AddMockRide")]
		public async Task<ActionResult<Ride>> AddMockRide()
		{
			var ride = new Ride()
			{
				Destination = await _context.Locations.Where(loc => loc.LocationName.Name.Contains("Szkolna")).Include(ln => ln.Coordinates).Include(ln => ln.LocationName).FirstOrDefaultAsync(),
				StartingLocation = await _context.Locations.Where(loc => loc.LocationName.Name.Contains("Szkolna")).Include(ln => ln.Coordinates).Include(ln => ln.LocationName).FirstOrDefaultAsync(),
				Owner = await _context.Users.FirstOrDefaultAsync(user => user.LastName.Contains("kononowicz")),
				Participants = new List<UserParticipatedRide>(),
				Stops = new List<Stop>()
			};
			_context.Rides.Add(ride);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetRide", new { id = ride.Id }, ride);
		}
	}
}