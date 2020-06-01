using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.Core.DTOs.GroupInvitesDTOs;
using Carpool.Core.Models.Intersections;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupInvitesController : Controller
	{
		private readonly CarpoolDbContext _context;

		public GroupInvitesController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/GroupInvites
		[HttpGet]
		public async Task<ActionResult<IEnumerable<GroupInvite>>> GetGroupInvites()
		{
			return await _context.GroupInvites.ToListAsync();
		}

		// GET: api/GroupInvites/5
		[HttpGet("{groupInviteId}")]
		public async Task<ActionResult<GroupInvite>> GetGroupInvite([FromRoute]Guid groupInviteId)
		{
			var groupInvite = await _context.GroupInvites.FindAsync(groupInviteId);

			if (groupInvite == null)
			{
				return NotFound();
			}

			return groupInvite;
		}

		// PUT: api/GroupInvites/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{groupInviteId}")]
		public async Task<IActionResult> PutGroupInvite([FromBody]ChangeGroupInviteDTO changeGroupInviteDTO, [FromRoute]Guid groupInviteId)
		{
			if (groupInviteId != changeGroupInviteDTO.GroupInviteId)
			{
				return BadRequest();
			}

			var groupInvite = await _context.GroupInvites.Include(groupInvite => groupInvite.InvitedUser).ThenInclude(user => user.UserGroups).Include(groupInvite => groupInvite.Group).FirstOrDefaultAsync(groupInvite => groupInvite.Id == changeGroupInviteDTO.GroupInviteId);

			groupInvite.IsPending = false;
			groupInvite.IsAccepted = changeGroupInviteDTO.IsAccepted;

			if (groupInvite.IsAccepted)
			{
				var userGroup = new UserGroup()
				{
					Group = groupInvite.Group,
					User = groupInvite.InvitedUser
				};
				var ug = groupInvite.InvitedUser.UserGroups.FirstOrDefault(ug => ug.GroupId == groupInvite.Group.Id && ug.UserId == groupInvite.InvitedUser.Id);
				if (ug == null)
					groupInvite.InvitedUser.UserGroups.Add(userGroup);
			}

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!GroupInviteExists(changeGroupInviteDTO.GroupInviteId))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Json("ok");
		}

		// POST: api/GroupInvites
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<GroupInvite>> PostGroupInvite(AddGroupInviteDTO groupInviteDTO)
		{
			var groupInvite = new GroupInvite()
			{
				IsPending = true,
				Group = await _context.Groups.FirstOrDefaultAsync(group => group.Id == groupInviteDTO.GroupId),
				InvitedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == groupInviteDTO.InvitedUserId),
				IsAccepted = false,
				DateAdded = DateTime.Now
			};
			_context.GroupInvites.Add(groupInvite);
			await _context.SaveChangesAsync();
			groupInviteDTO.Id = groupInvite.Id;
			return CreatedAtAction("GetGroupInvite", new { id = groupInvite.Id }, groupInviteDTO);
		}

		// DELETE: api/GroupInvites/5
		[HttpDelete("{groupInviteId}")]
		public async Task<ActionResult<GroupInvite>> DeleteGroupInvite(Guid groupInviteId)
		{
			var groupInvite = await _context.GroupInvites.FindAsync(groupInviteId);
			if (groupInvite == null)
			{
				return NotFound();
			}

			_context.GroupInvites.Remove(groupInvite);
			await _context.SaveChangesAsync();

			return groupInvite;
		}

		private bool GroupInviteExists(Guid id)
		{
			return _context.GroupInvites.Any(e => e.Id == id);
		}
	}
}