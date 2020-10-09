using System;
using System.Threading.Tasks;
using Carpool.Core.Models;
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

		// GET: api/GroupInvites
		[HttpGet]
		public async Task<IActionResult> GetGroupInvites()
		{
			var request = new GetGroupInvitesQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

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
			request.GroupInviteId = groupInviteId;

			await _mediator.Send(request).ConfigureAwait(false);

			return Ok(request);
		}

		// POST: api/GroupInvites
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<GroupInvite>> PostGroupInvite(AddGroupInviteCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok(response);
		}

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