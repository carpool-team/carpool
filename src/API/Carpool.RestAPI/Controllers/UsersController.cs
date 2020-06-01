using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.Core.Models.Intersections;
using Carpool.Core.DTOs.RatingDTOs;
using Carpool.Core.DTOs.RideDTOs;
using Carpool.Core.DTOs.GroupInvitesDTOs;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.DTOs.RideRequestDTOs;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : Controller
	{
		private readonly CarpoolDbContext _context;

		public UsersController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/Users
		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			return await _context.Users.ToListAsync();
		}

		// GET: api/Users/5
		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetUser(Guid id)
		{
			var user = await _context.Users.FindAsync(id);

			if (user == null)
			{
				return NotFound();
			}

			return user;
		}

		// PUT: api/Users/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutUser(Guid id, User user)
		{
			if (id != user.Id)
			{
				return BadRequest();
			}

			_context.Entry(user).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!UserExists(id))
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

		// POST: api/Users
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<User>> PostUser(User user)
		{
			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetUser", new { id = user.Id }, user);
		}

		// DELETE: api/Users/5
		[HttpDelete("{userId}")]
		public async Task<ActionResult<User>> DeleteUser(Guid userId)
		{
			var user = await _context.Users.FindAsync(userId);
			if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
			await _context.SaveChangesAsync();

			return user;
		}

		#region Ratings

		[HttpGet("{userId}/ratings/{ratingId}")]
		public async Task<ActionResult<Rating>> GetUserRatingById([FromRoute]Guid userId, [FromRoute]Guid ratingId)
		{
			var rating = await _context.Ratings.FindAsync(ratingId);

			if (rating == null)
			{
				return NotFound();
			}

			return rating;
		}

		[HttpPost("{userId}/ratings")]
		public async Task<ActionResult> AddUserRating([FromBody] AddRatingDTO ratingDTO, [FromRoute] Guid userId)
		{
			var user = await _context.Users.Include(user => user.Ratings).FirstOrDefaultAsync(user => user.Id == userId);
			if (user == null)
			{
				return NotFound();
			}
			var rating = new Rating()
			{
				Value = ratingDTO.Value
			};
			user.Ratings.Add(rating);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetUserRatingById), new { userId = user.Id, ratingId = rating.Id }, rating);
		}

		#endregion Ratings

		[HttpPost("AddMockUser")]
		public async Task<IActionResult> AddMockUser()
		{
			var user = new User()
			{
				FirstName = "Wojciech",
				LastName = "Suchodolski",
				Email = "nitrotykarz@las.pl",
				Locations = _context.Locations.Where(loc => loc.LocationName.Name.Contains("Szkolna")).Include(ln => ln.Coordinates).Include(ln => ln.LocationName).ToListAsync().Result,
				PhoneNumber = "123456789",
				Vehicle = new Vehicle() { Name = "Audi A4" }
			};
			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetUser", new { id = user.Id }, user);
		}

		#region Rides

		[HttpGet("{userId}/rides/participated")]
		public async Task<ActionResult<List<IndexRideDTO>>> GetUserParticipatedRides([FromRoute] Guid userId)
		{
			try
			{
				var rides = await _context.Rides.AsNoTracking()
					.Include(ride => ride.Stops)
					.Include(ride => ride.StartingLocation)
						.ThenInclude(st => st.Coordinates)
					.Include(ride => ride.StartingLocation)
						.ThenInclude(st => st.LocationName)
					.Include(ride => ride.Participants)
						.ThenInclude(participant => participant.User)
					.Include(ride => ride.Owner)
						.ThenInclude(user => user.Vehicle)
					.Include(ride => ride.Destination)
						.ThenInclude(st => st.Coordinates)
					.Include(ride => ride.Destination)
						.ThenInclude(st => st.LocationName)
					.Where(ride => ride.Date >= DateTime.Now && ride.Participants.Any(participant => participant.UserId == userId))
					.OrderBy(ride => ride.Date)
					.Select(ride => IndexRideDTO.FromRide(ride))
					.ToListAsync();
				if (rides == null)
				{
					return NotFound();
				}
				return Ok(rides);
			}
			catch (Exception ex)
			{
				return NotFound(ex);
			}
		}

		[HttpGet("{userId}/rides/owned")]
		public async Task<ActionResult<List<IndexRideDTO>>> GetUserOwnedRides([FromRoute] Guid userId)
		{
			try
			{
				var rides = await _context.Rides.AsNoTracking()
					.Include(ride => ride.Stops)
					.Include(ride => ride.StartingLocation)
						.ThenInclude(st => st.Coordinates)
					.Include(ride => ride.StartingLocation)
						.ThenInclude(st => st.LocationName)
					.Include(ride => ride.Participants)
						.ThenInclude(participant => participant.User)
					.Include(ride => ride.Owner)
						.ThenInclude(user => user.Vehicle)
					.Include(ride => ride.Destination)
						.ThenInclude(st => st.Coordinates)
					.Include(ride => ride.Destination)
						.ThenInclude(st => st.LocationName)
					.Where(ride => ride.Date >= DateTime.Now && ride.Owner.Id == userId)
					.OrderBy(ride => ride.Date)
					.Select(ride => IndexRideDTO.FromRide(ride))
					.ToListAsync();
				if (rides == null)
				{
					return NotFound();
				}
				return Ok(rides);
			}
			catch (Exception ex)
			{
				return NotFound(ex);
			}
		}

		[HttpPost("{userId}/rides")]
		public async Task<ActionResult<Ride>> PostRide([FromBody] AddRideDTO addRideDTO, [FromRoute] Guid userId)
		{
			try
			{
				var stops = addRideDTO.AddStopDTOs.Select(stop => new Stop()
				{
					User = _context.Users.FirstOrDefault(user => user.Id == stop.UserId),
					Coordinates = stop.Coordinates
				}).ToList();
				var users = stops.Select(stop => stop.User).ToList<User>();
				var ride = new Ride()
				{
					Price = addRideDTO.Price,
					Destination = addRideDTO.Destination,
					StartingLocation = addRideDTO.StartingLocation,
					Owner = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId),
					Stops = stops
				};
				ride.Participants = users.Select(user => new UserParticipatedRide()
				{
					Ride = ride,
					User = user
				}).ToList();
				ride.Date = addRideDTO.Date;
				_context.Rides.Add(ride);
				await _context.SaveChangesAsync();

				return CreatedAtAction("GetRide", new { id = ride.Id }, IndexRideDTO.FromRide(ride));
			}
			catch (Exception ex)
			{
				return Json(ex);
			}
		}

		#endregion Rides

		#region Group Invites

		[HttpGet("{userId}/groupInvites")]
		public async Task<ActionResult<List<GroupInvite>>> GetUserGroupInvites([FromRoute]Guid userId)
		{
			var groupInviteDTOs = await _context.GroupInvites
				.Include(groupInvite => groupInvite.InvitedUser)
				.Include(groupInvite => groupInvite.Group)
					.ThenInclude(group => group.Rides)
				.Include(groupInvite => groupInvite.Group)
					.ThenInclude(group => group.UserGroups)
				.Where(groupInvite => groupInvite.InvitedUserId == userId && groupInvite.IsPending == true)
				.Select(groupInvite => IndexGroupInviteDTO.FromGroupInvite(groupInvite))
				.ToListAsync();
			if (groupInviteDTOs == null)
			{
				return NotFound();
			}
			return Json(groupInviteDTOs);
		}

		#endregion Group Invites

		#region Groups

		[HttpGet("{userId}/groups")]
		public async Task<ActionResult<List<Group>>> GetUserGroups([FromRoute]Guid userId)
		{
			var groupDTOs = await _context.Groups
				.Include(group => group.Location)
					.ThenInclude(location => location.LocationName)
				.Include(group => group.Location)
					.ThenInclude(location => location.Coordinates)
				.Include(location => location.Rides)
				.Include(group => group.UserGroups).Where(group => group.UserGroups.Any(ug => ug.UserId == userId)).Select(group => IndexGroupDTO.FromGroup(group)).ToListAsync();
			if (groupDTOs == null)
			{
				return NotFound();
			}

			return Json(groupDTOs);
		}

		#endregion Groups

		#region Ride Requests

		[HttpPost("{userId}/rideRequests")]
		public async Task<ActionResult<RideRequest>> PostRideRequest([FromRoute]Guid userId, [FromBody]AddRideRequestDTO rideRequestDTO)
		{
			var rideRequest = new RideRequest()
			{
				Date = rideRequestDTO.Date,
				Destination = rideRequestDTO.Destination,
				StartingLocation = rideRequestDTO.StartingLocation,
				Requester = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId),
			};
			_context.RideRequests.Add(rideRequest);
			await _context.SaveChangesAsync();

			return CreatedAtAction("PostRideRequest", new { id = rideRequest.Id }, rideRequestDTO);
		}

		[HttpGet("{userId}/rideRequests")]

		#endregion Ride Requests

		private bool UserExists(Guid id)
		{
			return _context.Users.Any(e => e.Id == id);
		}
	}
}