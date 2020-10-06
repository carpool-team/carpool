using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.Group;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.RestAPI.Queries.Group;
using Carpool.RestAPI.Queries.User;

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

        //// GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<List<IndexGroupDTO>>> GetGroups(GetGroupsQuery query)
        {
            var response = await _mediator.Send(query).ConfigureAwait(false);
			return await response.ToListAsync().ConfigureAwait(false);
        }

        // GET: api/Groups/5
        [HttpGet("{groupId}")]
		public async Task<ActionResult<Group>> GetGroup(GetGroupQuery query)
        {
            var response = await _mediator.Send(query).ConfigureAwait(false);
            return response;
		}

        // PUT: api/Groups/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutGroup(Guid id, UpdateGroupCommand updateGroupCommand)
        {
            var response = await _mediator.Send(updateGroupCommand).ConfigureAwait(false);
            return Ok();
		}

		[HttpPut("{groupId}/locations")]
		public async Task<ActionResult> ChangeGroupLocation([FromRoute]Guid groupId, [FromBody] ChangeGroupLocationCommand changeGroupLocationCommand)
        {
            var response = await _mediator.Send(changeGroupLocationCommand).ConfigureAwait(false);
            return Ok(response);
        }

        [HttpPut("{groupId}/rides")]
        public async Task<ActionResult> AddRideToGroup([FromRoute] Guid groupId, [FromBody] AddRideToGroupCommand addRideToGroupCommand)
        {
            var response = await _mediator.Send(addRideToGroupCommand).ConfigureAwait(false);
            return Ok(response);
        }

        // POST: api/Groups
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
		public async Task<IActionResult> PostGroup([FromBody]AddGroupCommand addGroupCommand)
		{
            await _mediator.Send(addGroupCommand).ConfigureAwait(false);
            return Ok();
        }

		[HttpPut("{groupId}/users")]
		public async Task<ActionResult> AddUserToGroup([FromRoute]Guid groupId, [FromBody]AddUserToGroupCommand addUserToGroupCommand)
        {
            var response = await _mediator.Send(addUserToGroupCommand).ConfigureAwait(false);
			return Ok();
		}

		// DELETE: api/Groups/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Group>> DeleteGroup(Guid id)
        {
            var response = await _mediator.Send(new DeleteGroupCommand(id)).ConfigureAwait(false);
            return Ok();
		}
    }
}