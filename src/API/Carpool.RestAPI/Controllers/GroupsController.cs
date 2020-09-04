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
using Carpool.Core.DTOs.UserDTOs;
using Carpool.RestAPI.Commands.Group;
using MediatR;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupsController : ControllerBase
	{
		private readonly CarpoolDbContext _context;

        private readonly IMediator _mediator;

		public GroupsController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
            _mediator = mediator;
        }

		// GET: api/Groups
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
		{
			return await _context.Groups.ToListAsync();
		}

		// GET: api/Groups/5
		[HttpGet("{groupId}")]
		public async Task<ActionResult<Group>> GetGroup(Guid groupId)
		{
			var @group = await _context.Groups.FindAsync(groupId);

			if (@group == null)
			{
				return NotFound();
			}

			return @group;
		}

		[HttpGet("{groupId}/users")]
		public async Task<ActionResult<List<User>>> GetGroupUsers([FromRoute]Guid groupId)
        {
			var group = await _context.Groups
				.Include(group => group.UserGroups)
				.ThenInclude(member => member.User)
				.FirstOrDefaultAsync(group => group.Id == groupId);
			if(group == null)
            {
				return NotFound(groupId);
            }
			var users = group.UserGroups.Select(userGroup => IndexUserDTO.FromUser(userGroup.User)).ToList();
			return Ok(users);

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

		[HttpPut("{groupId}/locations")]
		public async Task<ActionResult> ChangeGroupLocation([FromRoute]Guid groupId, [FromBody] ChangeGroupLocationDTO changeGroupLocationDTO)
		{
			if (groupId != changeGroupLocationDTO.GroupId)
			{
				return BadRequest();
			}
			var group = await _context.Groups.FirstOrDefaultAsync(group => group.Id == groupId);
			var location = await _context.Locations.FirstOrDefaultAsync(location => location.Id == changeGroupLocationDTO.LocationId);
			group.Location = location;

			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpPut("{groupId}/rides")]
		public async Task<ActionResult> AddRideToGroup([FromRoute]Guid groupId, [FromBody]AddRideToGroupDTO addRideToGroupDTO)
		{
			if (groupId != addRideToGroupDTO.GroupId)
			{
				return BadRequest();
			}
			var group = await _context.Groups.Include(group => group.Rides).FirstOrDefaultAsync(group => group.Id == addRideToGroupDTO.GroupId);
			var ride = await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == addRideToGroupDTO.RideId);
			group.Rides.Add(ride);

			await _context.SaveChangesAsync();

			return NoContent();
		}

		// POST: api/Groups
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<IActionResult> PostGroup([FromBody]AddGroupCommand addGroupCommand)
		{
            await _mediator.Send(addGroupCommand);
            return Ok();
        }

		[HttpPut("{groupId}/users")]
		public async Task<ActionResult> AddUserToGroup([FromRoute]Guid groupId, [FromBody]AddUserToGroupDTO addUserToGroupDTO)
		{
			if (groupId != addUserToGroupDTO.GroupId)
			{
				return BadRequest();
			}
			var group = await _context.Groups.Include(group => group.UserGroups).FirstOrDefaultAsync(group => group.Id == addUserToGroupDTO.GroupId);
			var userGroup = new UserGroup()
			{
				Group = group,
				GroupId = addUserToGroupDTO.GroupId,
				UserId = addUserToGroupDTO.UserId
			};
			group.UserGroups.Add(userGroup);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!GroupExists(groupId))
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