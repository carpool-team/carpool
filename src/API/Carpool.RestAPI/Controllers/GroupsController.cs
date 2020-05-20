using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.Models.Intersections;
using Carpool.Core.DTOs.LocationDTOs;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupsController : Controller
	{
		private readonly CarpoolDbContext _context;

		public GroupsController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/Groups
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
		{
			return await _context.Groups.ToListAsync();
		}

		// GET: api/Groups/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Group>> GetGroup(Guid id)
		{
			var @group = await _context.Groups.FindAsync(id);

			if (@group == null)
			{
				return NotFound();
			}

			return @group;
		}

		[HttpGet("GetUserGroups/{userId}")]
		public async Task<ActionResult<List<Group>>> GetUserGroups([FromRoute]Guid userId)
		{
			var groups = await _context.Groups
				.Include(group => group.Location)
					.ThenInclude(location => location.LocationName)
				.Include(group => group.Location)
					.ThenInclude(location => location.Coordinates)
				.Include(location => location.Rides)
				.Include(group => group.UserGroups).Where(group => group.UserGroups.Any(ug => ug.UserId == userId)).ToListAsync();

			var groupDTOs = groups.Select(group => IndexGroupDTO.FromGroup(group)).ToList();

			return Json(groupDTOs);
		}

		// PUT: api/Groups/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutGroup(Guid id, Group @group)
		{
			if (id != @group.Id)
			{
				return BadRequest();
			}

			_context.Entry(@group).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!GroupExists(id))
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

		[HttpPut("ChangeGroupLocation")]
		public async Task<ActionResult> ChangeGroupLocation([FromBody] ChangeGroupLocationDTO changeGroupLocationDTO)
		{
			var group = await _context.Groups.FirstOrDefaultAsync(group => group.Id == changeGroupLocationDTO.GroupId);
			var location = await _context.Locations.FirstOrDefaultAsync(location => location.Id == changeGroupLocationDTO.LocationId);
			group.Location = location;

			await _context.SaveChangesAsync();

			return Json(changeGroupLocationDTO);
		}

		[HttpPut("AddRideToGroup")]
		public async Task<ActionResult> AddRideToGroup([FromBody]AddRideToGroupDTO addRideToGroupDTO)
		{
			var group = await _context.Groups.Include(group => group.Rides).FirstOrDefaultAsync(group => group.Id == addRideToGroupDTO.GroupId);
			var ride = await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == addRideToGroupDTO.RideId);
			group.Rides.Add(ride);

			await _context.SaveChangesAsync();

			return Json(addRideToGroupDTO);
		}

		// POST: api/Groups
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Group>> PostGroup(AddGroupDTO groupDTO)
		{
			var group = new Group()
			{
				Name = groupDTO.Name,
			};
			_context.Groups.Add(group);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetGroup", new { id = group.Id }, groupDTO);
		}

		[HttpPost("AddUserToGroup")]
		public async Task<ActionResult> AddUserToGroup(AddUserToGroupDTO addUserToGroupDTO)
		{
			var group = await _context.Groups.Include(group => group.UserGroups).FirstOrDefaultAsync(group => group.Id == addUserToGroupDTO.GroupId);
			var userGroup = new UserGroup()
			{
				Group = group,
				GroupId = addUserToGroupDTO.GroupId,
				UserId = addUserToGroupDTO.UserId
			};
			group.UserGroups.Add(userGroup);
			await _context.SaveChangesAsync();

			return Json(userGroup);
		}

		// DELETE: api/Groups/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Group>> DeleteGroup(Guid id)
		{
			var @group = await _context.Groups.FindAsync(id);
			if (@group == null)
			{
				return NotFound();
			}

			_context.Groups.Remove(@group);
			await _context.SaveChangesAsync();

			return @group;
		}

		private bool GroupExists(Guid id)
		{
			return _context.Groups.Any(e => e.Id == id);
		}
	}
}