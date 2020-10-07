using System;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.GroupInvite;
using Carpool.RestAPI.Queries.GroupInvite;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupInvitesController : Controller
	{
		private readonly IMediator _mediator;

		public GroupInvitesController(IMediator mediator)
		{
			_mediator = mediator;
		}

		//// GET: api/GroupInvites
		//[HttpGet]
		//public async Task<ActionResult<IEnumerable<GroupInvite>>> GetGroupInvites()
		//{
		//	return await _context.GroupInvites.ToListAsync();
		//}

		// GET: api/GroupInvites/5
		[HttpGet("{groupInviteId}")]
		public async Task<IActionResult> GetGroupInvite([FromRoute] GetGroupInviteQuery request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}

		// PUT: api/GroupInvites/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{groupInviteId}")]
		public async Task<IActionResult> PutGroupInvite([FromBody] UpdateGroupInviteCommand request,
		                                                [FromRoute] Guid groupInviteId)
		{
			if (groupInviteId != request.GroupInviteId) return BadRequest();

			await _mediator.Send(request).ConfigureAwait(false);

			return Json("ok");
		}

		// POST: api/GroupInvites
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		//[HttpPost]
		//public async Task<ActionResult<GroupInvite>> PostGroupInvite(AddGroupInviteDTO groupInviteDTO)
		//{
		//	var groupInvite = new GroupInvite()
		//	{
		//		IsPending = true,
		//		Group = await _context.Groups.FirstOrDefaultAsync(group => group.Id == groupInviteDTO.GroupId),
		//		InvitedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == groupInviteDTO.InvitedUserId),
		//		IsAccepted = false,
		//		DateAdded = DateTime.Now
		//	};
		//	_context.GroupInvites.Add(groupInvite);
		//	await _context.SaveChangesAsync();
		//	groupInviteDTO.Id = groupInvite.Id;
		//	return CreatedAtAction("GetGroupInvite", new { groupInviteId = groupInvite.Id }, groupInviteDTO);
		//}

		// DELETE: api/GroupInvites/5
		[HttpDelete("{groupInviteId}")]
		public async Task<ActionResult<GroupInvite>> DeleteGroupInvite(Guid groupInviteId)
		{
			var request = new DeleteGroupInviteCommand(groupInviteId);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return Ok(response);
		}
	}
}