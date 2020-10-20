using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Carpool.RestAPI.Commands.Group;
using Carpool.RestAPI.DTOs.GroupDTOs;
using Carpool.RestAPI.Queries.Group;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupsController : ControllerBase
	{
		private readonly IMediator _mediator;

		public GroupsController(IMediator mediator)
			=> _mediator = mediator;

		//// GET: api/Groups
		[HttpGet]
		public async Task<ApiResponse> GetGroups([FromQuery]int page = 0, [FromQuery]int count = 5)
        {
   //          var request = new GetGroupsQuery(page, count);
			// var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse("TEST OF CI");
		}

		// GET: api/Groups/5
		[HttpGet("{groupId}")]
		public async Task<ApiResponse> GetGroup([FromRoute]Guid groupId)
		{
			var request = new GetGroupQuery(groupId);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// PUT: api/Groups/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{id}")]
		public async Task<ApiResponse> PutGroup(Guid id, UpdateGroupCommand updateGroupCommand)
		{
			var response = await _mediator.Send(updateGroupCommand).ConfigureAwait(false);
			return new ApiResponse($"Group with id: {response} has been deleted");
		}

		[HttpPut("{groupId}/locations")]
		public async Task<ApiResponse> ChangeGroupLocation([FromRoute] Guid groupId,
		                                                    [FromBody]
		                                                    ChangeGroupLocationCommand changeGroupLocationCommand)
		{
			changeGroupLocationCommand.GroupId = groupId;
			var response = await _mediator.Send(changeGroupLocationCommand).ConfigureAwait(false);
			return new ApiResponse($"Location of a group with id: {groupId} has ben changed");
		}

		[HttpPut("{groupId}/rides")]
		public async Task<ActionResult> AddRideToGroup([FromRoute] Guid groupId,
		                                               [FromBody] AddRideToGroupCommand addRideToGroupCommand)
		{
			var response = await _mediator.Send(addRideToGroupCommand).ConfigureAwait(false);
			return Ok(response);
		}

		// POST: api/Groups
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<IActionResult> PostGroup([FromBody] AddGroupCommand addGroupCommand)
		{
			await _mediator.Send(addGroupCommand).ConfigureAwait(false);
			return Ok();
		}

		[HttpPut("{groupId}/users")]
		public async Task<ActionResult> AddUserToGroup([FromRoute] Guid groupId,
		                                               [FromBody] AddUserToGroupCommand addUserToGroupCommand)
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